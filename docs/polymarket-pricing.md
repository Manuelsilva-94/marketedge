 1. Precio en /markets
GET https://gamma-api.polymarket.com/markets/[slug]
# Revisar campo: outcomePrices (string JSON)

"outcomePrices": "[\"0.027\", \"0.973\"]",

# 2. Midpoint price
GET https://clob.polymarket.com/midpoint?token_id=[conditionId]

Retrieves the midpoint price for a specific token ID. The midpoint is calculated as the average of the best bid and best ask prices.

https://clob.polymarket.com/midpoint?token_id=5644679982684846699855787022092402984369447277920326773883608030240292167917

{
    "mid": "0.0105"
}

# 3. Order book
GET https://clob.polymarket.com/book?token_id=[conditionId]

Retrieves the order book summary for a specific token ID. Includes bids, asks, market details, and last trade price.

The Order Book
The order book is a list of all open buy and sell orders for a market. It has two sides:
Side	Description
Bids	Buy orders—the highest prices traders are willing to pay
Asks	Sell orders—the lowest prices traders are willing to accept
The spread is the gap between the highest bid and lowest ask. Tighter spreads mean more liquid markets.

https://clob.polymarket.com/book?token_id=5644679982684846699855787022092402984369447277920326773883608030240292167917

{
    "market": "0x567f1ff714731fafa702d454a105b064a7ec4d10f6fb71ad3221f4918681c709",
    "asset_id": "5644679982684846699855787022092402984369447277920326773883608030240292167917",
    "timestamp": "1771793132039",
    "hash": "fb096c2055945e38f5646535fbef3ec212fcf21d",
    "bids": [
        {
            "price": "0.001",
            "size": "1916727.52"
        },
        {
            "price": "0.002",
            "size": "105580"
        },
        {
            "price": "0.003",
            "size": "60400"
        },
        {
            "price": "0.004",
            "size": "24500"
        },
        {
            "price": "0.005",
            "size": "16200"
        },
        {
            "price": "0.006",
            "size": "10000"
        },
        {
            "price": "0.007",
            "size": "10267.15"
        },
        {
            "price": "0.008",
            "size": "9925"
        },
        {
            "price": "0.009",
            "size": "11454.41"
        },
        {
            "price": "0.01",
            "size": "892.41"
        }
    ],
    "asks": [
        {
            "price": "0.999",
            "size": "5000145"
        },
        {
            "price": "0.998",
            "size": "257.48"
        },
        {
            "price": "0.997",
            "size": "400"
        },
        {
            "price": "0.996",
            "size": "3003600"
        },
        {
            "price": "0.995",
            "size": "700006.91"
        },
        {
            "price": "0.994",
            "size": "200"
        },
        {
            "price": "0.99",
            "size": "17510"
        },
        {
            "price": "0.989",
            "size": "1818.18"
        },
        {
            "price": "0.988",
            "size": "7.62"
        },
        {
            "price": "0.98",
            "size": "20720"
        },
        {
            "price": "0.97",
            "size": "5000"
        },
        {
            "price": "0.969",
            "size": "7.24"
        },
        {
            "price": "0.96",
            "size": "2500"
        },
        {
            "price": "0.958",
            "size": "502000"
        },
        {
            "price": "0.957",
            "size": "400000"
        },
        {
            "price": "0.953",
            "size": "2000"
        },
        {
            "price": "0.95",
            "size": "630"
        },
        {
            "price": "0.92",
            "size": "23.5"
        },
        {
            "price": "0.919",
            "size": "5.62"
        },
        {
            "price": "0.908",
            "size": "81400"
        },
        {
            "price": "0.907",
            "size": "1001"
        },
        {
            "price": "0.906",
            "size": "250"
        },
        {
            "price": "0.9",
            "size": "1000"
        },
        {
            "price": "0.86",
            "size": "600"
        },
        {
            "price": "0.82",
            "size": "5"
        },
        {
            "price": "0.8",
            "size": "500"
        },
        {
            "price": "0.799",
            "size": "5.83"
        },
        {
            "price": "0.729",
            "size": "1180"
        },
        {
            "price": "0.716",
            "size": "300"
        },
        {
            "price": "0.69",
            "size": "5"
        },
        {
            "price": "0.66",
            "size": "200"
        },
        {
            "price": "0.53",
            "size": "5"
        },
        {
            "price": "0.529",
            "size": "10"
        },
        {
            "price": "0.5",
            "size": "38.46"
        },
        {
            "price": "0.49",
            "size": "900"
        },
        {
            "price": "0.48",
            "size": "930"
        },
        {
            "price": "0.469",
            "size": "5000"
        },
        {
            "price": "0.466",
            "size": "500"
        },
        {
            "price": "0.462",
            "size": "5555"
        },
        {
            "price": "0.46",
            "size": "1641"
        },
        {
            "price": "0.459",
            "size": "3529"
        },
        {
            "price": "0.3",
            "size": "5"
        },
        {
            "price": "0.2",
            "size": "5005"
        },
        {
            "price": "0.179",
            "size": "3000"
        },
        {
            "price": "0.178",
            "size": "400"
        },
        {
            "price": "0.09",
            "size": "1000"
        },
        {
            "price": "0.08",
            "size": "1000"
        },
        {
            "price": "0.075",
            "size": "1000"
        },
        {
            "price": "0.073",
            "size": "1510"
        },
        {
            "price": "0.072",
            "size": "30"
        },
        {
            "price": "0.07",
            "size": "1000"
        },
        {
            "price": "0.067",
            "size": "2000"
        },
        {
            "price": "0.063",
            "size": "10"
        },
        {
            "price": "0.06",
            "size": "2800"
        },
        {
            "price": "0.056",
            "size": "2000"
        },
        {
            "price": "0.055",
            "size": "3000"
        },
        {
            "price": "0.054",
            "size": "1000"
        },
        {
            "price": "0.053",
            "size": "2692.3"
        },
        {
            "price": "0.052",
            "size": "2000"
        },
        {
            "price": "0.05",
            "size": "3144"
        },
        {
            "price": "0.049",
            "size": "1010"
        },
        {
            "price": "0.048",
            "size": "3000"
        },
        {
            "price": "0.047",
            "size": "3000"
        },
        {
            "price": "0.046",
            "size": "1500"
        },
        {
            "price": "0.045",
            "size": "2000"
        },
        {
            "price": "0.044",
            "size": "1500"
        },
        {
            "price": "0.043",
            "size": "2500"
        },
        {
            "price": "0.042",
            "size": "3000"
        },
        {
            "price": "0.04",
            "size": "3000"
        },
        {
            "price": "0.039",
            "size": "3196.15"
        },
        {
            "price": "0.038",
            "size": "1000"
        },
        {
            "price": "0.037",
            "size": "8555"
        },
        {
            "price": "0.036",
            "size": "2500"
        },
        {
            "price": "0.035",
            "size": "8565"
        },
        {
            "price": "0.034",
            "size": "2500"
        },
        {
            "price": "0.033",
            "size": "9555"
        },
        {
            "price": "0.032",
            "size": "3050"
        },
        {
            "price": "0.031",
            "size": "13111"
        },
        {
            "price": "0.03",
            "size": "8805"
        },
        {
            "price": "0.029",
            "size": "18666"
        },
        {
            "price": "0.028",
            "size": "10055"
        },
        {
            "price": "0.027",
            "size": "20666"
        },
        {
            "price": "0.026",
            "size": "9055"
        },
        {
            "price": "0.025",
            "size": "9095"
        },
        {
            "price": "0.024",
            "size": "7276.92"
        },
        {
            "price": "0.023",
            "size": "18886"
        },
        {
            "price": "0.022",
            "size": "15992.9"
        },
        {
            "price": "0.021",
            "size": "8983.28"
        },
        {
            "price": "0.02",
            "size": "18983.28"
        },
        {
            "price": "0.019",
            "size": "15991.75"
        },
        {
            "price": "0.018",
            "size": "14970.69"
        },
        {
            "price": "0.017",
            "size": "13618.9"
        },
        {
            "price": "0.016",
            "size": "4428.54"
        },
        {
            "price": "0.015",
            "size": "6528.57"
        },
        {
            "price": "0.014",
            "size": "8626"
        },
        {
            "price": "0.013",
            "size": "4585.59"
        },
        {
            "price": "0.012",
            "size": "1883.12"
        },
        {
            "price": "0.011",
            "size": "20"
        }
    ],
    "min_order_size": "5",
    "tick_size": "0.001",
    "neg_risk": true,
    "last_trade_price": "0.010"
}

# 4. Trades recientes
GET https://clob.polymarket.com/trades?token_id=[conditionId]


Otros Endpoints:
Get market price

Retrieves the best market price for a specific token ID and side (bid or ask). Returns the best bid price for BUY side or best ask price for SELL side.

GET

https://clob.polymarket.com/price


Get market prices (query parameters)

Copy page

Retrieves market prices for multiple token IDs and sides using query parameters.

GET

https://clob.polymarket.com/prices

curl --request GET \
  --url https://clob.polymarket.com/prices


{
  "0xabc123def456...": {
    "BUY": 0.45
  },
  "0xdef456abc123...": {
    "SELL": 0.52
  }
}
Query Parameters
​
token_ids
stringrequired
Comma-separated list of token IDs

​
sides
stringrequired
Comma-separated list of sides (BUY or SELL) corresponding to token IDs


Get spread

Copy page

Retrieves the spread for a specific token ID. The spread is the difference between the best ask and best bid prices.

GET

https://clob.polymarket.com/spread


Get prices history

Copy page

Retrieve historical price data for a market.

GET

https://clob.polymarket.com/prices-history
Preguntas:

outcomePrices retorna ["0.48", "0.52"]:

¿[0] siempre es YES?
SI
¿Están en escala 0-1 o 0-100?
"outcomePrices": "[\"0.027\", \"0.973\"]",

¿Incluyen fees o no?
no

midpoint retorna {"mid": 0.485}:

¿Es más preciso que outcomePrices?
¿Cuándo usar uno vs otro?
En la API de Polymarket normalmente verás ambos campos:

midpointPrice

outcomePrices

Pero no significan exactamente lo mismo.

1️⃣ outcomePrices → precio ejecutable del AMM (más “real”)

Es el precio actual del token del outcome (Yes/No) en el AMM.

Ejemplo:

"outcomePrices": ["0.63", "0.37"]

Eso significa:

YES = 0.63

NO = 0.37

👉 Es el precio marginal actual según el pool.

Ventajas

Refleja el estado real del AMM.

Es el que efectivamente usarías para estimar probabilidad implícita.

Es el más consistente para modelado cuantitativo.

Desventajas

Puede ser ruidoso si hay poca liquidez.

Puede moverse por trades pequeños.

2️⃣ midpointPrice → promedio bid/ask (más “estable”)

Es el punto medio entre mejor bid y mejor ask en el orderbook.

"midpointPrice": "0.615"

👉 Es más estable si hay spreads amplios.

Ventajas

Menos saltos que outcomePrices.

Mejor proxy de “fair value” si hay buen orderbook.

Desventajas

Si no hay órdenes, puede ser stale.

No siempre refleja ejecutabilidad inmediata.

🎯 ¿Cuál es más preciso?
Para probabilidad implícita → usa outcomePrices

Porque:

Es el precio real del AMM

Es lo que realmente pagarías

Es lo que usa la UI para mostrar %

Para backtesting o señal cuantitativa → depende
Caso	Mejor campo
Alta liquidez	midpointPrice
Baja liquidez	outcomePrices
Trading automatizado	outcomePrices
Modelado estadístico	outcomePrices
Detección de spreads	midpointPrice
⚠️ Caso especial: multi-strike ladders

En markets con marketGroup (multi-strike):

outcomePrices suele ser más consistente strike a strike.

midpointPrice puede romper monotonicidad si hay spreads raros.

Si estás construyendo una curva tipo options ladder, usa outcomePrices.

🧠 Regla práctica profesional

Si solo puedes elegir uno:

✅ Usa outcomePrices[YES_INDEX]

Es el estándar de facto para:

estimar probabilidad

hacer tracking

arbitraje

modelado

Order book:

¿Tiene bids y asks?
si

¿Necesitamos esto para el comparador?
No necesariamente. Porque el order book registra los movimientos que son los que mueven el precio. Pero a nosotros ya nos sirve directamnte el valor del precio

¿O solo para detectar "paredes" de liquidez?
Para esto puede ser (no se que significa)

Liquidez:

Campo liquidity: ¿qué representa?
En la API de Polymarket, los campos de liquidity mezclan dos fuentes distintas porque hoy el trading puede ocurrir en:

AMM (Automated Market Maker histórico)

CLOB (Central Limit Order Book, orderbook)

Por eso verás campos separados.

📌 Qué significa cada campo
1️⃣ liquidity
"liquidity": "<string>"

Es el valor total agregado de liquidez del mercado.

Viene como string por compatibilidad (evita problemas de precisión).

Suele representar la suma económica (USD) disponible combinando fuentes.

👉 Es básicamente un “display value”.

2️⃣ liquidityNum
"liquidityNum": 123

Lo mismo que liquidity pero como número.

Más cómodo para cálculos.

👉 Si necesitas operar programáticamente, usa este.

3️⃣ liquidityAmm
"liquidityAmm": 123

Liquidez que está en el pool AMM.

Representa el capital depositado en el mecanismo automático de pricing.

Puede ser 0 en mercados nuevos que solo usan CLOB.

👉 Importante si modelas slippage estilo x*y=k.

4️⃣ liquidityClob
"liquidityClob": 123

Liquidez disponible en el orderbook.

Deriva de órdenes activas (bids/asks).

Cambia constantemente.

👉 Es lo relevante si haces market making o tomas liquidez vía book.

🧠 Cómo interpretarlo correctamente
Caso A — Mercado viejo AMM puro
liquidityAmm > 0
liquidityClob = 0

Toda la liquidez viene del pool.

Caso B — Mercado moderno CLOB
liquidityAmm = 0
liquidityClob > 0

Solo hay orderbook.

Caso C — Híbrido
liquidityAmm > 0
liquidityClob > 0

Ambos coexisten.

⚠️ Muy importante: Qué NO es “liquidity”

No significa:

Volumen negociado

Open interest

Profundidad real a cualquier tamaño

Es más bien una medida agregada de capital disponible.

🎯 Para qué usar cada uno
Si quieres medir	Usa
Profundidad AMM	liquidityAmm
Profundidad book	liquidityClob
Ranking rápido de mercados	liquidityNum
Estimar slippage AMM	liquidityAmm
Estimar ejecutabilidad real	liquidityClob
🧩 Insight cuantitativo importante

En mercados CLOB:

liquidityClob ≠ profundidad real a tu tamaño.

Puede haber:

Mucha liquidez total

Pero muy concentrada lejos del mid

Si haces trading cuantitativo, deberías usar el endpoint del orderbook en lugar de confiar solo en liquidityClob.

¿Total USD disponible?
¿Por lado (YES/NO) o combinado?
A que se refieren estas preguntas?


## Para Comparador MVP
Usaremos: Hace vos este analisis
