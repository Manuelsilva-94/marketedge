A) Autenticación
Investigación 2.1: Implementación de Auth
Objetivo: Hacer que funcione la autenticación
Ya tienes API key. Ahora necesitas:
Doc oficial:
https://trading-api.readme.io/reference/authentication
Preguntas críticas:

¿El signature es HMAC-SHA256?
¿Qué va en el mensaje a firmar?

Formato: timestamp + method + path + body?
¿O diferente?

Get Orders
Restricts the response to orders that have a certain status: resting, canceled, or executed.

GET /portfolio/orders

Authorizations
​
KALSHI-ACCESS-KEY
stringheaderrequired
Your API key ID

​
KALSHI-ACCESS-SIGNATURE
stringheaderrequired
RSA-PSS signature of the request

​
KALSHI-ACCESS-TIMESTAMP
stringheaderrequired
Request timestamp in milliseconds


¿Timestamp en milliseconds o seconds?
¿Body va como JSON string o raw?
¿Encoding del signature (hex, base64)?
¿Headers exactos?

## Signature Generation
```javascript
import crypto from "crypto";
import fs from "fs";
import fetch from "node-fetch";

const API_KEY_ID = "apikey";
const PRIVATE_KEY_PATH = "./marketedge.txt";

const BASE_URL = "https://api.elections.kalshi.com";
const PATH = "/trade-api/v2/portfolio/orders";
const QUERY = "?limit=100&ticker=KXNBAPTS-26FEB22CLEOKC-CLEDMITCHELL45-20";
const METHOD = "GET";

const privateKey = fs.readFileSync(PRIVATE_KEY_PATH, "utf8");
const timestamp = Date.now().toString();

// ⚠️ SOLO PATH
const message = timestamp + METHOD + PATH;

const signature = crypto.sign(
  "sha256",
  Buffer.from(message),
  {
    key: privateKey,
    padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
  }
);

const signatureBase64 = signature.toString("base64");

async function testKalshi() {
  const response = await fetch(BASE_URL + PATH + QUERY, {
    method: METHOD,
    headers: {
      "KALSHI-ACCESS-KEY": API_KEY_ID,
      "KALSHI-ACCESS-TIMESTAMP": timestamp,
      "KALSHI-ACCESS-SIGNATURE": signatureBase64,
    },
  });

  const text = await response.text();
  console.log("Status:", response.status);
  console.log("Response:", text);
}

testKalshi();
```
Este script funciona y autentica bien

# Autenticación API – Kalshi

Referencia: :contentReference[oaicite:0]{index=0}

---

## ¿El signature es HMAC-SHA256?

❌ No.

Kalshi **NO usa HMAC**.

Usa:

- ✅ **RSA-PSS**
- ✅ **SHA-256**
- ❌ No shared secret
- ❌ No HMAC

Es firma asimétrica usando tu **private key RSA**.

---

## ¿Qué va en el mensaje a firmar?

El formato correcto es:


timestamp + HTTP_METHOD + request_path


### ⚠️ Importante:

- `HTTP_METHOD` en MAYÚSCULAS (`GET`, `POST`)
- `request_path` **sin dominio**
- No incluir `https://api.elections.kalshi.com`
- No incluir query params
- No incluir body (para GET)

---

## ¿Formato exacto?

### Para GET


timestamp + method + path


Ejemplo:


1730245874123GET/trade-api/v2/portfolio/orders


---

### Para POST

Sigue siendo:


timestamp + method + path


🔴 El body NO se concatena en el string a firmar.

---

## ¿Timestamp en milliseconds o seconds?

✅ **Milliseconds**

Ejemplo correcto:


1730245874123


❌ Incorrecto:


1730245874


Debe ser equivalente a:

```js
Date.now().toString()
¿Body va como JSON string o raw?

El body se envía normalmente como:

{
  "ticker": "...",
  "side": "yes",
  "price": 45,
  "count": 10
}

Pero:

❌ No se incluye en la firma

Se envía como JSON estándar

Header recomendado:

Content-Type: application/json
¿Encoding del signature?

✅ Base64

No hex.

Ejemplo:

MEUCIQDb3hT8kq...longstring...==

Se genera así:

signature.toString("base64")
¿Headers exactos requeridos?
KALSHI-ACCESS-KEY
KALSHI-ACCESS-TIMESTAMP
KALSHI-ACCESS-SIGNATURE

Ejemplo:

KALSHI-ACCESS-KEY: 7f3c9e2a-...
KALSHI-ACCESS-TIMESTAMP: 1730245874123
KALSHI-ACCESS-SIGNATURE: MEUCIQDb3hT8kq...