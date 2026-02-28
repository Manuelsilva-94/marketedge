Whales y Smart Money: Disponibilidad de Datos por Plataforma

Tabla de Features
FeaturePolymarketKalshiTop holders por market✅ Sí (hasta 20 por outcome)❌ No existeLeaderboard global✅ Sí, múltiples filtros⚠️ Existe en UI, opt-in, no en APITrade history público✅ Sí (by market o by user)✅ Sí (anónimo, sin user ID)Positions de usuario✅ Sí (cualquier wallet)❌ Solo propias (requiere auth)Activity / fills✅ Sí (TRADE, SPLIT, MERGE...)❌ Solo propios fills (auth)User profiles✅ Públicos (pseudonym + wallet)❌ No hay perfiles públicos en APIPnL histórico de user✅ Calculable vía positions❌ No expuesto públicamenteAuth requerida❌ Todo es público✅ Requerida para TODO lo personal

Polymarket: Datos de Whales
1. Top Holders por Market
El endpoint GET /holders devuelve los top holders de un market. Se filtra por market (lista de condition IDs separados por coma), soporta hasta 500 resultados con limit, y filtra por balance mínimo con minBalance. Cada holder incluye proxyWallet, amount, outcomeIndex, pseudonym, name, bio y profileImage. Kalshi El cap real es 20 holders por token (YES y NO por separado), así que para un mercado binario podés ver hasta 20 whales YES + 20 whales NO.
GET https://data-api.polymarket.com/holders
  ?market=0xabc...def,0x123...456
  &limit=20
  &minBalance=1000
json[
  {
    "token": "71321045679252...",
    "holders": [
      {
        "proxyWallet": "0x56687bf447db6ffa42ffe2204a05edaa20f55839",
        "pseudonym": "Sharp-Falcon",
        "name": "0xwhale",
        "amount": 45000,
        "outcomeIndex": 0,
        "displayUsernamePublic": true,
        "bio": "...",
        "profileImage": "https://..."
      }
    ]
  }
]
```

> ⚠️ `displayUsernamePublic: false` significa el usuario ocultó su nombre — el campo `name` viene vacío pero `proxyWallet` siempre está disponible (es on-chain, no se puede ocultar).

### 2. Leaderboard Global

El endpoint `GET /v1/leaderboard` devuelve rankings por `PNL` o `VOL`, filtrables por `category` (OVERALL, POLITICS, SPORTS, CRYPTO, CULTURE, ECONOMICS, TECH, FINANCE) y `timePeriod` (DAY, WEEK, MONTH, ALL). Máximo 50 resultados por request, paginable hasta offset 1000. Cada entry incluye `rank`, `proxyWallet`, `userName`, `vol`, `pnl`, `xUsername` y `verifiedBadge`. 
```
GET https://data-api.polymarket.com/v1/leaderboard
  ?category=CRYPTO
  &timePeriod=WEEK
  &orderBy=PNL
  &limit=50
```

Esto es oro para tu app: podés mostrar **"Top traders de Bitcoin esta semana"** directamente.

### 3. Positions de Cualquier Usuario (por wallet)

El endpoint `GET /positions` acepta el parámetro `user` con la wallet address del usuario, y opcionalmente `market` para filtrar por mercado específico. Los resultados ordenan por `TOKENS`, `CURRENT`, `INITIAL`, `CASHPNL`, `PERCENTPNL`, `TITLE`, `RESOLVING` o `PRICE`, en dirección `ASC` o `DESC`.  No requiere auth — cualquier wallet es consultable públicamente.
```
GET https://data-api.polymarket.com/positions
  ?user=0x56687bf447db6ffa42ffe2204a05edaa20f55839
  &sortBy=CASHPNL
  &sortDirection=DESC
```

Respuesta incluye por cada posición: `size`, `avgPrice`, `initialValue`, `currentValue`, `cashPnl`, `percentPnl`, `realizedPnl`, `curPrice`.

### 4. Trade History de Usuario o Market

El endpoint `GET /activity` devuelve actividad on-chain de un usuario, filtrable por tipo (`TRADE`, `SPLIT`, `MERGE`, `REDEEM`, `REWARD`, `CONVERSION`), rango de timestamps (`start`/`end`), y `side` (BUY/SELL). Cada trade incluye `transactionHash`, `price`, `size`, `usdcSize`, `timestamp`, y metadata del market. 

### 5. Auth Requerida en Polymarket

El Gamma API y el Data API son completamente públicos y no requieren autenticación. El CLOB API tiene endpoints públicos (orderbook, precios) y endpoints autenticados solo para operaciones de trading (crear/cancelar órdenes). 

---

## Kalshi: Datos de Whales

### Lo que SÍ existe (pero anónimo)

#### Trade History Público de Markets

El endpoint `GET /trades` expone todos los trades completados en todos los markets. Incluye `trade_id`, `ticker`, `price`, `count`, `yes_price`, `no_price`, `taker_side` y `created_time`. Está paginado con cursor, permite hasta 1000 resultados por request. 
```
GET https://api.elections.kalshi.com/trade-api/v2/trades
  ?ticker=BTCZ-25MAR31-B100000
  &min_ts=1740000000
  &max_ts=1743465600
  &limit=1000
Crítico: los trades públicos de Kalshi no incluyen user ID. Solo ves precio, cantidad, dirección, y timestamp. No hay forma de vincular un trade a un usuario desde la API pública.
Lo que NO existe en API pública
Leaderboard: Kalshi tiene un leaderboard en su interfaz web, pero los usuarios están excluidos por defecto y deben optar por participar activamente. Sim Documentation No hay endpoint de API documentado para acceder al leaderboard de forma programática.
Positions de otros usuarios: GET /portfolio/positions requiere autenticación y solo devuelve las posiciones propias del usuario autenticado. No hay equivalente público al GET /positions?user=0x... de Polymarket.
User profiles: Kalshi no expone perfiles de usuarios en su API pública. Los user_id internos no son navegables externamente.

Comparación Detallada de Endpoints
Top Holders
AspectoPolymarketKalshiEndpointGET /holders?market={conditionId}❌ No existeAuthNoN/AUser IDWallet pública (0x...)N/ANombre públicoPseudonym (opt-in)N/AMax holders20 por token (YES/NO separados)N/AHoldings amount✅ IncluidoN/A
Leaderboard
AspectoPolymarketKalshiEndpointGET /v1/leaderboard❌ No en API (solo UI)AuthNoN/AFiltrosCategoría + período + PNL/VOLN/AMax results50 por request, paginable x1000N/APnL incluido✅N/AVolumen incluido✅N/A
Trade History
AspectoPolymarketKalshiEndpointGET /trades (Data API)GET /tradesAuthNoNoUser ID en trade✅ proxyWallet incluido❌ AnónimoPrecio✅✅Cantidad✅✅Side (BUY/SELL)✅✅ (taker_side)PaginaciónCursor-basedCursor-basedMax por requestNo documentado1000
Positions de Usuario
AspectoPolymarketKalshiEndpointGET /positions?user={wallet}GET /portfolio/positionsAuth❌ No requerida✅ RequeridaCualquier usuario✅ (wallet pública)❌ Solo propiasPnL incluido✅ cash + percent + realized✅ Solo propiasPosition value✅ currentValue✅ market_exposure

Estrategia para tu App
Para "Smart Money Tracker"
Con Polymarket podés construir un tracker completo:
pythonclass WhaleTracker:
    
    def get_market_whales(self, condition_id: str, min_usd: int = 5000):
        """Top 20 holders YES + top 20 holders NO"""
        resp = GET("https://data-api.polymarket.com/holders",
                   params={"market": condition_id, "limit": 20, 
                           "minBalance": min_usd})
        return resp
    
    def get_whale_portfolio(self, wallet: str):
        """Todas las posiciones abiertas de una wallet"""
        return GET("https://data-api.polymarket.com/positions",
                   params={"user": wallet, "sortBy": "CASHPNL",
                           "sortDirection": "DESC"})
    
    def get_whale_trade_history(self, wallet: str, market: str = None):
        """Historial completo de trades de una wallet"""
        params = {"user": wallet, "type": "TRADE", "side": "BUY"}
        if market:
            params["market"] = market
        return GET("https://data-api.polymarket.com/activity", params=params)
    
    def get_leaderboard(self, category: str = "CRYPTO", 
                         period: str = "WEEK") -> list:
        """Top 50 traders por PnL en categoría/período"""
        return GET("https://data-api.polymarket.com/v1/leaderboard",
                   params={"category": category, "timePeriod": period,
                           "orderBy": "PNL", "limit": 50})
Para Kalshi, la única señal de "smart money" disponible públicamente son los trades anónimos — podés detectar grandes trades (size > X) en un market específico como proxy de actividad institucional, pero sin identidad del trader.
pythondef detect_large_kalshi_trades(ticker: str, min_size: int = 1000):
    """Detecta trades grandes como proxy de smart money en Kalshi"""
    trades = GET(f"{KALSHI_BASE}/trades",
                 params={"ticker": ticker, "limit": 1000},
                 headers=kalshi_auth)
    
    return [t for t in trades["trades"] 
            if t["count"] >= min_size]
    # ⚠️ Sin user ID — solo podés ver "alguien compró 5000 contratos YES"
Feature Parity Gap
La brecha en transparencia entre ambas plataformas es fundamental para el diseño de tu app:

Polymarket es una DEX construida sobre Polygon — toda la actividad on-chain es inherentemente pública. El API es un wrapper conveniente sobre datos ya públicos.
Kalshi es una exchange centralizada regulada por la CFTC — la privacidad de los traders es una obligación regulatoria, no una elección de diseño.

Esto es estructural e irresolvible: Kalshi nunca va a exponer posiciones de usuarios específicos públicamente. Para features de whale tracking en tu app, Polymarket es la fuente única viable.

## Para Smart Money Tracker
Podemos implementar con: [Polymarket only / Multiple platforms]
```
Existe lo siguiente:
Polymarket

## Get top holders for markets

GET
/holders

## Get live volume for an event

GET
/live-volume

## Get public profile by wallet address

GET
/public-profile

## Get current positions for a user

GET
/positions

## Get user activity

GET
/activity

## Get total value of a user's positions

GET
/value

## Get trader leaderboard rankings

GET
/v1/leaderboard

Kalshi:

## Get Balance
Endpoint for getting the balance and portfolio value of a member. Both values are returned in cents.

GET
/portfolio/balance

## Get Positions
Restricts the positions to those with any of following fields with non-zero values, as a comma separated list. The following values are accepted: position, total_traded

GET
/portfolio/positions