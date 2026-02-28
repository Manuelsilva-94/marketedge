# docs/polymarket-fees.md

## Fee Structure

### Trading fee

**Modelo actual (CLOB):**

- No es un 2% flat universal.
- Las fees pueden variar según:
  - Tipo de mercado
  - Programa de incentivos
  - Maker vs Taker
- Generalmente el esquema es **maker/taker diferenciado**.
- La fee se aplica sobre el **notional ejecutado** (price × size).
- La fee aparece separada en los fills (`fee`), no embebida en el precio.

> Conclusión: NO asumir 2% fijo. Leer siempre el `fee` real en el fill o la config vigente del exchange.

---

### ¿Hay campo makerFee / takerFee en la API?

En el endpoint estándar de `/markets`:

- ❌ No suele aparecer `makerFee` o `takerFee` explícito por mercado.
- Las fees se reflejan:
  - En el momento del fill (`fee`)
  - O en documentación del exchange / config global

Por lo tanto:
> La API de markets no es la fuente primaria para fee rates.

---

### ¿Los precios en `outcomePrices` incluyen fees?

**NO.**

- `outcomePrices` = precio bruto de mercado.
- `midpointPrice` = precio bruto.
- `price history` = precios brutos ejecutados.

La fee:
- Se cobra adicionalmente.
- No modifica el precio reportado.
- Impacta tu PnL, no el market price.

---

### Withdrawal fee

- No hay un “withdrawal fee” tipo exchange tradicional.
- Si operas on-chain:
  - Pagas gas de red.
- Si usas USDC:
  - Depende de la red utilizada (Polygon/Ethereum).

No existe un % fijo de retiro aplicado por mercado.

---

## Respuestas Directas

### ¿Los fees son SIEMPRE 2% flat?

No.  
No es correcto hardcodear 2%.

---

### ¿Varían por market?

Pueden variar por:
- Programa de incentivos
- Estructura maker/taker
- Cambios en política del exchange

No están definidos directamente por cada market en `/markets`.

---

### ¿Hay campo makerFee / takerFee en la API?

No en el endpoint estándar de mercados.  
La fee real se observa en el fill (`fee`).

---

### ¿Los precios incluyen fees?

No.

---

## Cálculo Effective Price

Dado que los precios NO incluyen fees:

```typescript
// feeRate debe obtenerse dinámicamente o parametrizarse
const feeRate = 0.02 // NO hardcodear en producción

// BUY (taker)
effectivePriceBuy = price * (1 + feeRate)

// SELL
effectivePriceSell = price * (1 - feeRate)

Forma más precisa usando el fill real:

effectivePrice = (price * size + fee) / size
Recomendación para el comparador

No asumir fee fija.

Permitir configurar feeRate.

Si se usa data histórica, ajustar PnL restando fee real de cada fill.

Nunca usar outcomePrices como precio neto.