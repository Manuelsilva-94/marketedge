---

# Investigación 2.5: Fees (Kalshi)

## Preguntas críticas respondidas

---

## ¿Fees son 7% flat?

❌ No es un 7% flat sobre el notional.

Kalshi cobra una **trading fee variable basada en el payout**, no un porcentaje simple del precio como en Polymarket.

La estructura general es:


Fee = fee_rate × min(price, 100 - price)


Donde:

- `price` está en centavos (0–100)
- `fee_rate` depende del mercado / tu tier
- Se cobra sobre el **payout potencial**, no sobre el tamaño total del trade

Típicamente el fee_rate ronda ~7%, pero **no es un 7% flat del trade**.

---

## ¿Varían por market?

🟡 Sí.

Pueden variar por:

- Tipo de mercado
- Programa de incentivos
- Tier de usuario (volume-based)
- Promociones

No todos los mercados tienen exactamente la misma estructura.

---

## ¿Hay campo `fee` en GET /markets/[ticker]?

❌ No.

Los endpoints públicos como:


GET /markets/{ticker}


NO incluyen:

- fee_rate
- maker_fee
- taker_fee

Los fees no vienen en la metadata del market.

Debes consultarlos en:

- Dashboard → Settings → Fees
- Documentación oficial
- Confirmación al momento de ejecución

---

## ¿Hay diferencia maker / taker?

❌ En general NO.

Kalshi no usa el modelo clásico crypto de:

- maker_fee
- taker_fee

La fee es estructural al contrato y payout, no por rol de liquidez.

Puede haber rebates promocionales, pero no es el modelo estándar maker/taker tipo exchange crypto.

---

## ¿Fees de withdrawal?

🟡 Sí, pueden existir costos asociados a:

- Transferencias bancarias
- Wire transfers
- Otros métodos

No es un % del withdrawal como en crypto, sino fees operativos bancarios.

No están embebidos en los precios de mercado.

---

## ¿Los precios incluyen fees?

❌ No.

Los campos:


yes_bid
yes_ask
last_price


Son precios puros del orderbook.

Las fees se aplican:

- Al ejecutar la orden
- Separadamente del precio

---

# Fee Structure

## Trading fee

- Basado en payout potencial
- Aproximadamente ~7% del payout en muchos mercados
- No es 7% del notional completo

## Varía por market

🟡 Sí, puede variar por mercado o tier.

## Maker/Taker difference

❌ No estructuralmente.

## Withdrawal

- Puede haber costos bancarios
- No es un % fijo universal

---

# Cálculo de Effective Price

Supongamos:


yes_ask = 60


Compra YES a 60¢.

Si fee_rate = 7% (ejemplo simplificado):


payout_if_win = 100 - 60 = 40
fee = 0.07 × 40 = 2.8


Entonces:


effective_cost = 60 + 2.8 = 62.8


En probabilidad normalizada:

```typescript
const price = 60 / 100;
const payout = (100 - 60) / 100;
const fee = 0.07 * payout;
const effectivePrice = price + fee;
Comparación con Polymarket

Referencia: Polymarket

Exchange	Fee base
Kalshi	% del payout
Polymarket	% del notional (~2%)

Esto hace que:

En Kalshi el fee depende del strike

En Polymarket es lineal respecto al trade

Resumen Ejecutivo

❌ No es 7% flat del trade

🟡 Aproximadamente 7% del payout en muchos mercados

❌ No viene en el endpoint de market

❌ No está incluido en bid/ask

❌ No es maker/taker clásico

🟡 Withdrawal puede tener costos bancarios

Para tu comparador

Si quieres comparar con Polymarket correctamente:

Normaliza precio (0–1)

Calcula fee estimada

Ajusta effective probability