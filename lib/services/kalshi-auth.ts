import crypto from 'crypto';

export class KalshiAuth {
  private apiKey: string;
  private privateKey: crypto.KeyObject;

  constructor() {
    this.apiKey = process.env.KALSHI_API_KEY!;

    const envKey = process.env.KALSHI_PRIVATE_KEY;
    if (!envKey) {
      throw new Error('KALSHI_PRIVATE_KEY must be set');
    }

    // En .env los \n suelen ser literales - convertir a saltos de línea reales
    const keyPem = envKey.replace(/\\n/g, '\n').trim();

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
