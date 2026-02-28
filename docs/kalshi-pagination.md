Probar:
bash# Request 1
GET /markets?limit=200

# ¿Response tiene cursor?
# {
#   "markets": [...],
#   "cursor": "abc123"
# }

https://api.elections.kalshi.com/trade-api/v2/markets?limit=200&status=open
    "cursor": "CgoIvqrzzAYQuMRuEjlLWE1WRVNQT1JUU01VTFRJR0FNRUVYVEVOREVELVMyMDI2MTkyRTQwQjUyRDAtNEQyMDI2QjMxN0Y",
"markets": []


# Request 2
GET /markets?limit=200&cursor=abc123
Parece ser la misma respuesta con todos los markets


---

## ¿Cómo funciona el cursor?

Kalshi usa **cursor-based pagination** para endpoints que devuelven listas (como `/markets`, `/events`, `/trade`, etc.).  
Esto permite recorrer grandes result sets de forma segura sin repetir datos ni saltos.

---

## Cursor System

### 🔹 Campo de cursor en la response

- El campo que viene en la respuesta se llama exactamente:  
  **`cursor`** :contentReference[oaicite:1]{index=1}

Ejemplo de response:

```json
{
  "markets": [...],
  "cursor": "<opaque_token>"
}
🔹 ¿Cómo se usa en requests?

En la request siguiente pasas:

?cursor=<valor_de_cursor>

para recuperar la siguiente página.

🔹 ¿Límite por request?

Puedes controlar cuántos items vienen por página usando el parámetro:

limit

Default: 100

Máximo soportado: 1000

Entonces cada llamada puede traer hasta 1000 markets, trades, etc., antes de necesitar otro cursor.

¿Cuántos markets hay en total?

La API en sí no devuelve un contador total de markets en un solo campo estándar.

Si quieres saber cuántos markets existen, deberías:

Paginar todo con GET /markets desde el inicio

Sumar la longitud de cada página

Parar cuando cursor llegue vacío

📌 Esto es típico para APIs con cursor paginado — no hay “total_count” directo.

Fuera de la API oficial, estimadores de mercado sugieren que hay trescientos miles de markets abiertos activos en Kalshi (comparadores del ecosistema), pero esto no está expuesto directamente por la API oficial.

Para un Sync Job
Pseudocódigo típico
cursor = null
all_markets = []

do {
  response = GET /markets?limit=1000&cursor=cursor
  all_markets.push(response.markets)
  cursor = response.cursor
} while (cursor)
Para estimar el tiempo total

Supongamos:

~300,000 markets totales (estimado externo)

limit = 1000 por llamada

Entonces ~300 páginas

Si asumes ~10 calls por segundo (estimando safe rate limit):

300 pages / 10 cps ≈ 30 segundos

Si limitas a 100/page:

3000 pages / 10 cps ≈ 300 segundos (5 minutos)

Esto significa que un job de sincronización completo puede tardar entre ~30s y ~5m dependiendo del page size y rate limits.

Resumen rápido
Aspecto	Valor
Campo de cursor en response	cursor
Límite máximo por request	1000
Total markets	No expuesto directamente; estimado externo en cientos miles
Estrategia de sync	Loop hasta que cursor sea vacío
Tiempo estimado	30s–5min dependiendo de límites rate/limit