---

# 📊 Campos típicos de `Get Market`

Ejemplo esperado:

```javascript
{
  "yes_bid": 48,
  "yes_ask": 51,
  "no_bid": 49,
  "no_ask": 52,
  "last_price": 50
}

⚠️ Importante: Kalshi usa escala 0–100 (centavos), no 0–1.

🎯 ¿Qué representa cada campo?
yes_bid

Precio más alto que alguien está dispuesto a pagar por YES.

👉 Si tú quieres vender YES inmediatamente, venderías aquí.

yes_ask

Precio más bajo al que alguien está dispuesto a vender YES.

👉 Si tú quieres comprar YES inmediatamente, compras aquí.

no_bid

Precio más alto que alguien paga por NO.

no_ask

Precio más bajo al que alguien vende NO.

last_price

Último precio al que se ejecutó un trade.

⚠️ Puede estar desactualizado si no hubo actividad reciente.

💰 ¿Los precios están en 0–1 o 0–100?

Kalshi usa:

0–100 (centavos)

Ejemplo:

48 → significa 48%

51 → significa 51%

💸 ¿Incluyen fees?

❌ No.

Los precios en el orderbook:

No incluyen fees

Son precios puros de mercado

Las fees se aplican al momento del trade, no están embebidas en bid/ask.

📈 Bid/Ask System
Spread
spread = yes_ask - yes_bid

Ejemplo:

51 - 48 = 3 centavos
Spread típico

Depende de liquidez:

Liquidez	Spread típico
Alta	1–2 centavos
Media	2–4 centavos
Baja	5–15+ centavos
🤔 ¿Qué usar para el comparador?
Opción A: Midpoint
(yes_bid + yes_ask) / 2

✔️ Representa precio justo estimado
✔️ Neutral respecto a lado comprador/vendedor
✔️ Comparable con Polymarket
✔️ No depende del último trade

Opción B: last_price

✔️ Refleja último consenso real
❌ Puede estar desactualizado
❌ Puede ser un trade pequeño

Opción C: yes_ask

✔️ Refleja precio real para entrar long inmediatamente
❌ Sesgado al lado comprador
❌ No comparable si otro exchange usa midpoint

🏆 Recomendación para comparador
✅ Usar: Midpoint
const price = (yes_bid + yes_ask) / 2;
Razón:

Es neutral

Reduce ruido

Es estándar en comparadores financieros

Evita sesgo de ejecución

Más comparable con mercados AMM (como Polymarket)

🔄 Conversión para comparar con Polymarket

Polymarket usa escala 0–1.

Kalshi usa 0–100.

Entonces:

const kalshiMid = (yes_bid + yes_ask) / 2;
const normalized = kalshiMid / 100;
📌 Resumen ejecutivo
Campo	Qué significa
yes_bid	Mejor precio comprador de YES
yes_ask	Mejor precio vendedor de YES
no_bid	Mejor precio comprador de NO
no_ask	Mejor precio vendedor de NO
last_price	Último trade ejecutado
🎯 Decisión para tu comparador
Usaremos: Midpoint normalizado
Razón: Es neutral, comparable y representativo del mercado actual