
"liquidity": 0,
"liquidity_dollars": "0.0000",
"volume": 0,
"volume_24h": 0,
"volume_24h_fp": "0.00",
"volume_fp": "0.00",
"open_interest": 0,
"open_interest_fp": "0.00",

🔹 liquidity
Tipo

Integer

Qué representa

Liquidez agregada del orderbook en centavos (formato interno).

Es un valor numérico optimizado para cálculo.

⚠️ No es USD directamente.

🔹 liquidity_dollars
Tipo

String decimal

Qué representa

La misma liquidez pero expresada en USD reales.

Ejemplo:

"liquidity": 2500000
"liquidity_dollars": "25000.00"

👉 liquidity_dollars es el valor human-readable.

🔹 volume
Tipo

Integer

Qué representa

Volumen histórico total del mercado.

Normalmente en centavos agregados, no en dólares formateados.

🔹 volume_fp
Tipo

String decimal ("floating point")

Qué representa

Volumen total formateado para lectura humana.

El sufijo _fp significa:

floating point (formato decimal legible)

Ejemplo:

"volume": 1234567
"volume_fp": "12345.67"
🔹 volume_24h
Tipo

Integer

Qué representa

Volumen ejecutado en las últimas 24 horas.

Formato interno (centavos acumulados).

🔹 volume_24h_fp
Tipo

String decimal

Qué representa

Volumen 24h expresado en USD legible.

Ejemplo:

"volume_24h": 345678
"volume_24h_fp": "3456.78"
🔹 open_interest
Tipo

Integer

Qué representa

Cantidad total de contratos abiertos.

Formato interno entero.

No es USD.

🔹 open_interest_fp
Tipo

String decimal

Qué representa

Open interest formateado en versión legible.

Dependiendo del endpoint puede representar:

Contratos como decimal

O valor nocional equivalente

Generalmente es solo versión string del mismo valor.

📊 Resumen técnico
Campo	Escala interna	Versión legible
liquidity	integer	liquidity_dollars
volume	integer	volume_fp
volume_24h	integer	volume_24h_fp
open_interest	integer	open_interest_fp
🧠 Regla práctica

En backend:

Usa los campos integer

En frontend:

Usa los *_fp o *_dollars
🚨 Por qué existen ambas versiones

Kalshi devuelve:

Valores enteros → precisión exacta

Strings decimales → evitar errores de float en JS

Es diseño común en exchanges financieros.