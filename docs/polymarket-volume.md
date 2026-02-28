# docs/polymarket-volume.md

## Definiciones

### volume
**Volume total histórico del mercado (lifetime).**

- Es la suma acumulada del valor nocional negociado desde que el mercado abrió.
- Incluye todas las compras y ventas ejecutadas.
- Se expresa en **USD nocionales** (no en cantidad de shares).
- Cada trade suma su notional completo al volumen (price × size).

> Importante: el volumen NO representa dinero actualmente bloqueado, solo actividad histórica.

---

### volume24hr
**Volumen nocional ejecutado en las últimas 24 horas.**

- Misma unidad que `volume` (USD nocionales).
- Ventana móvil de 24h.
- Indicador de actividad reciente.
- Útil para medir interés actual y dinamismo.

---

### liquidity
**Capital disponible actualmente para trading.**

Representa el capital accesible en el mercado en este momento.  
Puede provenir de:

- AMM (`liquidityAmm`)
- Orderbook / CLOB (`liquidityClob`)
- O combinación de ambos

No es:
- Volumen
- Open interest
- Dinero ya apostado

Es una medida de **profundidad disponible**, no de capital comprometido en posiciones abiertas.

---

### openInterest
No existe un campo explícito `openInterest` en la API pública estándar.

En mercados tipo Polymarket:

- Técnicamente cada share tiene contraparte.
- No hay “contratos abiertos” como en futuros tradicionales.
- El sistema funciona con tokens ERC-1155 representando posiciones.

Si quisieras aproximarlo, tendrías que:

1. Obtener supply total del token del outcome.
2. Restar tokens en wallets del market contract.
3. Estimar exposición neta.

Pero:
> No hay un campo directo de open interest como en derivados tradicionales.

---

## Respuestas Directas

### ¿Qué diferencia hay entre volume y volume24hr?

- `volume` = volumen acumulado histórico.
- `volume24hr` = volumen ejecutado en últimas 24h.
- Ambos son nocional en USD.

---

### ¿volume es en USD o en "shares"?

Es en **USD nocional** (price × quantity), no en cantidad de shares.

---

### ¿liquidity es lo mismo que "open interest"?

No.

| Liquidity | Open Interest |
|------------|---------------|
| Capital disponible para tradear | Capital actualmente comprometido en posiciones abiertas |
| Cambia con órdenes activas | Cambia con posiciones netas |
| Profundidad | Exposición |

Son conceptos completamente distintos.

---

### ¿Cómo calcular cuánto dinero real está apostado actualmente?

No hay un campo directo.

Opciones aproximadas:

1. Estimar capital en pools AMM (`liquidityAmm`)
2. Analizar supply on-chain de outcome tokens
3. Sumar valor nocional de posiciones en wallets (requiere indexación)

Pero no es equivalente a open interest tradicional.

---

## Para Comparador

Mostraremos:

- **Volume 24h**
  - Refleja actividad reciente.
  - Indica interés actual.
  - Evita sesgo de mercados antiguos con gran volumen histórico.

- **Liquidity**
  - Indica facilidad de ejecución.
  - Permite estimar slippage.
  - Es más relevante que volume para evaluar calidad de mercado.

No mostraremos:
- Volume total histórico (puede distorsionar comparación).
- Open interest (no disponible directamente).

---

## Recomendación práctica

Para ranking de mercados en un comparador:

Priorizar:
1. volume24hr
2. liquidity
3. spread (si disponible)

Evitar usar volume histórico como métrica principal.