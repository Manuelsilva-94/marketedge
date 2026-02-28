Criterios de Equivalencia entre Plataformas (Kalshi vs Polymarket)

1. Análisis de lo que muestran las capturas
Bitcoin (Kalshi vs Polymarket)
Kalshi ofrece mercados de Bitcoin con granularidad alta:

Price ranges específicos (ej: $68,250–$68,499.99 a las 6pm EST)
Intervalos de 15 minutos (BTC Up or Down - 15 minutes)
Preguntas de largo plazo (How high will Bitcoin get this year?)
Umbrales concretos (Will Bitcoin be above $200K by next year?)

Polymarket ofrece:

Mercados binarios Bitcoin Up or Down - February 25, 6:55PM–7:00PM ET (51% Up)
Mercados de largo plazo similares pero con wording diferente
Más enfoque en eventos puntuales y menos en price ranges granulares

Observación clave de las capturas: Kalshi tiene significativamente más mercados de Bitcoin que Polymarket, con resoluciones temporales mucho más cortas (15 min vs 1 hora). Polymarket tiende a mercados más líquidos pero menos granulares.
US Elections (Kalshi vs Polymarket)
Kalshi muestra:

2028 U.S. Presidential Election winner? → JD Vance 23%
Which party wins 2028 US Presidential Election?
Mercados de Senate por estado (Texas, Ohio, Maine, Nebraska, Michigan...)
California Governor winner? → Eric Swalwell 51%

Polymarket muestra:

Which party wins 2028 US Presidential Election? → 55% Democratic
Presidential Election Winner 2028 → 23% JD Vance
2026 U.S. Senate Election: Democrats flip Republicans by March 31? → 16%
California Governor, Michigan Senate, Ohio Senate — mismos tópicos

Observación: Los mercados de elecciones 2028 tienen probabilidades divergentes entre plataformas (Kalshi: Democratic Party no aparece como favorita, Polymarket: 55% Democratic). Esto es señal de arbitraje potencial o diferencia metodológica.

2. Criterios de Equivalencia
Dos mercados son equivalentes si cumplen todos los criterios del Nivel 1, o pasan el scoring del Nivel 2.
Nivel 1 — Equivalencia Estricta (match automático)
CriterioReglaAsset/TopicMismo subyacente (ej: BTC, Trump, California Governor)ThresholdMismo valor numérico (ej: $100K = $100,000.00)Fecha de resoluciónDiferencia ≤ 1 día calendarioTipo de mercadoAmbos binarios YES/NOCondición lógicaMismo operador ("above" = "at or above" requiere verificación)
Nivel 2 — Equivalencia Probable (match con flag ~)
CriterioToleranciaFechaDiferencia de 2–7 días → flag DATE_FUZZYWording"reach" vs "above" vs "hit" → flag WORDING_AMBIGUOUSTimezoneEST vs UTC → flag TZ_DIFF (puede ser hasta 5h de diferencia)ThresholdDiferencia ≤ 0.5% del valor (ej: $100K vs $99,950) → flag THRESHOLD_FUZZY
Nivel 3 — No Equivalentes
CondiciónMotivoFechas diferentes > 7 díasExposición al riesgo completamente distintaThresholds diferentesProbabilidades no comparablesUno tiene condición adicionalEj: "Bitcoin above $100K AND no major exchange hack"Uno es range, otro es binaryEj: Kalshi price range $68K–$68.5K vs Polymarket "Bitcoin above $68K"Granularidad temporal incompatibleKalshi 15-min vs Polymarket daily

3. Casos Concretos Analizados
Caso 1: Bitcoin Price $100K
Polymarket: "Will Bitcoin reach $100,000 by March 31, 2026?"
Kalshi:     "Bitcoin above $100K on March 31, 2026"
Resultado: ⚠️ Equivalencia Probable (flag: WORDING_AMBIGUOUS + DATE_BOUNDARY)

"by March 31" = cualquier momento hasta el 31/03 → resolución continua
"on March 31" = snapshot del precio ese día específico → resolución puntual
Diferencia real: Si Bitcoin toca $100K el 15/03 pero cae al 31/03, Polymarket resuelve YES y Kalshi resuelve NO
Conclusión: NO son estrictamente equivalentes. Usar como "relacionados" con descuento de confianza.

Caso 2: US Presidential Election 2028
Polymarket: "Which party wins 2028 US Presidential Election?" → 55% Democratic
Kalshi:     "2028 U.S. Presidential Election winner?" → JD Vance 23%
Resultado: ✅ Equivalentes (mismo evento, misma fecha)

Diferencia de odds real: Polymarket favorece a Demócratas (55%), Kalshi muestra a JD Vance en 23% (implícito: Republican nominee)
Oportunidad: Spread entre plataformas = señal de arbitraje potencial
Flag: ODDS_DIVERGENCE (diferencia > 5pp entre plataformas)

Caso 3: "By end of" vs "On last day"
Polymarket: "Bitcoin above $100K by end of March 2026"
Kalshi:     "Bitcoin above $100K on March 31, 2026, 11:59pm ET"
Resultado: ❌ No equivalentes

"by end of March" puede resolverse antes del 31/03 si el precio se alcanza antes
"on March 31, 11:59pm ET" es un snapshot puntual: solo ese momento importa
La probabilidad de YES puede diferir sustancialmente incluso con el mismo precio actual

Caso 4: Bitcoin 15-min markets (Kalshi) vs 1-hour markets (Polymarket)
Kalshi:     "BTC Up or Down - 15 minutes" → Down 98%
Polymarket: "Bitcoin Up or Down - February 25, 6:55PM–7:00PM ET" → Up 51%
Resultado: ❌ No equivalentes

Ventanas temporales distintas
Hora del screenshot distinta
Estos nunca pueden matchearse como equivalentes


4. Casos Edge y Cómo Manejarlos
Caso EdgeHandling recomendadoKalshi usa price ranges, Polymarket usa binaryNo matchear; mostrar como "relacionados" en UIFechas off-by-one (ej: 31 Mar vs 1 Apr)Revisar si es diferencia de timezone (EST vs UTC) antes de descartarUn mercado ya resolvió, el otro noMarcar como RESOLVED_DIVERGENCE, útil para calibraciónMismo evento, diferente granularidad (State vs National)No equivalentes, pero sí relacionadosWording implica condición diferente ("at least once" vs "at close")Flag CONDITION_AMBIGUOUS, requiere revisión manualMercados de partido vs mercados de personaEquivalentes si mismo evento (partido ganador ≈ candidato ganador cuando hay candidato claro)

1. Observaciones Específicas de las Capturas

Kalshi Bitcoin tiene mucho más volumen en mercados de corto plazo y price ranges. No hay equivalentes directos en Polymarket para la mayoría de estos.
Kalshi Elections y Polymarket Elections tienen buena cobertura en los mismos tópicos (Senate por estado, Governor races, 2028 Presidential) — son los mejores candidatos para matching cross-platform.
Odds divergentes observadas en elecciones 2028: diferencia de >10pp en algunos mercados. Esto es la feature más valiosa para tu comparador.
Polymarket está en español en las capturas (interfaz localizada), lo que no afecta el matching pero sí el scraping si usás XPath basado en texto.