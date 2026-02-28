Investigación 4.1: Historical Data
Objetivo: Para gráficos y análisis
Polymarket:
bash# ¿Existe este endpoint?
GET /prices-history?market=[id]
Kalshi:
bashGET /historical/market-candlesticks?ticker=[X]
Preguntas:

¿Ambas plataformas tienen historical prices?
¿Desde cuándo? (6 meses? 1 año?)
¿Granularidad? (hourly, daily?)
¿Rate limits?

Tenemos las siguientes APIs:
Polymarket:

## Get order book
Retrieves the order book summary for a specific token ID. Includes bids, asks, market details, and last trade price.

## Get prices history
Retrieve historical price data for a market.

Kalshi:

## Get Historical Market Candlesticks
Endpoint for fetching historical candlestick data for markets that have been archived from the live data set. Time period length of each candlestick in minutes. Valid values: 1 (1 minute), 60 (1 hour), 1440 (1 day).
GET
/historical/markets/{ticker}/candlesticks

## Get Market Candlesticks
Time period length of each candlestick in minutes. Valid values: 1 (1 minute), 60 (1 hour), 1440 (1 day).
GET 
https://api.elections.kalshi.com/trade-api/v2/series/{series_ticker}/markets/{ticker}/candlesticks

## Get Market Orderbook
Endpoint for getting the current order book for a specific market. The order book shows all active bid orders for both yes and no sides of a binary market. It returns yes bids and no bids only (no asks are returned). This is because in binary markets, a bid for yes at price X is equivalent to an ask for no at price (100-X). For example, a yes bid at 7¢ is the same as a no ask at 93¢, with identical contract sizes. Each side shows price levels with their corresponding quantities and order counts, organized from best to worst prices.

GET
/markets/{ticker}/orderbook

## Batch Get Market Candlesticks
Endpoint for retrieving candlestick data for multiple markets.

Accepts up to 100 market tickers per request
Returns up to 10,000 candlesticks total across all markets
Returns candlesticks grouped by market_id
Optionally includes a synthetic initial candlestick for price continuity (see include_latest_before_start parameter)
GET
/markets/candlesticks


Historical Price Data: Polymarket vs Kalshi

Resumen Ejecutivo
CaracterísticaPolymarketKalshiEndpoint existe✅ Sí✅ SíEndpoint URLGET /prices-historyGET /series/{series}/markets/{ticker}/candlesticksGranularidad mínimaConfigurable en minutos (fidelity)1 minuto (period_interval=1)Granularidad máximaSin especificar en docs1 día (period_interval=1440)Rango históricoHasta el origen del market (interval=max)Toda la vida del market (sin límite documentado)Rate limit (historical)1000 req / 10s20 req/s (Basic), 100 req/s (Premier)Auth requeridaNo (read-only)Sí (API key)Formato de respuesta[{t: unix_ts, p: precio}]OHLC completo + bid/ask + volumen + open interest

Polymarket: GET /prices-history
Endpoint
GET https://clob.polymarket.com/prices-history
Parámetros
ParámetroTipoRequeridoDescripciónmarketstring✅CLOB token ID del outcome (YES o NO son tokens distintos)startTsnumber⬜Unix timestamp UTC de inicioendTsnumber⬜Unix timestamp UTC de finintervalenum⬜Shorthand de rango. Mutuamente exclusivo con startTs/endTsfidelitynumber⬜Resolución en minutos
Valores de interval
ValorDescripción1mÚltimo mes1wÚltima semana1dÚltimo día6hÚltimas 6 horas1hÚltima horamaxTodo el historial disponible
Respuesta
json{
  "history": [
    { "t": 1697875200, "p": 0.65 },
    { "t": 1697878800, "p": 0.67 }
  ]
}
Muy minimalista: solo timestamp + precio. Sin bid/ask, sin volumen, sin OHLC.
Consideración importante: token IDs
En Polymarket cada outcome (YES/NO) es un ERC-1155 token distinto en Polygon. Para obtener el historial de un mercado binario necesitás dos llamadas: una para el token YES y otra para el NO. El market param acepta el clobTokenIds que devuelve el endpoint de markets de la Gamma API.
python# Ejemplo
YES_token = "71321045679252212594626385532706912750332728571942532289631379312455583992563"
NO_token  = "52114319501245915516055106046884209969926127482827954674443846427813813222429"

history_yes = GET /prices-history?market={YES_token}&interval=max&fidelity=60
history_no  = GET /prices-history?market={NO_token}&interval=max&fidelity=60
```

### Rate Limits (Polymarket)

El endpoint `/prices-history` tiene un límite de **1000 requests cada 10 segundos**. El sistema usa Cloudflare con throttling (las requests se encolan, no se rechazan). 

Para tu app comparadora, esto es extremadamente generoso — podés fetchear historial de ~100 mercados por segundo sin problemas.

---

## Kalshi: `GET /series/{series_ticker}/markets/{ticker}/candlesticks`

### Endpoints disponibles

Kalshi tiene tres variantes:
```
# 1. Market individual (live)
GET /series/{series_ticker}/markets/{ticker}/candlesticks

# 2. Market histórico (settled)
GET /historical/markets/{ticker}/candlesticks

# 3. Todos los markets de un evento a la vez
GET /series/{series_ticker}/events/{event_ticker}/candlesticks

# 4. Múltiples markets en batch (nuevo, nov 2025)
GET /markets/candlesticks  ← hasta 10.000 candlesticks totales
Parámetros
ParámetroTipoValores válidosstart_tsintUnix timestampend_tsintUnix timestampperiod_intervalstring1 (1 min), 60 (1 hora), 1440 (1 día)include_latest_before_startboolPrepend candlestick anterior para continuidad
Respuesta (mucho más rica que Polymarket)
Kalshi devuelve OHLC completo con campos separados para yes_bid, yes_ask y price, además de volume y open_interest por cada candlestick. Los precios vienen tanto en cents (int) como en dólares (string decimal): Kalshi
json{
  "ticker": "BTCZ-25MAR31-B100000",
  "candlesticks": [
    {
      "end_period_ts": 1743379200,
      "yes_bid": {
        "open": 45, "open_dollars": "0.4500",
        "low": 43,  "low_dollars": "0.4300",
        "high": 48, "high_dollars": "0.4800",
        "close": 47,"close_dollars": "0.4700"
      },
      "yes_ask": { ... },
      "price": {
        "open": 46, "mean": 45, "previous": 44,
        "min": 43,  "max": 48,  "close": 47
      },
      "volume": 1250,
      "volume_fp": "12.50",
      "open_interest": 8400,
      "open_interest_fp": "84.00"
    }
  ]
}
Paginación
Si el número de candlesticks excede 5000, Kalshi pagina los resultados y devuelve un adjustedEndTs que debe usarse como start_ts en la siguiente request. Kalshi
pythondef fetch_all_candlesticks(ticker, series, start_ts, end_ts, interval=60):
    results = []
    current_start = start_ts
    
    while current_start < end_ts:
        resp = GET /series/{series}/markets/{ticker}/candlesticks(
            start_ts=current_start,
            end_ts=end_ts,
            period_interval=interval
        )
        results.extend(resp["candlesticks"])
        
        if "adjusted_end_ts" in resp:
            current_start = resp["adjusted_end_ts"]
        else:
            break
    
    return results
Rate Limits (Kalshi)
Kalshi usa un sistema de tiers. El tier Basic (cualquier signup) permite 20 requests/segundo de lectura. El tier Advanced (formulario) sube a 30/s. Premier requiere 3.75% del volumen mensual del exchange para llegar a 100/s. Kalshi
Para tu app, el tier Basic (20 req/s) es el limitante real, especialmente comparado con los 1000 req/10s de Polymarket. Estrategia recomendada: cachear agresivamente el historial de Kalshi.

Diferencias Críticas para el Diseño de tu App
1. Estructura de datos incompatible
AspectoPolymarketKalshiCampos de precioSolo p (mid)OHLC + bid + ask + mean + previousVolumen❌ No incluido✅ Por candlestickOpen interest❌ No incluido✅ Por candlestickBid/Ask spread❌ No incluido✅ Separados
Para un gráfico unificado necesitás normalizar a un formato común mínimo:
typescriptinterface NormalizedCandle {
  timestamp: number       // Unix UTC
  price: number           // mid price, 0-1
  price_cents?: number    // para Kalshi (más preciso)
  open?: number           // null en Polymarket si fidelity > 1 punto
  high?: number
  low?: number
  close?: number
  volume_usd?: number     // null en Polymarket
  bid?: number            // null en Polymarket
  ask?: number            // null en Polymarket
  source: "polymarket" | "kalshi"
}
2. Granularidad: Polymarket es más flexible
GranularidadPolymarket (fidelity)Kalshi (period_interval)1 minuto✅ fidelity=1✅ period_interval=15 minutos✅ fidelity=5❌ No disponible15 minutos✅ fidelity=15❌ No disponible30 minutos✅ fidelity=30❌ No disponible1 hora✅ fidelity=60✅ period_interval=601 día✅ fidelity=1440✅ period_interval=1440
Kalshi solo soporta 3 granularidades fijas. Para gráficos de timeframes intermedios (4h, 8h), vas a tener que agregar los datos de 1h vos mismo.
3. Historial disponible: ambos ofrecen max
Polymarket con interval=max devuelve desde la creación del market. Kalshi no documenta explícitamente un límite de historial — en la práctica va desde la creación del market también. Para mercados vencidos, Kalshi tiene el endpoint /historical/markets/{ticker}/candlesticks que es equivalente.
4. Auth
Polymarket prices-history no requiere autenticación — cualquier GET funciona. Kalshi requiere API key incluso para endpoints de lectura.

Estrategia de Fetching Recomendada
pythonclass HistoricalDataFetcher:
    
    POLY_BASE = "https://clob.polymarket.com"
    KALSHI_BASE = "https://api.elections.kalshi.com/trade-api/v2"
    
    # Rate limits conservadores (80% del límite documentado)
    POLY_RPS = 80    # 1000/10s → 100/s → usamos 80/s
    KALSHI_RPS = 16  # 20/s (Basic) → usamos 16/s
    
    def fetch_polymarket_history(self, token_id: str, 
                                  fidelity: int = 60) -> list[NormalizedCandle]:
        resp = GET(f"{POLY_BASE}/prices-history",
                   params={"market": token_id, "interval": "max", 
                           "fidelity": fidelity})
        return [
            NormalizedCandle(
                timestamp=p["t"],
                price=p["p"],
                source="polymarket"
            )
            for p in resp["history"]
        ]
    
    def fetch_kalshi_history(self, series: str, ticker: str,
                              period: int = 60) -> list[NormalizedCandle]:
        candles = []
        adjusted_end = None
        
        while True:
            params = {"period_interval": period, 
                      "start_ts": 0, "end_ts": int(time.time())}
            if adjusted_end:
                params["start_ts"] = adjusted_end
                
            resp = GET(f"{KALSHI_BASE}/series/{series}/markets/{ticker}/candlesticks",
                       params=params, headers=kalshi_auth_headers)
            
            for c in resp["candlesticks"]:
                candles.append(NormalizedCandle(
                    timestamp=c["end_period_ts"],
                    price=c["price"]["close"] / 100,  # cents → 0-1
                    open=c["price"]["open"] / 100,
                    high=c["price"]["high"] / 100,
                    low=c["price"]["low"] / 100,
                    close=c["price"]["close"] / 100,
                    volume_usd=float(c["volume_fp"]),
                    bid=c["yes_bid"]["close"] / 100,
                    ask=c["yes_ask"]["close"] / 100,
                    source="kalshi"
                ))
            
            if "adjusted_end_ts" not in resp:
                break
            adjusted_end = resp["adjusted_end_ts"]
        
        return candles

Fuentes Alternativas para Datos Históricos Profundos
Si necesitás más historial o más detalle (trade-level), hay dos alternativas complementarias:
Polymarket on-chain (The Graph / subgraph): Todos los trades están en Polygon como eventos ERC-1155. Se pueden consultar via GraphQL con filtros por timestamp, market, y lado (buy/sell), incluyendo streaming en tiempo real via Kafka para latencia ultrabaja. BitQuery Útil para backtesting granular.
Kalshi bulk data: Kalshi tiene GET /historical/fills para trade fills anteriores al cutoff de datos históricos, y el endpoint de candlesticks cubre todo lo reciente. Para datos más viejos, su página de Market Data ofrece descargas bulk.