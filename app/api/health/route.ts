import { NextResponse } from 'next/server';
import { getMemorialCount, getHauntedFileCount } from '../../../lib/store';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type HealthStatus = 'ok' | 'degraded' | 'error';

type HealthResponse = {
  status: HealthStatus;
  timestamp: string;
  uptimeSeconds: number;
  responseTimeMs: number;
  server: {
    framework: string;
    route: string;
  };
  store?: {
    memorials: number;
    hauntedFiles: number;
  };
  message?: string;
  details?: string;
};

export async function GET() {
  const startedAt = Date.now();
  const timestamp = new Date().toISOString();

  try {
    const memorialCount = getMemorialCount();
    const hauntedFileCount = getHauntedFileCount();

    const healthy =
      Number.isFinite(memorialCount) &&
      Number.isFinite(hauntedFileCount) &&
      memorialCount >= 0 &&
      hauntedFileCount >= 0;

    const body: HealthResponse = {
      status: healthy ? 'ok' : 'degraded',
      timestamp,
      uptimeSeconds: Math.round(process.uptime()),
      responseTimeMs: Date.now() - startedAt,
      server: {
        framework: 'nextjs',
        route: '/api/health',
      },
      store: {
        memorials: memorialCount,
        hauntedFiles: hauntedFileCount,
      },
    };

    return NextResponse.json(body, {
      status: healthy ? 200 : 503,
    });
  } catch (error) {
    const body: HealthResponse = {
      status: 'error',
      timestamp,
      uptimeSeconds: Math.round(process.uptime()),
      responseTimeMs: Date.now() - startedAt,
      server: {
        framework: 'nextjs',
        route: '/api/health',
      },
      message: 'In-memory store unavailable',
      details: error instanceof Error ? error.message : 'Unknown error',
    };

    return NextResponse.json(body, {
      status: 503,
    });
  }
}