QA:

Home
--------------
- Live Arbitrage Opportunities
    - Se queda mostrando "Scanning for opportunities". (screenshots: defi-rate-presidental-election-2028-comparison-and-arbitrage.png and arbitrage-scanner-defi-world-cup.png)
- Cards de stats muestra "- Active Arbitrages" y "- Whales Tracked". (screenshots: empty-stat-cards.png)
- Whales
    - Ejemplo "0x1234...5678" muestra Vol 7d: $892K, P&L: +$45K, Win: 73%
        - Se esta usando mock data: {MOCK_WHALES.map((whale, i) => (
              <WhaleCard key={whale.address} {...whale} rank={i + 1} />
            ))}
- Link a "Arbitrage" desde "View all opportunities" apunta a la ruta correcta /arbitrage pero tira este error: Something went wrong
A <Select.Item /> must have a value prop that is not an empty string. This is because the Select value can be set to an empty string to clear the selection and show the placeholder.
- Link "View Leaderboard" lleva correctamente a "/whales".
- Apretar "enter" en el search bar no hace nada

Search page
--------------
- SearchInput pre-filled con "bitcoin" - OK
- FilterBar visible con dropdowns de Platform y Category - OK
- Texto "Showing X results for 'bitcoin'" con número real - OK
- Grid de MarketCards (mínimo 1 card visible) - OK
- Cada card muestra: PlatformBadge, question, volume, end date - OK
- Buscar "bitcoin" → debe retornar resultados de AMBAS plataformas (Polymarket y Kalshi) - OK
- Buscar "president" → debe retornar mercados políticos - OK
- Buscar "xyznotexist123" → debe mostrar EmptyState, no crashear - OK
- El volumen en las cards debe coincidir aproximadamente con lo que viste en la API directa
  - Mostrar captura de mercado real contra la data de las cards (screenshots: spain-world-cup-stats.png and spain-world-cup-stats-polymarket.png)
- Cambiar filtro Platform a "Polymarket" → results se actualizan, solo cards con badge Polymarket - OK
- Cambiar filtro Platform a "Kalshi" → solo cards con badge Kalshi - OK
- Cambiar filtro Platform a "All" → vuelven ambas plataformas - OK
- Click en una MarketCard → navega a /market/{id} - OK
- Click en botón "Compare" de una card → navega a /market/{id} - OK
- Buscar algo, luego borrar con X en el input → input queda vacío - OK pero hay dos "x" cuando hago hover. (screenshots: double-x-in-searchbar.png)
- Pagination: si hay > 20 resultados, botón "Next" aparece y funciona - OK
- Buscar con Enter y con click en ícono de search → ambos funcionan - OK pero se deberia mostrar loader

Como estamos pensando la comparacion manual? Porque cuando clickeo en "Compare" va a la pagina de /market/id pero no muestra los datos de la comparacion. Porque probablemente no encuentre un mercado similar de otra plataforma.
Yo lo que habia pensado es que en la pagina de mercados cuando se haga un search, se haga una busqueda "dual". Es decir que haya dos columnas, una de Polymarket y otra de Kalshi. Y que en cada columna se muestre los resultados de la busqueda segun plataforma. Y que al clickear en "compare" te deje clickear en otro mercado de la otra columna y que cree la comparacion. O es mejor tener una pagina de comparacion que haga algo similar? Si no, como crea un usuario una comparacion manual de mercados que nosotros no reconocimos como comparables. (screenshots: defi-rate-presidental-election-2028-comparison-and-arbitrage.png)


Market Detail (/market/{id})
-----------------------------------------
- Breadcrumb visible arriba - OK
- MarketHeader con question completa - OK
- Precios YES y NO visibles (ej: 72¢ / 28¢) - OK pero valores incorrectos. (screenshots: incorrect-prices-market-detail.png)
- Progress bars para YES/NO proporcionales a los precios - OK pero valores incorrectos. (screenshots: incorrect-prices-market-detail.png)
- Sección "Comparison" con tabla si hay matches - NO se ve la tabla. 
- MarketMetadata con categoría, volumen, end date, fees - OK. Creo que es data real pero no se actualiza
- Botón "Refresh Prices" visible - Se ve pero no funciona. Data siempre igual


- Abrí /market/{id} de un market de Polymarket
- Abrí en otra pestaña: https://gamma-api.polymarket.com/markets/{externalId}
- Comparar outcomePrices de la API con lo que muestra la app → deben coincidir (±2¢ por timing)
- Si hay matches de Kalshi, abrir la API de Kalshi y verificar precio del ticker correspondiente
(screenshots: incorrect-prices-market-detail.png and )

Funcional:
- Click en "Refresh Prices" → spinner aparece → precios se actualizan - NO SE ACTUALIZAN.
- Si hay ArbitrageAlert → los dos links externos abren las plataformas correctas en nueva pestaña - Nunca hay arbitrage aunque tengo ejemplos de otras plataformas. (screenshots: defi-rate-presidental-election-2028-comparison-and-arbitrage.png and arbitrage-scanner-defi-world-cup.png)
- Link "View on Polymarket ↗" en MarketHeader abre URL correcta - OK
- Navegar a un ID inexistente (/market/fake123) → muestra not-found, no error 500 - OK Market not found. The market you're looking for doesn't exist or was removed.
- ComparisonTable en mobile: se convierte en cards apiladas (chequear en DevTools, 375px) - No veo comparison table en ninguna resolucion


Arbitrage (/arbitrage)
-----------------------

- ArbitrageStats header con contadores (aunque sean 0)
- FilterBar con 3 dropdowns
- Si hay oportunidades → OpportunityCards visibles
- Si no hay → EmptyState con mensaje y no error

Valores a verificar:

 El ROI mostrado en las cards debe ser > 0 y < 20% (si muestra 99% hay un bug en el cálculo)
 "Scanned X pairs" debe ser > 0 (indica que el scanner corrió)
 Los precios en las cards deben sumar aproximadamente 1.00 (ej: 72¢ YES + 29¢ NO = 101¢ → ROI ~1%)

Funcional:

 Click en "▼ Details" de una card → expande suavemente con breakdown
 Click en "▲ Collapse" → colapsa
 Cambiar Min ROI a 5% → menos cards (o EmptyState)
 Cambiar Min ROI a 0.5% → más cards
 Links "Open Polymarket ↗" y "Open Kalshi ↗" en cards expandidas → abren URLs correctas
 Botón Refresh en ArbitrageStats → recarga datos

 La pagina muestra esto asi que no puedo verificar nada Something went wrong
A <Select.Item /> must have a value prop that is not an empty string. This is because the Select value can be set to an empty string to clear the selection and show the placeholder.

 (screenshots: defi-rate-presidental-election-2028-comparison-and-arbitrage.png and arbitrage-scanner-defi-world-cup.png)
 Verificar porque se dispara la funcion de "Finding matches" todo el tiempo

Whales (/whales)
------------------

- Header con título y descripción - OK
- Disclaimer de "Polymarket only" visible - OK
- WhaleFilters con Period y Sort - OK
- Grid/lista de WhaleCards con ranks #1, #2, #3... - OK
- Ranks 1-3 con colores especiales (gold/silver/bronze) - OK


Tenemos que cambiar a usar esta API:

Get trader leaderboard rankings
https://data-api.polymarket.com/v1/leaderboard

Estos son los query parameters:
Query Parameters
​
category
enum<string>default:OVERALL
Market category for the leaderboard

Available options: OVERALL, POLITICS, SPORTS, CRYPTO, CULTURE, MENTIONS, WEATHER, ECONOMICS, TECH, FINANCE 
​
timePeriod
enum<string>default:DAY
Time period for leaderboard results

Available options: DAY, WEEK, MONTH, ALL 
​
orderBy
enum<string>default:PNL
Leaderboard ordering criteria

Available options: PNL, VOL 
​
limit
integerdefault:25
Max number of leaderboard traders to return

Required range: 1 <= x <= 50
​
offset
integerdefault:0
Starting index for pagination

Required range: 0 <= x <= 1000
​
user
string
Limit leaderboard to a single user by address
User Profile Address (0x-prefixed, 40 hex chars)

Pattern: ^0x[a-fA-F0-9]{40}$
Example:
"0x56687bf447db6ffa42ffe2204a05edaa20f55839"

​
userName
string
Limit leaderboard to a single username

Y la respuesta es un array de usuarios:

[
    {
        "rank": "1",
        "proxyWallet": "0x02227b8f5a9636e895607edd3185ed6ee5598ff7",
        "userName": "HorizonSplendidView",
        "xUsername": "",
        "verifiedBadge": false,
        "vol": 3539032.358252,
        "pnl": 2367761.287029635,
        "profileImage": ""
    },
    {
        "rank": "2",
        "proxyWallet": "0x9cb990f1862568a63d8601efeebe0304225c32f2",
        "userName": "jtwyslljy",
        "xUsername": "",
        "verifiedBadge": false,
        "vol": 319998.547474,
        "pnl": 220764.99854270997,
        "profileImage": ""
    },
]

Y despues para el detalle se puede usar esta:
Get user activity
https://data-api.polymarket.com/activity?limit=100&sortBy=TIMESTAMP&sortDirection=DESC&user=0x02227b8f5a9636e895607edd3185ed6ee5598ff7

Con los siguientes query parameters:
​
limit
integerdefault:100
Required range: 0 <= x <= 500
​
offset
integerdefault:0
Required range: 0 <= x <= 10000
​
user
stringrequired
User Profile Address (0x-prefixed, 40 hex chars)

Pattern: ^0x[a-fA-F0-9]{40}$
Example:
"0x56687bf447db6ffa42ffe2204a05edaa20f55839"

​
market
string[]
Comma-separated list of condition IDs. Mutually exclusive with eventId.

0x-prefixed 64-hex string

Pattern: ^0x[a-fA-F0-9]{64}$
​
eventId
integer[]
Comma-separated list of event IDs. Mutually exclusive with market.

Required range: x >= 1
​
type
enum<string>[]
Available options: TRADE, SPLIT, MERGE, REDEEM, REWARD, CONVERSION, MAKER_REBATE 
​
start
integer
Required range: x >= 0
​
end
integer
Required range: x >= 0
​
sortBy
enum<string>default:TIMESTAMP
Available options: TIMESTAMP, TOKENS, CASH 
​
sortDirection
enum<string>default:DESC
Available options: ASC, DESC 
​
side
enum<string>
Available options: BUY, SELL 


Y donde la respuesta es un array asi:

[
    {
        "proxyWallet": "0x02227b8f5a9636e895607edd3185ed6ee5598ff7",
        "timestamp": 1772652627,
        "conditionId": "0x55aaedf58a379e677f1a72150605119fcbed1c4cb90d163d1bff2445053f4a18",
        "type": "TRADE",
        "size": 1.8,
        "usdcSize": 0.612,
        "transactionHash": "0x39468cf3830a9b50cf5fb3f9d564d31d9984d63f3db7e7c3bbde9d571d5826cd",
        "price": 0.34,
        "asset": "47360322818856779953484901624413028936225139926711290257453918602423436817642",
        "side": "BUY",
        "outcomeIndex": 1,
        "title": "Will Manchester City FC win on 2026-03-04?",
        "slug": "epl-mac-not-2026-03-04-mac",
        "icon": "https://polymarket-upload.s3.us-east-2.amazonaws.com/Repetitive-markets/premier+league.jpg",
        "eventSlug": "epl-mac-not-2026-03-04",
        "outcome": "No",
        "name": "HorizonSplendidView",
        "pseudonym": "Glaring-Ethnicity",
        "bio": "",
        "profileImage": "",
        "profileImageOptimized": ""
    },
    {
        "proxyWallet": "0x02227b8f5a9636e895607edd3185ed6ee5598ff7",
        "timestamp": 1772652627,
        "conditionId": "0x55aaedf58a379e677f1a72150605119fcbed1c4cb90d163d1bff2445053f4a18",
        "type": "TRADE",
        "size": 59595.47,
        "usdcSize": 20262.4598,
        "transactionHash": "0x9b334a046f63f0c6f1328d4aa4e35c2c0220f521d7cd3eac1e36e20f238ef909",
        "price": 0.34,
        "asset": "47360322818856779953484901624413028936225139926711290257453918602423436817642",
        "side": "BUY",
        "outcomeIndex": 1,
        "title": "Will Manchester City FC win on 2026-03-04?",
        "slug": "epl-mac-not-2026-03-04-mac",
        "icon": "https://polymarket-upload.s3.us-east-2.amazonaws.com/Repetitive-markets/premier+league.jpg",
        "eventSlug": "epl-mac-not-2026-03-04",
        "outcome": "No",
        "name": "HorizonSplendidView",
        "pseudonym": "Glaring-Ethnicity",
        "bio": "",
        "profileImage": "",
        "profileImageOptimized": ""
    },
]

Tambien tenemos:
Get current positions for a user

https://data-api.polymarket.com/positions

con estos query parameters

user
stringrequired
User address (required)
User Profile Address (0x-prefixed, 40 hex chars)

Pattern: ^0x[a-fA-F0-9]{40}$
Example:
"0x56687bf447db6ffa42ffe2204a05edaa20f55839"

​
market
string[]
Comma-separated list of condition IDs. Mutually exclusive with eventId.

0x-prefixed 64-hex string

Pattern: ^0x[a-fA-F0-9]{64}$
​
eventId
integer[]
Comma-separated list of event IDs. Mutually exclusive with market.

Required range: x >= 1
​
sizeThreshold
numberdefault:1
Required range: x >= 0
​
redeemable
booleandefault:false
​
mergeable
booleandefault:false
​
limit
integerdefault:100
Required range: 0 <= x <= 500
​
offset
integerdefault:0
Required range: 0 <= x <= 10000
​
sortBy
enum<string>default:TOKENS
Available options: CURRENT, INITIAL, TOKENS, CASHPNL, PERCENTPNL, TITLE, RESOLVING, PRICE, AVGPRICE 
​
sortDirection
enum<string>default:DESC
Available options: ASC, DESC 
​
title
string
Maximum string length: 100

Y de respuesta un array asi:

[
    {
        "proxyWallet": "0x5fac6c2f50862b27afe624997c857ec908648dc2",
        "asset": "111977898551602011660195806458348931912849013753262334814342962907278475615442",
        "conditionId": "0xe5535e41e78edb730150ac1a497fbef7cef536022168771cb51a6b702705ebb1",
        "size": 27570.710567,
        "avgPrice": 0.054549,
        "initialValue": 1503.954690719283,
        "currentValue": 0,
        "cashPnl": -1503.954690719283,
        "percentPnl": -100,
        "totalBought": 41942.320567,
        "realizedPnl": -695.024681,
        "percentRealizedPnl": -100.00003037812594,
        "curPrice": 0,
        "redeemable": true,
        "mergeable": false,
        "title": "US strikes Iran by February 24, 2026?",
        "slug": "us-strikes-iran-by-february-24-2026",
        "icon": "https://polymarket-upload.s3.us-east-2.amazonaws.com/us-strikes-iran-by-october-3-2sVnIHq3sjqF.jpg",
        "eventId": "114242",
        "eventSlug": "us-strikes-iran-by",
        "outcome": "Yes",
        "outcomeIndex": 0,
        "oppositeOutcome": "No",
        "oppositeAsset": "83498203203588119923598556336277392015518869300638561512118562347789179988835",
        "endDate": "2026-01-31",
        "negativeRisk": false
    },
]

Tambien esta:
Get total value of a user's positions

https://data-api.polymarket.com/value

Con estos query parameters:

Query Parameters
​
user
stringrequired
User Profile Address (0x-prefixed, 40 hex chars)

Pattern: ^0x[a-fA-F0-9]{40}$
Example:
"0x56687bf447db6ffa42ffe2204a05edaa20f55839"

​
market
string[]
0x-prefixed 64-hex string

Pattern: ^0x[a-fA-F0-9]{64}$

Y una respuesta asi:

[
    {
        "user": "0x5fac6c2f50862b27afe624997c857ec908648dc2",
        "value": 12245.664907932498
    }
]

Tenemos esta:
Get trades for a user or markets

Con estos query parameters:
limit
integerdefault:100
Required range: 0 <= x <= 10000
​
offset
integerdefault:0
Required range: 0 <= x <= 10000
​
takerOnly
booleandefault:true
​
filterType
enum<string>
Must be provided together with filterAmount.

Available options: CASH, TOKENS 
​
filterAmount
number
Must be provided together with filterType.

Required range: x >= 0
​
market
string[]
Comma-separated list of condition IDs. Mutually exclusive with eventId.

0x-prefixed 64-hex string

Pattern: ^0x[a-fA-F0-9]{64}$
​
eventId
integer[]
Comma-separated list of event IDs. Mutually exclusive with market.

Required range: x >= 1
​
user
string
User Profile Address (0x-prefixed, 40 hex chars)

Pattern: ^0x[a-fA-F0-9]{40}$
Example:
"0x56687bf447db6ffa42ffe2204a05edaa20f55839"

​
side
enum<string>
Available options: BUY, SELL 

Con una respuesta asi

[
    {
        "proxyWallet": "0x5fac6c2f50862b27afe624997c857ec908648dc2",
        "side": "BUY",
        "asset": "17667954885432047474600988169826078422913327586493371051607749430874729004890",
        "conditionId": "0xf94145fa5716d4bfd2948ce5eef2954dcb560516ccbba5e8b68059027e431cdc",
        "size": 13125,
        "price": 0.96,
        "timestamp": 1772666383,
        "title": "US forces enter Iran by March 7?",
        "slug": "us-forces-enter-iran-by-march-7",
        "icon": "https://polymarket-upload.s3.us-east-2.amazonaws.com/us-forces-enter-iran-by-L_p5JkCpvr0I.jpg",
        "eventSlug": "us-forces-enter-iran-by",
        "outcome": "No",
        "outcomeIndex": 1,
        "name": "mammamia69",
        "pseudonym": "Jam-Packed-Indigence",
        "bio": "",
        "profileImage": "",
        "profileImageOptimized": "",
        "transactionHash": "0x970afcf324fb313f26c54f895821de80baf98dfe3d20df56984a84d823b47064"
    },
]

Creo que todos estos endpoints nos pueden proveer una vista completa de la pagina de whales

Funcional:

 Click en WhaleCard → navega a /whales/{address} - NO
 Click en "View Profile" → navega a /whales/{address} - OK
 Cambiar Period a "30 Days" → datos cambian (o mismo si no hay diferencia) - OK pero como creo que los valores no son reales no se ven bien. (screenshots: whales.png)
 Cambiar Sort a "Best P&L" → orden cambia - OK pero como creo que los valores no son reales no se ven bien. (screenshots: whales.png)

📄 PÁGINA 6: Whale Detail (/whales/{address})

 WhaleHeader con address truncada y botones Copy/Polygonscan
 StatsRow con 4 métricas
 Lista de RecentTrades (tabla con columnas)
 Lista de TopPositions (si tiene posiciones abiertas)

Funcional:

 Botón "Copy Address" → copia address completa al clipboard, feedback visual - OK pero sin feedback visual
 Link "View on Polygonscan ↗" → abre https://polygonscan.com/address/{address} - OK
 Link "View on Polymarket ↗" → abre https://polymarket.com/profile/{address} - OK
 Cada trade en TradeRow tiene link [↗] → abre https://polygonscan.com/tx/{hash} - OK
 Click en market en PositionCard → navega a /market/{slug} - NO. No existe el elemento para clickear
 Navegar a address inexistente → not-found, no error 500 - NO, pero carga data de algun lado. (screenshots: fake-whale-id.png)


🌐 CROSS-PÁGINA

 Navbar SearchBar funciona desde cualquier página - OK
 Back button del browser funciona en todas las páginas - OK
 Loading skeletons aparecen antes de que cargue el contenido (probar con Network throttling en DevTools → "Slow 3G") - OK
 Ninguna página muestra error 500 en consola - OK
 En mobile (375px): Navbar colapsa o es usable, todas las páginas son legibles


🔌 API ENDPOINTS — Test directo en browser
Abrir estas URLs y verificar que retornan JSON válido (no error):
/api/stats/overview - OK
/api/markets/search?q=bitcoin&limit=5 - OK
/api/markets/trending?limit=3 - OK
/api/arbitrage/live?limit=3 - OK pero 0
/api/arbitrage/opportunities?minRoi=0.01&limit=5 - OK pero 0
/api/whales/leaderboard?period=7d&limit=10 - OK pero es data real?
/api/compare/{id_real_de_polymarket} - OK pero no matches
/api/whales/{address_real_de_polymarket} - OK
Para cada uno verificar:

 Status 200 (no 404, no 500)
 JSON bien formado (no HTML de error)
 Arrays no vacíos (al menos 1 elemento)
 No campos null donde no deberían serlo

 Hay que revisar la logica de como traemos los mercados. Se que hablamos de traer cada mercado individualmente pero se vuelve engorroso cuando tenes un evento como la copa mundial de la fifa y tenes un mercado por cada uno de los 48 equipos. Tal vez habria que pensar una forma de traer muchos eventos con sus mercados asociados y luego muchos mercados que sean individuales (es decir que no pertenezcan a ningun evento). Tanto Polymarket como Kalshi me permiten traer eventos y mercados por separado. Luego claramente la logica de comparar no esta funcinoando o me parece que estamos trayendo mal la data de Kalshi o normalizando erroneamente. Es mas creo que en Kalshi estamos trayendo solo events. (screenshots: polymarket-world-cup-search.png, kalshi-world-cup-search.png, kalshi-presidential-election-search.png and polymarket-presidential-election-search.png.png)