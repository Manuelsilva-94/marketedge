# MARKETEDGE — RESUMEN COMPLETO DEL PROYECTO
*Documento para continuar el proyecto en una nueva conversación*

---

## 🎯 QUÉ ES MARKETEDGE

Plataforma web de comparación de **prediction markets** que:
- Compara precios entre **Polymarket** y **Kalshi** para el mismo evento
- Detecta **oportunidades de arbitraje** entre plataformas
- Trackea **whales** (grandes traders) de Polymarket
- Permite búsqueda y comparación manual de mercados

**Modo de trabajo:** Claude planifica y genera prompts detallados → usuario los ejecuta en **Cursor** (IDE con IA integrada) → usuario reporta resultados a Claude.

---

## 🏗️ STACK TECNOLÓGICO

| Layer | Tecnología |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Lenguaje | TypeScript |
| ORM | Prisma |
| DB | PostgreSQL (Supabase) |
| Styling | TailwindCSS + shadcn/ui |
| Deploy | Vercel (no deployado aún) |
| AI Matching | Groq API (llama-3.1-8b-instant) — gratis |
| Auth Kalshi | RSA private key (archivo `marketedge.txt`) |

---

## 📁 ESTRUCTURA DE ARCHIVOS CLAVE

```
marketedge/
├── app/
│   ├── page.tsx                          # Homepage
│   ├── search/page.tsx                   # Search dual columnas (Client Component)
│   ├── market/[id]/page.tsx              # Market detail + botón "Find manually"
│   ├── arbitrage/page.tsx                # Arbitrage scanner UI
│   ├── compare/page.tsx                  # Comparación manual /compare?a=&b=
│   ├── whales/page.tsx                   # Whale leaderboard
│   ├── whales/[address]/page.tsx         # Whale profile
│   └── api/
│       ├── markets/search/route.ts
│       ├── compare/[id]/route.ts
│       ├── arbitrage/opportunities/route.ts   # ← REFACTORIZADO (usa MarketMatch DB)
│       ├── whales/leaderboard/route.ts
│       ├── whales/[address]/route.ts
│       └── admin/
│           └── semantic-index/route.ts        # ← Seed de pares semánticos
├── lib/
│   └── services/
│       ├── polymarket.service.ts
│       ├── kalshi.service.ts
│       ├── matcher.service.ts
│       ├── comparison.service.ts
│       ├── semantic-matcher.service.ts        # ← Groq llama-3.1-8b
│       └── whale.service.ts
├── components/
│   ├── layout/Navbar.tsx, Footer.tsx
│   ├── markets/MarketCard.tsx, ArbitrageCard.tsx
│   ├── whales/WhaleCard.tsx, WhaleHeader.tsx, PositionCard.tsx, TradeRow.tsx, WhaleFilters.tsx
│   └── ui/ (shadcn components)
├── prisma/schema.prisma
├── scripts/
│   └── fetch-kalshi.ts
└── .env
```

---

## 🗄️ SCHEMA DE BASE DE DATOS

```prisma
model Market {
  id           String   @id @default(cuid())
  platform     Platform  # POLYMARKET | KALSHI
  externalId   String
  question     String
  slug         String
  description  String?
  category     String?
  tags         String[]
  makerFee     Float?
  takerFee     Float?
  feeStructure String?
  volume24h    Float    @default(0)
  volumeTotal  Float    @default(0)
  liquidity    Float    @default(0)
  openInterest Float?
  normalizedQuestion String?
  active       Boolean  @default(true)
  endDate      DateTime?
  resolvedAt   DateTime?
  outcome      String?
  imageUrl     String?
  url          String?
  eventId      String?
  eventSlug    String?
  eventTitle   String?
  seriesId     String?
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
  lastSyncedAt DateTime @default(now())
  matchesAsA   MarketMatch[] @relation("MatchA")
  matchesAsB   MarketMatch[] @relation("MatchB")
  @@unique([platform, externalId])
}

model MarketMatch {
  id           String   @id @default(cuid())
  marketAId    String
  marketBId    String
  isEquivalent Boolean
  confidence   Float
  reasoning    String?
  model        String   @default("groq-llama-3.1-8b")
  createdAt    DateTime @default(now())
  marketA      Market   @relation("MatchA", fields: [marketAId], references: [id], onDelete: Cascade)
  marketB      Market   @relation("MatchB", fields: [marketBId], references: [id], onDelete: Cascade)
  @@unique([marketAId, marketBId])
  @@index([isEquivalent])
}

model Comparison { ... }  # Cache de comparaciones manuales
model SyncLog { ... }     # Log de sincronizaciones
```

---

## 📊 ESTADO ACTUAL DE LA DB

| Plataforma | Markets |
|-----------|---------|
| Polymarket | ~49,000 |
| Kalshi | ~3,195 (activos, bien seeded) |
| **Total** | **~52,000** |

**Tabla MarketMatch:**
- Total evaluados: 1,057 pares (con confidence > 0)
- `isEquivalent: true` → **677 pares** (matches reales verificados por IA)
- `isEquivalent: false` → **380 pares** (falsos positivos filtrados)

---

## 🔌 APIs EXTERNAS

### Polymarket
- **Base URL:** `https://gamma-api.polymarket.com`
- **Live prices:** `GET /markets/{conditionId}` → campo `outcomePrices: ["0.72", "0.28"]`
- **Search:** `GET /markets?question_contains={q}`
- **Auth:** Sin autenticación (pública)
- **Fees:** 0% maker, 0% taker (sin fees para trading simple)
- **Whale data:** `https://data-api.polymarket.com/v1/leaderboard?timePeriod=WEEK&orderBy=PNL&limit=50`
  - Campos: `rank, proxyWallet, userName, xUsername, verifiedBadge, vol, pnl, profileImage`
- **Positions:** `GET https://data-api.polymarket.com/positions?user={wallet}`
- **Value:** `GET https://data-api.polymarket.com/value?user={wallet}`

### Kalshi
- **Base URL:** `https://api.elections.kalshi.com/trade-api/v2`
- **Auth:** RSA private key → JWT headers. Archivo de key: `./marketedge.txt`. Env: `KALSHI_API_KEY`, `KALSHI_PRIVATE_KEY_PATH`
- **Live prices:** `GET /markets/{ticker}` → campo `yes_bid`, `yes_ask`, `no_bid`, `no_ask`
- **Series list:** `GET /series?limit=200`
- **Events by series:** `GET /events?series_ticker={ticker}&with_nested_markets=true`
- **Fees:** 7% taker fee. Fórmula effective price: `price + 0.07 * price * (1 - price)`
- **Categorías seeded exitosamente:** Sports, Entertainment, Financials, Economics, Crypto, Soccer, Climate, Mentions, Politics, Companies, Elections, Science, Health

### Groq (Semantic Matching)
- **Base URL:** `https://api.groq.com/openai/v1/chat/completions`
- **Modelo:** `llama-3.1-8b-instant`
- **Env:** `GROQ_API_KEY`
- **Costo:** Gratuito (14,400 req/día, 30 RPM)
- **Uso:** Evaluar si dos markets son equivalentes → JSON `{isEquivalent, confidence, reasoning}`

---

## ⚙️ SERVICIOS IMPLEMENTADOS

### `SemanticMatcherService`
- Llama a Groq para evaluar si dos markets son el mismo evento real
- Cache permanente en tabla `MarketMatch` (no re-evalúa pares ya evaluados)
- Fallback si Groq falla: `isEquivalent: true, confidence: 0.5`
- Prompt clave: ignora fechas de DB (pueden ser incorrectas), focaliza en texto de la pregunta
- Concurrencia: MAX_CONCURRENT = 1 (evita rate limit)

### `MatcherService`
- Keyword matching entre markets de distintas plataformas
- Score 0-1 basado en overlap de palabras normalizadas
- Método: `findMatchesFromCandidates(market, candidates, minScore)`
- También: `findMatches(market, { targetPlatform, minScore, limit })`

### `ComparisonService`
- `detectArbitrage({ sourceMarket, matches })` → `{ detected, roi, buyYesOn, buyNoOn }`
- Effective price Kalshi: `price + 0.07 * price * (1 - price)`
- Effective price Polymarket: sin fee adicional (fees ya incluidos en precio)
- Filtra ROI > 50% como likely bad match

### `WhaleService`
- `getTopTraders()` → fetch a `data-api.polymarket.com/v1/leaderboard`
- Mapeo: `displayName = userName ?? xUsername ?? truncateAddress(proxyWallet)` (ignora valores numéricos)
- `pnl` y `volume` son valores reales en USD

---

## 🔄 FLUJO DEL ARBITRAGE SCANNER

**Antes (lento, impreciso):**
```
1. Fetch top 200 Polymarket markets por volume24h
2. Para cada uno → keyword match contra Kalshi en DB
3. Para cada match → llamar a Groq para verificar
4. Para pares verificados → fetch live prices
5. Calcular arbitraje
```

**Ahora (rápido, preciso):**
```
1. Consultar MarketMatch WHERE isEquivalent=true (677 pares verificados)
2. Normalizar (poly=A, kalshi=B)
3. Filtrar por volume > 0, ordenar por volumen, tomar top 100
4. Para top 100 → fetch live prices en batches de 5
5. Calcular arbitraje
→ Sin Groq en runtime, sin keyword matching, sin timeouts
```

**Resultado actual:** 18 oportunidades detectadas en ~30 segundos, 0 falsos positivos.

---

## 🐋 WHALE TRACKER

**Página `/whales`:**
- Lista 50 traders del leaderboard semanal de Polymarket
- Ordenable por: volumen, PnL, win rate
- Click en card → `/whales/{address}`

**Página `/whales/{address}`:**
- WhaleHeader con stats (Volume 7d/30d, PnL 7d, Open Positions, Win Rate)
- Botón "Copy Address" con feedback visual "✓ Copied!" por 2 segundos
- Recent Trades (tabla)
- Top Positions (grid de PositionCard con links a Polymarket)

---

## 🔍 SEARCH

**Página `/search`:**
- Dual columnas: Polymarket (azul) | Kalshi (morado)
- Checkboxes para seleccionar un market de cada lado
- Click en título → `/market/{id}`
- Click en card → seleccionar para comparar
- Botón "Compare Selected →" → `/compare?a={poly_id}&b={kalshi_id}`
- Paginación independiente por columna

**Página `/compare`:**
- Recibe `?a={id}&b={id}` (IDs de DB)
- Fetch live prices en paralelo
- Banner verde si ROI > 0.5%
- Cards lado a lado + links a las plataformas

---

## 🤖 SEMANTIC INDEXER (`/api/admin/semantic-index`)

**POST `{"action": "start"}`** → Corre en background:
- Itera 3,195 markets de Kalshi
- Para cada uno: keyword match contra Polymarket
- Si match score ≥ 0.6 → Groq evalúa el par
- Resultado guardado en `MarketMatch`
- Rate limit: 1 segundo entre llamadas a Groq

**GET** → Retorna progreso actual + stats de DB

**Seed inicial completado:**
- Duración: 78 minutos
- 3,195 Kalshi markets procesados
- 1,416 pares evaluados por Groq
- 677 equivalentes, 380 no equivalentes, 0 errores

**Para nuevos markets:** Estrategia futura → al sincronizar markets nuevos, el fetch job llama al matcher solo para los recién creados.

---

## ✅ LO QUE FUNCIONA

- `/search` — dual columnas, búsqueda, filtros, selección para comparar ✅
- `/compare` — comparación manual con live prices y arbitraje ✅
- `/arbitrage` — 18 oportunidades reales, ~30s, sin falsos positivos ✅
- `/whales` — 50 traders reales con PnL y nombres de Polymarket ✅
- `/whales/{address}` — perfil completo con trades y posiciones ✅
- `/market/{id}` — detalle con botón "Find manually" cuando no hay matches ✅
- Copy Address con feedback visual "✓ Copied!" ✅
- PositionCard con links a Polymarket ✅
- Semantic indexer completo (677 pares verificados en DB) ✅
- Groq integrado y funcionando (reemplaza Gemini que tenía rate limits) ✅
- Kalshi questions limpias (sin " — Spain" al final) ✅

---

## ⚠️ PROBLEMAS CONOCIDOS / PENDIENTES

### 🔴 Pendientes importantes

**Duplicados en arbitrage:**
- Un mismo market de Kalshi puede aparecer en 2+ oportunidades si varios markets de Polymarket matchean contra él (ej: Greenland aparece 2 veces con ROIs de 11.59% y 1.35%)
- Fix: deduplicar por `kalshi.id` en el scanner, quedarse con la de mayor ROI

**Categorías vacías en arbitrage:**
- Muchas oportunidades muestran `category: null`
- Causa: la categoría del market de Poly no está en `VALID_CATEGORIES`
- Fix: revisar y ampliar el set de categorías válidas

**`category` en comparación manual:**
- El banner de arbitraje en `/compare` muestra categoría null en algunos casos

### 🟡 Mejoras planeadas

**Sincronización periódica de markets nuevos:**
- Actualmente los markets son un snapshot del seed inicial
- Necesita un cron job que:
  1. Fetche markets nuevos de Polymarket y Kalshi
  2. Para cada market nuevo → corra el matcher
  3. Si hay match con score ≥ 0.6 → Groq evalúa el par
  4. Guarda resultado en MarketMatch

**Markets inactivos/resueltos:**
- Muchos markets seeded ya están cerrados (precio 0.0005 o 0.9995)
- El scanner los filtra con `⚠️ Extreme price detected - skipping` pero igual consumen requests
- Fix: filtrar por `active: true` y actualizar el campo `active` periódicamente

**Score de confianza en UI:**
- Las oportunidades de arbitraje muestran `matchScore: 1` (confidence de Groq) pero no el reasoning
- Sería útil mostrar el reasoning de Groq en el hover o tooltip

**Open Positions count en WhaleCard:**
- La card del leaderboard muestra "Polymarket trader" en vez del conteo real
- El conteo real solo está disponible en la página de perfil (`/whales/{address}`)
- Se decidió no hacer 50 requests en paralelo para el leaderboard

### 🟢 Features no implementadas aún

- **Dashboard** (`/dashboard`) — no implementado
- **Alertas** — notificar cuando aparece arbitraje nuevo
- **Histórico de arbitrajes** — tracking de oportunidades a lo largo del tiempo
- **Manifold** — tercera plataforma planeada, no implementada
- **Deploy a Vercel** — el usuario decidió no deployar todavía

---

## 🔧 VARIABLES DE ENTORNO (.env)

```env
DATABASE_URL="postgresql://..."          # Supabase connection string
KALSHI_API_KEY="..."                     # API key de Kalshi
KALSHI_PRIVATE_KEY_PATH="./marketedge.txt"  # Path al archivo RSA key
GROQ_API_KEY="..."                       # API key de Groq (gratuita)
NEXT_PUBLIC_URL="http://localhost:3000"  # URL base (cambiar en producción)
```

---

## 📐 DECISIONES ARQUITECTÓNICAS IMPORTANTES

1. **DB solo guarda metadata, NO precios** — Los precios cambian constantemente, se fetchean en vivo cuando se necesitan

2. **MarketMatch como cache permanente de matching** — Una vez que Groq evalúa un par, el resultado queda en DB para siempre. El scanner consulta esta tabla en lugar de correr el matcher en runtime.

3. **Iterar desde Kalshi para el seed** — Kalshi tiene ~3K markets vs 49K de Polymarket. Iterar desde el lado más pequeño es más eficiente.

4. **Groq en lugar de Gemini** — Gemini tenía rate limits muy restrictivos en free tier. Groq es gratuito con límites más generosos y latencia más baja.

5. **Effective price formula Kalshi:** `price + 0.07 * price * (1 - price)` — refleja el fee del 7% taker de Kalshi aplicado sobre la ganancia potencial

6. **No se usa Transformers.js/embeddings locales** — Vercel tiene límite de 50MB para funciones serverless, los modelos de embeddings pesan ~90MB. Se usa Groq como API externa.

---

## 🏆 OPORTUNIDADES DE ARBITRAJE ACTUALES (al momento del seed)

Ejemplos reales detectados:
- Hormuz (cierre antes 2027): 4.3% ROI — Poly 98¢ YES vs Kalshi 93¢ YES
- Lens Ligue 1: 6.75% ROI
- Real Madrid La Liga: 2.97% ROI  
- Charles Leclerc F1 Champion: 1.82% ROI
- Nikola Jokic NBA MVP: 1.74% ROI
- Paul Thomas Anderson Best Director: 2.34% ROI
- Minnesota Wild Stanley Cup: 1.48% ROI
- Múltiples candidatos Dem 2028 (Shapiro, Pritzker, etc.): ~1-2.5% ROI

---

## 🚀 PRÓXIMOS PASOS RECOMENDADOS

1. **Deduplicar oportunidades** — filtrar por kalshi.id único en scanner
2. **Fix categorías nulas** en oportunidades de arbitraje
3. **Cron job de sincronización** — markets nuevos + re-evaluar pares
4. **Filtrar markets resueltos** — marcar `active: false` periódicamente
5. **Deploy a Vercel** cuando el usuario esté listo

---

## 💡 CONTEXTO DE TRABAJO

- El usuario ejecuta en **Windows** con PowerShell
- Cursor está en el directorio `C:\Users\moca\Documents\marketedge\`
- La DB es **Supabase** (PostgreSQL managed)
- El usuario aplica los prompts en Cursor y reporta resultados/errores
- Claude no tiene acceso directo al código — trabaja con lo que el usuario comparte
- Los prompts para Cursor deben ser muy específicos: archivo exacto, código completo a reemplazar, qué NO modificar