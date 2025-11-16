import type { APIRoute } from 'astro';

// Simple in-memory rate limiting (for demo purposes)
// In production, use Redis or a proper rate-limiting service
const demoUsage = new Map<string, { count: number; resetAt: number }>();

const MAX_DEMOS_PER_IP = 3; // 3 demos per IP
const RESET_WINDOW_MS = 24 * 60 * 60 * 1000; // 24 hours

export const prerender = false;

export const GET: APIRoute = async ({ request, clientAddress }) => {
  try {
    const ip = clientAddress || 'unknown';
    const now = Date.now();

    // Clean up expired entries
    for (const [key, value] of demoUsage.entries()) {
      if (now > value.resetAt) {
        demoUsage.delete(key);
      }
    }

    // Check current usage
    const usage = demoUsage.get(ip);

    if (!usage) {
      // First time user
      demoUsage.set(ip, {
        count: 1,
        resetAt: now + RESET_WINDOW_MS,
      });
      return new Response(
        JSON.stringify({
          allowed: true,
          remaining: MAX_DEMOS_PER_IP - 1,
        }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    if (usage.count >= MAX_DEMOS_PER_IP) {
      // Rate limit exceeded
      const hoursUntilReset = Math.ceil((usage.resetAt - now) / (1000 * 60 * 60));
      return new Response(
        JSON.stringify({
          allowed: false,
          remaining: 0,
          resetInHours: hoursUntilReset,
          message: `You've reached the demo limit. Please try again in ${hoursUntilReset} hours or purchase the full experience.`,
        }),
        {
          status: 429,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Increment usage
    usage.count += 1;
    demoUsage.set(ip, usage);

    return new Response(
      JSON.stringify({
        allowed: true,
        remaining: MAX_DEMOS_PER_IP - usage.count,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error: any) {
    console.error('Rate limit check error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};
