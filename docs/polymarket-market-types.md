¿Todos los markets son binarios (YES/NO)?
Polymarket soporta varios tipos de mercados:

📉 Binary (Sí/No) — clásico: “¿BTC > $60 k para tal fecha?”

📊 Categorical — varios resultados discretos (más de dos).

📈 Scalar — mercados basados en un rango numérico para una variable, resolviendo según dónde caiga el valor real dentro de un intervalo.


¿Hay markets con 3+ outcomes? Ejemplo: "Who wins election?" con Trump/Biden/RFK
Estos serian los eventos. Dentro de este evento habria un mmarket distinto para cada opcion. Algo asi:
Event: Who will win the 2024 Presidential Election?
├── Market: Donald Trump? (Yes/No)
├── Market: Joe Biden? (Yes/No)
├── Market: Kamala Harris? (Yes/No)
└── Market: Other? (Yes/No)

¿Cómo identifico markets comparables?
Si es para comparar entre plataformas habria que encontrar una manera de comparar los titulos de los markets. 

¿Campo enableOrderBook qué significa?
"Enable Order Book" (habilitar el libro de órdenes) en la API de Polymarket significa activar el acceso al registro en tiempo real de todas las órdenes de compra y venta (CLOB - Central Limit Order Book) para un mercado específico. Esto permite a los desarrolladores y bots cotizar precios, ver la profundidad del mercado y ejecutar estrategias de trading basadas en la oferta y demanda. 
Polymarket Documentation
Polymarket Documentation
 +4
Acceso en tiempo real: Permite consultar las órdenes abiertas, precios de oferta/demanda y el tamaño de las órdenes (liquidez).
Trading Automatizado: Es fundamental para que los algoritmos de trading (bots) lean el mercado y envíen órdenes firmadas (EIP-712) para ejecutar intercambios.
CLOB: Polymarket utiliza un Libro de Órdenes de Límite Central, lo que significa que las órdenes se emparejan automáticamente según el precio y el tiempo.
Detalles del Libro: Incluye datos como el precio, el ID del mercado, el resultado ("Sí" o "No") y el tamaño. 
Polymarket Documentation
Polymarket Documentation
 +4
Al habilitar el Order Book, obtienes la visibilidad necesaria para colocar órdenes limitadas (Limit Orders) de manera eficiente. 
Polymarket Documentation
Polymarket Documentation

Es un valor booleano asociado a cada market

¿Hay markets "scalares"? (ej: "Price of Bitcoin" con múltiples strikes)
Sí — sí existen markets “escalares” en Polymarket, pero no exactamente como un único mercado con múltiples strikes tipo derivado financiero tradicional (e.g., un solo contrato con varias barreras de precio).

🧠 Tipos de mercados en Polymarket

Polymarket soporta varios tipos de mercados:

📉 Binary (Sí/No) — clásico: “¿BTC > $60 k para tal fecha?”

📊 Categorical — varios resultados discretos (más de dos).

📈 Scalar — mercados basados en un rango numérico para una variable, resolviendo según dónde caiga el valor real dentro de un intervalo.

En un market scalar tradicional, la pregunta es algo como:

¿Cuál será el valor del CPI en mayo-2025? — con un rango inferior y superior definidos, y la resolución del mercado depende del valor real observado.

🎯 “Multi-Strikes” vs Scalar

Lo que tú llamas “escalares con múltiples strikes” — por ejemplo, un solo mercado en el que hay múltiples niveles de precio (60 k, 65 k, 70 k…) — Polymarket normalmente lo implementa en forma de múltiples mercados binarios relacionados, no como un solo contrato con strikes integrados.

Por ejemplo, hay una categoría mostrada en su interfaz llamada Multi Strikes donde ves muchos mercados como:

“¿Bitcoin > ___ el 11 de febrero?”

“¿Bitcoin > ___ el 12 de febrero?”
…con diferentes niveles de precio para cada mercado.

Cada uno de esos es un mercado binario individual (sí/no) con su propio precio/probabilidad, no todos parte de un solo market regime tradicional tipo options ladder.

📌 Resumen

✔️ Scalar markets existen: permiten pronosticar un valor dentro de un rango.
✔️ “Multi-strike” estilo derivado se logra en la práctica con varios mercados binarios correlacionados (cada uno una pregunta sobre un umbral distinto), más que como un solo mercado con múltiples strikes.

Si quieres, puedo darte ejemplos concretos de esos mercados multi-strike activos en este momento y cómo verlos en la interfaz de Polymarket 😊.


## Para MVP
Solo sinchronizaremos: creo que podemos sincronizar todos. Podemos de ultima separar por tabs. Si existe alguno de estos mercados, tirarlo a una pagina distinta
Razón: Si todos los mercados vienen de la misma API y nosotros tenemos que filtrarlos por sus propiedas o outcomes, no es un paso extra si no necesario
