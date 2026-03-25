import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

type RequestLike = NextRequest | Request;

/**
 * Crons: en desarrollo no exige header (local). En producción exige CRON_SECRET
 * y Authorization: Bearer <CRON_SECRET>. Si falta el secret en prod → 503.
 */
export function requireCronAuth(req: RequestLike): NextResponse | null {
  if (process.env.NODE_ENV === 'development') {
    return null;
  }
  const secret = process.env.CRON_SECRET;
  if (!secret) {
    return NextResponse.json(
      { error: 'CRON_SECRET is not configured' },
      { status: 503 }
    );
  }
  const auth = req.headers.get('authorization');
  if (auth !== `Bearer ${secret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  return null;
}

/**
 * Rutas /api/admin/*: en producción mismo esquema Bearer que los crons.
 * En desarrollo sin auth para poder probar desde el navegador.
 */
export function requireAdminApiAuth(req: RequestLike): NextResponse | null {
  if (process.env.NODE_ENV === 'development') {
    return null;
  }
  const secret = process.env.CRON_SECRET;
  if (!secret) {
    return NextResponse.json(
      { error: 'CRON_SECRET is not configured' },
      { status: 503 }
    );
  }
  const auth = req.headers.get('authorization');
  if (auth !== `Bearer ${secret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  return null;
}
