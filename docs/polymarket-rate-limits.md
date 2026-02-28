Investigación 1.7: Rate Limits
Objetivo: No romper sus servers
Probar:
bash# Script para hacer 200 requests rápidos
for i in {1..200}; do
  curl https://gamma-api.polymarket.com/markets?limit=1
done

# ¿En qué request falla?
# ¿Retorna 429 Too Many Requests?
# ¿Qué headers de rate limit hay?
Preguntas:

¿Cuál es el límite? (requests/minuto)
¿Hay diferentes límites por endpoint?
¿Necesitamos API key para más requests?
¿Headers X-RateLimit-* en respuestas?

📊 Límites de Requests de la API de Polymarket
🌐 Límites generales

Polymarket aplica rate limits vía Cloudflare en sus APIs. Si excedes los límites, las peticiones no se rechazan inmediatamente sino que se throttlean/ponen en cola antes de responder.

⏱️ Límite por tiempo

Los límites están definidos por ventanas deslizantes, generalmente por 10 segundos (no por minuto), así que debes tenerlo en cuenta al planear tus requests.

Por ejemplo, para algunos endpoints clásicos:

API / Endpoint	Límite aproximado
General REST (todos)	~15 000 requests / 10 s
Gamma (market data)	~4 000 requests / 10 s
/gamma-api/markets	~300 requests / 10 s
Data API (history, holders, etc.)	~1 000 requests / 10 s
Data API trades	~200 requests / 10 s
Data API positions	~150 requests / 10 s

👉 Ese esquema NO se expresa exactamente como X requests/minuto, sino como cantidad por 10 segundos, lo que equivale aproximadamente a 6× esos valores por minuto si distribuyes las llamadas uniformemente.

📊 Ejemplo práctico (por minuto)

Si un endpoint tiene un límite de 300 req / 10 s, eso sería:

≈ 1 800 requests / minuto si haces 300 cada 10 s consecutivos

Normalmente Cloudflare permite burst subiendo y bajando el ritmo

🔐 Autenticados vs No autenticados

La documentación oficial no indica limites por minuto por IP vs por API key, pero herramientas de terceros y guías sugieren que:

Públicos (sin auth): ~100–300 req/min — como referencia práctica 🧠 (esto no es oficial)

Autenticados con API key: valores más altos (~300 req/min por key) según terceros

Nota: esas cifras de 100/300 por minuto aparecen en guías de comunidad y no en la documentación oficial directamente.

🧠 Claves a recordar

Rate limits NO son un único valor por minuto — están segmentados por endpoint y medidos por ventanas de 10 segundos.

Exceder límites típicamente no rechaza inmediatamente, pero puede introducir latencia o throttling.

Para datos muy pesados, lo ideal es:

Usar WebSockets donde sea posible.

Agrupar consultas.

Backoff exponencial en caso de 429.

🧾 Resumen rápido

No hay un valor de “X requests/minuto” único para toda la API oficial.

Los límites oficiales se expresan como porciones por 10 segundos (p. ej., 1 000 / 10 s).

Según guías comunitarias, un límite práctico para REST público ronda 100–300 req/min por IP o API key para requests generales.