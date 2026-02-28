 1️⃣ ¿Qué valores tiene `market_type`?

En Kalshi, los mercados son **binarios**.

No existen oficialmente tipos como:

- `scalar`
- `range`
- `multi-outcome` estilo Polymarket

El equivalente real es:


market_type: "binary"


Cada market siempre se tradea como:

- YES
- NO

---

# 2️⃣ ¿Existe "yesno" como tipo separado?

No.

Aunque conceptualmente son YES/NO, el tipo estructural es simplemente:


binary


---

# 3️⃣ ¿Hay markets escalares?

❌ No existen markets escalares nativos.

Kalshi no tiene contratos tipo:

- "Precio de BTC será 103,421 USD"
- "Valor final entre 90K–110K como variable continua"

---

# 4️⃣ Entonces… ¿cómo modela rangos?

Kalshi modela rangos usando **múltiples markets binarios separados** dentro de un mismo Event.

## Ejemplo conceptual

Event:

BTC-DEC-2026-PRICE


Markets dentro:


BTC-DEC-2026-ABOVE-100K
BTC-DEC-2026-ABOVE-110K
BTC-DEC-2026-ABOVE-120K


O también:


BTC-DEC-2026-90K-100K
BTC-DEC-2026-100K-110K
BTC-DEC-2026-110K-120K


Pero cada uno sigue siendo:


binary


---

# 5️⃣ ¿Hay "strike prices"?

Sí, pero implementados como **markets independientes**.

Ejemplo:


Bitcoin above $100K → Market A
Bitcoin above $110K → Market B
Bitcoin above $120K → Market C


Cada uno es:

- Un contrato binario
- Con su propio orderbook
- Con su propia liquidez

No es un mercado escalar continuo.

---

# 6️⃣ Comparación con Polymarket

Referencia comparativa: :contentReference[oaicite:1]{index=1}

| Feature | Kalshi | Polymarket |
|----------|---------|-------------|
| Binary | ✅ Sí | ✅ Sí |
| Scalar | ❌ No | ✅ Sí |
| Multi-outcome único | ❌ No (modelado con múltiples binarios) | ✅ Sí |
| Strike ladder | ✅ (pero como markets separados) | ✅ (puede ser escalar o multi) |

---

# 7️⃣ ¿Todos son comparables con Polymarket?

## ✅ Comparables

- Binarios simples
  - "BTC > 100K"
  - "Trump gana"
  - "Inflación > 4%"

## ⚠️ Parcialmente comparables

- Rango modelado con múltiples markets
  - Necesitas agrupar por Event
  - No es un solo contrato

## ❌ No comparables directamente

- Mercados escalares verdaderos
- Mercados con payoff continuo

---

# 8️⃣ Conclusión clara

En Kalshi:

- Todo es **binary**
- No hay scalar markets nativos
- Los "strike prices" existen como múltiples contratos binarios
- Los rangos se construyen agregando varios markets

---

# 🎯 Resumen ejecutivo


Kalshi = arquitectura puramente binaria
Polymarket = binario + escalar + multi-outcome