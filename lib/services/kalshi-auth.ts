import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

export class KalshiAuth {
  private apiKey: string;
  private privateKey: crypto.KeyObject;

  constructor() {
    this.apiKey = process.env.KALSHI_API_KEY!;

    // Leer private key desde archivo o variable de entorno
    const privateKeyPath = process.env.KALSHI_PRIVATE_KEY_PATH;

    let keyPem: string;
    if (privateKeyPath) {
      // Si hay path, leer desde archivo (evita problemas de escaping)
      const fullPath = path.resolve(process.cwd(), privateKeyPath);
      const keyContent = fs.readFileSync(fullPath, 'utf8');
      // Normalizar line endings (CRLF/CR -> LF) para compatibilidad con crypto
      keyPem = keyContent.replace(/\r\n/g, '\n').replace(/\r/g, '\n').trim();
    } else if (process.env.KALSHI_PRIVATE_KEY) {
      // En .env los \n suelen ser literales - convertir a saltos de línea reales
      keyPem = process.env.KALSHI_PRIVATE_KEY.replace(/\\n/g, '\n').trim();
    } else {
      throw new Error('KALSHI_PRIVATE_KEY o KALSHI_PRIVATE_KEY_PATH must be set');
    }

    // Validar y parsear la clave (soporta PKCS#1 y PKCS#8)
    try {
      const isPkcs1 = keyPem.includes('BEGIN RSA PRIVATE KEY');
      this.privateKey = crypto.createPrivateKey({
        key: keyPem,
        format: 'pem',
        ...(isPkcs1 && { type: 'pkcs1' })
      });
    } catch (err) {
      throw new Error(
        `KALSHI_PRIVATE_KEY inválida: ${err instanceof Error ? err.message : err}. Verifica formato PEM y line endings.`
      );
    }

    console.log('✅ Kalshi auth initialized');
  }

  /**
   * Genera signature RSA-PSS para una request
   * Formato: timestamp + METHOD + path (sin query params, sin body)
   */
  generateSignature(method: string, path: string): string {
    const timestamp = Date.now().toString();

    // Mensaje: timestamp + METHOD + path
    // IMPORTANTE: NO incluir query params, NO incluir body
    const message = timestamp + method + path;

    // Firma RSA-PSS con SHA-256 (usar KeyObject parseado evita DECODER errors)
    const signature = crypto.sign('sha256', Buffer.from(message), {
      key: this.privateKey,
      padding: crypto.constants.RSA_PKCS1_PSS_PADDING
    });

    return signature.toString('base64');
  }

  /**
   * Genera headers para una request autenticada
   */
  getHeaders(method: string, path: string): Record<string, string> {
    const timestamp = Date.now().toString();
    const signature = this.generateSignature(method, path);

    return {
      'KALSHI-ACCESS-KEY': this.apiKey,
      'KALSHI-ACCESS-TIMESTAMP': timestamp,
      'KALSHI-ACCESS-SIGNATURE': signature,
      'Content-Type': 'application/json',
      Accept: 'application/json'
    };
  }
}
