PARTE 2: KALSHI 🟠
A) Autenticación
Investigación 2.1: Implementación de Auth
Objetivo: Hacer que funcione la autenticación
Ya tienes API key. Ahora necesitas:
Doc oficial:
https://trading-api.readme.io/reference/authentication
Preguntas críticas:

¿El signature es HMAC-SHA256?
¿Qué va en el mensaje a firmar?

Formato: timestamp + method + path + body?
¿O diferente?

Get Orders
Restricts the response to orders that have a certain status: resting, canceled, or executed.

GET /portfolio/orders

Authorizations
​
KALSHI-ACCESS-KEY
stringheaderrequired
Your API key ID

​
KALSHI-ACCESS-SIGNATURE
stringheaderrequired
RSA-PSS signature of the request

​
KALSHI-ACCESS-TIMESTAMP
stringheaderrequired
Request timestamp in milliseconds


¿Timestamp en milliseconds o seconds?
¿Body va como JSON string o raw?
¿Encoding del signature (hex, base64)?
¿Headers exactos?

Crear test script:
javascript// test-kalshi-auth.js
const crypto = require('crypto');

const API_KEY = process.env.KALSHI_API_KEY;
const PRIVATE_KEY = process.env.KALSHI_PRIVATE_KEY;

function generateSignature(method, path, body = '') {
  const timestamp = Date.now(); // ¿O Date.now() / 1000?
  
  // Probar diferentes formatos:
  // Opción 1:
  const message = `${timestamp}${method}${path}${body}`;
  
  // Opción 2:
  // const message = `${method}\n${path}\n${timestamp}\n${body}`;
  
  const signature = crypto
    .createHmac('sha256', PRIVATE_KEY)
    .update(message)
    .digest('hex'); // ¿O 'base64'?
  
  return `${API_KEY}:${timestamp}:${signature}`;
}

// Test
const auth = generateSignature('GET', '/trade-api/v2/markets');

fetch('https://api.elections.kalshi.com/trade-api/v2/markets?limit=1', {
  headers: {
    'Authorization': auth,
    'Content-Type': 'application/json'
  }
})
.then(r => r.json())
.then(console.log)
.catch(console.error);
Entregable:
markdown# docs/kalshi-auth-working.md

## Signature Generation
```javascript
// Formato CONFIRMADO que funciona:
const message = `${timestamp}${method}${path}${body}`;
const signature = crypto
  .createHmac('sha256', privateKey)
  .update(message)
  .digest('hex');

const authHeader = `${apiKey}:${timestamp}:${signature}`;
```

## Headers Requeridos
```
Authorization: [formato arriba]
Content-Type: application/json
```

## Timestamp
- Formato: [milliseconds/seconds]
- Ejemplo: 1771781313157

B) Estructura de Markets
Investigación 2.2: Events vs Markets (Kalshi)
Objetivo: Mismo que Polymarket
Endpoints:
bash# Events
GET /trade-api/v2/events?status=open

# Markets
GET /trade-api/v2/markets?status=open

# Event individual
GET /trade-api/v2/events/[event_ticker]

# Market individual
GET /trade-api/v2/markets/[market_ticker]
Preguntas:

¿Un EVENT tiene múltiples MARKETS?
Ejemplo: Event "PRESIDENT-2024" → Markets:

"PRESIDENT-2024-TRUMP"
"PRESIDENT-2024-BIDEN"


¿Cómo se relacionan?
¿Para comparar usamos qué nivel?

Entregable:
markdown# docs/kalshi-structure.md

## Jerarquía
[Similar a Polymarket doc]

## Series
Kalshi tiene concepto de "Series":
- ¿Qué es?
- ¿Cómo se relaciona con Events/Markets?

Investigación 2.3: Tipos de Markets (Kalshi)
Objetivo: Identificar qué es comparable
Del archivo que compartiste:
javascript// Parece que Kalshi tiene "market_type"
// ¿Qué valores tiene este campo?
Preguntas:

¿Qué valores tiene market_type?

binary?
scalar?
yesno?


¿Todos son comparables con Polymarket?
¿Hay markets con "strike prices"?

Ejemplo: "Bitcoin above $100K" (binario) ✅
vs "Bitcoin price range $90K-110K" (escalar) ❌



Probar:
bash# Get 50 markets
GET /trade-api/v2/markets?limit=50

# Revisar campo market_type de cada uno
# Listar todos los valores únicos
Entregable:
markdown# docs/kalshi-market-types.md

## Tipos Encontrados
- [tipo 1]: [cantidad] markets, [ejemplo]
- [tipo 2]: [cantidad] markets, [ejemplo]

## Comparables con Polymarket
Solo tipo: [X]
Razón: [ambos son binarios YES/NO]

## Filtrado
En queries agregar: `&market_type=[X]`
```

---

#### **Investigación 2.4: Precios (Kalshi)**
**Objetivo:** Entender bid/ask system

**Del listado de endpoints tienes:**
```
Get Market
Campos esperados:
javascript{
  "yes_bid": 0.48,  // Alguien quiere COMPRAR YES a 0.48
  "yes_ask": 0.51,  // Alguien quiere VENDER YES a 0.51
  "no_bid": 0.49,
  "no_ask": 0.52,
  "last_price": 0.50
}
Preguntas:

¿Para comparador usamos:

Opción A: Midpoint (yes_bid + yes_ask) / 2?
Opción B: last_price?
Opción C: yes_ask (precio al que puedes comprar)?


¿Los precios están en escala 0-1 o 0-100?
¿Incluyen fees?
¿Qué representa cada campo exactamente?

Entregable:
markdown# docs/kalshi-pricing.md

## Bid/Ask System
- yes_bid: [explicación]
- yes_ask: [explicación]
- Spread: yes_ask - yes_bid = [típicamente cuánto?]

## Para Comparador
Usaremos: [opción X]
Razón: [explicar por qué es justo/comparable]

## Conversión
```typescript
// Kalshi usa centavos (0-100)
const yesPrice = yes_ask / 100; // Para comparar con Poly

// O Kalshi usa 0-1 ya?
const yesPrice = yes_ask;
```

Investigación 2.5: Fees (Kalshi)
Objetivo: Calcular effective price
Preguntas CRÍTICAS:

¿Fees son 7% flat? ¿O varían?
¿Hay campo fee en cada market?
¿Hay fees diferentes para maker/taker?
¿Fees de withdrawal?
¿Los precios incluyen fees o no?

Buscar en:

Response de GET /markets/[ticker]
Docs oficiales de Kalshi sobre fees
Tu cuenta: Settings → Fees

Entregable:
markdown# docs/kalshi-fees.md

## Fee Structure
- Trading fee: [X%]
- Varía por market: [SI/NO]
- Maker/Taker difference: [SI/NO]
- Withdrawal: [costo]

## Cálculo
[Similar a Polymarket]

Investigación 2.6: Volumen y Liquidez (Kalshi)
Campos a investigar:
javascript{
  "volume": ???,
  "volume_24h": ???,
  "liquidity": ???,
  "open_interest": ???
}
Preguntas:

¿Qué campos existen exactamente?
¿Formato (USD, cents, contracts)?
¿open_interest disponible?

Entregable:
markdown# docs/kalshi-volume.md
[Similar estructura a Polymarket]

Investigación 2.7: Pagination (Kalshi)
Objetivo: Sincronizar todos los markets
De tu listado veo que Kalshi usa CURSOR pagination
Preguntas:

¿Cómo funciona el cursor?
¿Viene en response como next_cursor?
¿Límite máximo por request?
¿Cuántos markets hay total en Kalshi?

Probar:
bash# Request 1
GET /markets?limit=200

# ¿Response tiene cursor?
# {
#   "markets": [...],
#   "cursor": "abc123"
# }

# Request 2
GET /markets?limit=200&cursor=abc123
Entregable:
markdown# docs/kalshi-pagination.md

## Cursor System
- Campo en response: [nombre exacto]
- Límite por request: [200?]
- Total markets: ~[X]

## Para Sync Job
Loop hasta que cursor = null
Tiempo estimado: [X minutos]

Investigación 2.8: Rate Limits (Kalshi)
Preguntas:

¿Límites con API key?
¿Headers de rate limit?
¿Qué pasa si excedes (429 error)?

Probar:
bash# 100 requests rápidos con auth
Entregable:
markdown# docs/kalshi-rate-limits.md
[Similar a Polymarket]