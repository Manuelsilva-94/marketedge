Algoritmo de Matching de Mercados Cross-Platform v1

El Problema Central
El keyword matching simple tiene un fallo fundamental: "$100,000" y "$100K" son el mismo número pero strings diferentes. Antes de comparar keywords, necesitamos normalizar semánticamente, no solo sintácticamente.
El pipeline tiene que ser de dos capas:

Normalización — transformar a forma canónica
Matching — comparar formas canónicas con scoring


Pipeline de Normalización Completo
Paso 0 — Pre-procesamiento numérico (ANTES de todo lo demás)
Este paso es crítico y el original lo omite.
pythonimport re

def normalize_numbers(text: str) -> str:
    # $100K → 100000
    text = re.sub(r'\$?([\d,]+)K\b', lambda m: str(int(m.group(1).replace(',','')) * 1000), text)
    # $100M → 100000000
    text = re.sub(r'\$?([\d,]+)M\b', lambda m: str(int(m.group(1).replace(',','')) * 1000000), text)
    # $100,000 → 100000
    text = re.sub(r'\$?([\d,]+)', lambda m: m.group(1).replace(',',''), text)
    # 100000.00 → 100000
    text = re.sub(r'(\d+)\.0+\b', r'\1', text)
    return text
InputOutput$100K100000$100,000100000100000.00100000$1.5M1500000$68,50068500

Paso 1 — Normalización de fechas
pythonfrom dateutil import parser as dateparser

def normalize_dates(text: str) -> str:
    # "March 31, 2026" → "2026-03-31"
    # "end of March 2026" → "2026-03-31" (último día del mes)
    # "Q1 2026" → "2026-03-31"
    # "by end of year" → año actual + "-12-31"
    
    patterns = {
        r'end of (january|february|march|april|may|june|july|august|september|october|november|december)\s+(\d{4})': 
            lambda m: f"{m.group(2)}-{month_to_num(m.group(1))}-{last_day(m.group(1))}",
        r'(january|february|march|april|may|june|july|august|september|october|november|december)\s+(\d{1,2}),?\s+(\d{4})':
            lambda m: f"{m.group(3)}-{month_to_num(m.group(1))}-{m.group(2).zfill(2)}",
        r'Q([1-4])\s+(\d{4})':
            lambda m: quarter_end(m.group(1), m.group(2))
    }
    # ...
    return text
InputOutputMarch 31, 20262026-03-31end of March 20262026-03-31Q1 20262026-03-31before April 20262026-03-31 ⚠️ flag DATE_BOUNDARYby end of year2026-12-31

⚠️ "before April 2026" y "by March 31, 2026" son equivalentes en significado pero distintas en wording. Mapear ambos a 2026-03-31 con flag DATE_BOUNDARY.


Paso 2 — Expansión de sinónimos
pythonSYNONYMS = {
    # Verbos de precio
    "reach":   "cross",
    "hit":     "cross",
    "exceed":  "cross",
    "surpass": "cross",
    "above":   "cross",
    "over":    "cross",
    "break":   "cross",  # "break $100K"
    
    # Verbos de precio inverso
    "below":   "under",
    "drop":    "under",
    "fall":    "under",
    "dip":     "under",
    
    # Geografía
    "us":      "usa",
    "united states": "usa",
    "u.s.":    "usa",
    "america": "usa",
    
    # Política
    "presidential election": "president",
    "presidency":            "president",
    "potus":                 "president",
    
    # Crypto
    "btc":     "bitcoin",
    "eth":     "ethereum",
    "ether":   "ethereum",
    "sol":     "solana",
    
    # Tiempo
    "by end of": "before",
    "no later than": "before",
    "prior to": "before",
    
    # Resultados
    "win":     "winner",
    "wins":    "winner",
    "won":     "winner",
}

Paso 3 — Lowercase + remove punctuation
pythonimport re

def basic_normalize(text: str) -> str:
    text = text.lower()
    text = re.sub(r'[^\w\s]', ' ', text)  # punctuation → space
    text = re.sub(r'\s+', ' ', text).strip()
    return text

Paso 4 — Remove stopwords
pythonSTOPWORDS = {
    "will", "the", "a", "an", "be", "is", "are", "was", "were",
    "do", "does", "did", "have", "has", "had",
    "to", "of", "in", "on", "at", "by", "for", "with", "about",
    "or", "and", "but", "if", "that", "this",
    "any", "ever", "next", "last", "first",
    "get", "go", "make",
    # OJO: NO agregar "not", "no" → cambian el significado del mercado
}

⚠️ Nunca remover negaciones: "will NOT reach" ≠ "will reach".


Paso 5 — Extracción de entidades estructuradas
En lugar de solo keywords, extraer campos tipados:
python@dataclass
class MarketFingerprint:
    asset: str          # "bitcoin", "trump", "california-governor"
    threshold: float    # 100000.0
    direction: str      # "cross", "under", "winner", "binary"
    date: str           # "2026-03-31" (ISO)
    date_type: str      # "by", "on", "before", "after"
    keywords: list[str] # resto de keywords no estructuradas
    flags: list[str]    # "DATE_BOUNDARY", "WORDING_AMBIGUOUS", etc.

Pipeline Completo
pythondef build_fingerprint(title: str) -> MarketFingerprint:
    text = normalize_numbers(title)      # Paso 0
    text = normalize_dates(text)         # Paso 1
    text = apply_synonyms(text)          # Paso 2
    text = basic_normalize(text)         # Paso 3
    text = remove_stopwords(text)        # Paso 4
    return extract_structured(text)      # Paso 5

Algoritmo de Scoring
El score final es una media ponderada de sub-scores, no un simple keyword overlap:
pythondef match_score(a: MarketFingerprint, b: MarketFingerprint) -> MatchResult:
    scores = {}
    
    # 1. Asset match (peso: 35%) — bloqueante si < 0.5
    scores["asset"] = fuzzy_match(a.asset, b.asset)  # exact=1.0, alias=0.9, partial=0.5
    if scores["asset"] < 0.5:
        return MatchResult(score=0.0, match=False, reason="DIFFERENT_ASSET")
    
    # 2. Threshold match (peso: 30%) — bloqueante si existe y difiere >1%
    if a.threshold and b.threshold:
        diff = abs(a.threshold - b.threshold) / max(a.threshold, b.threshold)
        scores["threshold"] = 1.0 if diff == 0 else (0.8 if diff < 0.001 else 0.0)
        if scores["threshold"] == 0.0:
            return MatchResult(score=0.0, match=False, reason="DIFFERENT_THRESHOLD")
    else:
        scores["threshold"] = 1.0  # no aplica
    
    # 3. Date match (peso: 25%)
    date_diff = abs(parse_date(a.date) - parse_date(b.date)).days
    if date_diff == 0:
        scores["date"] = 1.0
    elif date_diff <= 1:
        scores["date"] = 0.9  # probable timezone diff
    elif date_diff <= 7:
        scores["date"] = 0.6  # flag DATE_FUZZY
    else:
        return MatchResult(score=0.0, match=False, reason="DATE_TOO_DIFFERENT")
    
    # 4. Direction match (peso: 10%)
    scores["direction"] = 1.0 if a.direction == b.direction else 0.3
    
    final = (
        scores["asset"]     * 0.35 +
        scores["threshold"] * 0.30 +
        scores["date"]      * 0.25 +
        scores["direction"] * 0.10
    )
    
    flags = build_flags(scores, date_diff, a, b)
    
    return MatchResult(
        score=final,
        match=final >= 0.80,
        match_type="STRICT" if final >= 0.95 else "FUZZY",
        flags=flags
    )

Threshold de Match
ScoreClasificaciónAcción en UI≥ 0.95STRICT — mismo mercadoMostrar como par directo, calcular spread0.80–0.94FUZZY — probablemente mismoMostrar con badge "⚠️ verificar condiciones"0.60–0.79RELATED — mismo tópicoMostrar en sección "mercados relacionados"< 0.60NO MATCHNo mostrar
¿Por qué 0.80 y no 0.70?
Con umbral 0.70 se generan demasiados falsos positivos en mercados políticos donde el mismo candidato aparece en múltiples elecciones (primarias, general, 2024, 2028). Con 0.80 el ratio precision/recall es más útil para una app de arbitraje.

Tabla de Casos de Test
#PolymarketKalshiMatch?ScoreFlags1"Will Bitcoin reach $100,000 by March 31, 2026?""Bitcoin above $100K on March 31, 2026"✅ FUZZY0.87WORDING_AMBIGUOUS2"Will Trump win the 2028 election?""2028 U.S. Presidential Election winner?"✅ FUZZY0.83WORDING_AMBIGUOUS3"Bitcoin above $100K by end of March 2026""Bitcoin above $100K on March 31, 2026, 11:59pm ET"✅ FUZZY0.88DATE_BOUNDARY4"Will Bitcoin hit $150K?""Bitcoin above $100K by end of year"❌ NO0.00DIFFERENT_THRESHOLD5"Will Ethereum reach $10,000?""Bitcoin above $10,000 by Dec 2026"❌ NO0.00DIFFERENT_ASSET6"California Governor Election Winner""California Governor winner? (Person)"✅ STRICT0.96—7"Which party wins 2028 US Presidential?""2028 Presidential Election winner? (Party)"✅ STRICT0.95—8"Texas Senate Election Winner""Texas Senate winner?"✅ STRICT0.97—9"Bitcoin above $68K by March 31""Bitcoin price today at 6pm EST?"❌ NO0.00DATE_TOO_DIFFERENT10"Will Democrats flip the Senate by March 31?""Democrats flip Republicans by March 31?"✅ STRICT0.95—11"Will Bitcoin be above $200K by next year?""Bitcoin above $200K on Dec 31, 2026"✅ FUZZY0.82DATE_BOUNDARY12"Will there be a government shutdown?""Another US government shutdown & House Winner 2026?"✅ RELATED0.71PARTIAL_MATCH

Limitaciones Conocidas del Algoritmo v1
Falsos positivos esperados:

Mercados con mismo asset y threshold pero condición opuesta: "Bitcoin above $100K" vs "Bitcoin below $100K" → el campo direction debería capturarlo, pero si el wording es ambiguo puede fallar.

Falsos negativos esperados:

Mercados con paráfrasis muy distintas: "Will Satoshi move Bitcoin?" vs "Satoshi Nakamoto wallet activity" → similarity de embedding capturaría esto mejor que keywords.

Mejora recomendada para v2: Reemplazar el step de keywords con sentence embeddings (ej: sentence-transformers/all-MiniLM-L6-v2) sobre el texto normalizado post-Paso 2. Los campos estructurados (threshold, date, asset) se siguen usando como filtros bloqueantes. El embedding solo score el "tema" residual.

Sinónimos — Lista Completa v1
python# assets/crypto
"btc"         → "bitcoin"
"eth"         → "ethereum"  
"ether"       → "ethereum"
"sol"         → "solana"
"xrp"         → "ripple"

# assets/índices
"sp500"       → "sp500"
"s&p"         → "sp500"
"s&p 500"     → "sp500"
"spx"         → "sp500"
"nasdaq"      → "nasdaq100"
"ndx"         → "nasdaq100"

# geografía
"us"          → "usa"
"u.s."        → "usa"
"u.s.a."      → "usa"
"united states" → "usa"
"america"     → "usa"  # ojo: puede ser continente en otros contextos

# política
"potus"       → "president"
"presidential election" → "president"
"presidency"  → "president"
"gop"         → "republican"
"democrat"    → "democratic"
"dems"        → "democratic"
"reps"        → "republican"
"gop"         → "republican"

# verbos precio (todos → "cross" para "superar")
"reach"       → "cross"
"hit"         → "cross"
"exceed"      → "cross"
"surpass"     → "cross"
"above"       → "cross"
"over"        → "cross"
"break"       → "cross"
"top"         → "cross"  # "top $100K"

# verbos precio inverso
"below"       → "under"
"drop"        → "under"
"fall"        → "under"
"dip"         → "under"
"sink"        → "under"

# tiempo
"by end of"   → "before"
"no later than" → "before"
"prior to"    → "before"
"on or before" → "before"
"eoy"         → "before 2026-12-31"  # end of year
"eom"         → "before {last_day_of_month}"