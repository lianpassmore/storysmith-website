import type { APIRoute } from 'astro';

// Simple analytics tracking for demo usage
// In production, integrate with your analytics service (Google Analytics, Mixpanel, etc.)
const demoAnalytics = new Map<string, {
  starts: number;
  completions: number;
  lastUpdated: number;
}>();

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { event, metadata } = body;

    if (!event || typeof event !== 'string') {
      return new Response(
        JSON.stringify({ error: 'Invalid event' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const today = new Date().toISOString().split('T')[0];
    const stats = demoAnalytics.get(today) || {
      starts: 0,
      completions: 0,
      lastUpdated: Date.now(),
    };

    switch (event) {
      case 'demo_started':
        stats.starts += 1;
        break;
      case 'demo_completed':
        stats.completions += 1;
        break;
      case 'demo_conversion':
        // Track when someone clicks purchase after demo
        console.log('Demo led to purchase page visit', metadata);
        break;
      default:
        console.log('Unknown event:', event, metadata);
    }

    stats.lastUpdated = Date.now();
    demoAnalytics.set(today, stats);

    // Log for monitoring
    console.log(`[Demo Analytics] ${event}:`, {
      date: today,
      totalStarts: stats.starts,
      totalCompletions: stats.completions,
      conversionRate: stats.starts > 0 ? ((stats.completions / stats.starts) * 100).toFixed(2) + '%' : '0%',
    });

    return new Response(
      JSON.stringify({ success: true }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error: any) {
    console.error('Analytics tracking error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};

// GET endpoint to retrieve stats (for admin/monitoring)
export const GET: APIRoute = async () => {
  try {
    const stats = Array.from(demoAnalytics.entries()).map(([date, data]) => ({
      date,
      ...data,
      conversionRate: data.starts > 0 ? ((data.completions / data.starts) * 100).toFixed(2) + '%' : '0%',
    }));

    return new Response(
      JSON.stringify({ stats }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error: any) {
    console.error('Analytics retrieval error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};
