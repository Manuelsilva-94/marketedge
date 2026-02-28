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