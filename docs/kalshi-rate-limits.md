# Rate Limits – Kalshi API

Referencia: :contentReference[oaicite:0]{index=0}

---

# 🔐 ¿Hay límites cuando usas API key?

Sí.

Los endpoints autenticados (`/portfolio`, `/orders`, `/positions`, `/trade`, etc.) tienen **rate limits por API key**.

Esto significa:

- El límite aplica a tu `KALSHI-ACCESS-KEY`
- No es global
- No depende del IP únicamente
- Puede variar por entorno (prod vs elections)

---

# 📊 Límites típicos (prácticos)

Aunque Kalshi no siempre publica números fijos universales, en la práctica:

- ~10–20 requests por segundo suele ser seguro
- Endpoints de trading pueden tener límites más estrictos
- Burst excesivo → 429

Si estás haciendo sync masivo:

✔️ Usa `limit` alto (ej. 1000)  
✔️ No hagas polling agresivo  
✔️ Implementa backoff automático  

---

# 📦 Headers de Rate Limit

Cuando estás cerca del límite, la API puede devolver headers como:


X-RateLimit-Limit
X-RateLimit-Remaining
X-RateLimit-Reset


No todos los endpoints siempre los exponen, pero cuando aparecen significan:

| Header | Significado |
|--------|------------|
| X-RateLimit-Limit | Máximo permitido en la ventana |
| X-RateLimit-Remaining | Requests restantes |
| X-RateLimit-Reset | Timestamp de reset |

---

# 🚨 ¿Qué pasa si excedes el límite?

Recibes:

```http
HTTP 429 Too Many Requests

Ejemplo:

{
  "error": "rate limit exceeded"
}
🔁 Qué hacer ante 429

Implementar:

1️⃣ Exponential Backoff
delay = baseDelay * (2 ^ retryCount)

Ejemplo:

1er retry → 500ms

2do → 1s

3ro → 2s

4to → 4s

2️⃣ Respetar Retry-After (si viene)

Algunas respuestas 429 incluyen:

Retry-After: 2

Significa esperar 2 segundos antes de reintentar.

🧠 Buenas prácticas para tu Sync Job

Si estás sincronizando todos los markets:

limit = 1000
delay entre requests = 100ms–200ms
manejar 429 con backoff

Eso te permite:

~5–10 req/seg

Sin bloqueos

Sin throttling agresivo

⚠️ Importante

Si abusas del rate limit repetidamente:

Pueden throttlear tu API key

Temporalmente bloquearla

Aplicar límites más estrictos

🎯 Resumen Ejecutivo
Pregunta	Respuesta
¿Límites con API key?	Sí
¿Headers de rate limit?	A veces (X-RateLimit-*)
¿Error si excedes?	429 Too Many Requests
¿Solución?	Backoff + control de velocidad