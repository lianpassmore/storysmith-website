export { renderers } from '../../../renderers.mjs';

const demoUsage = /* @__PURE__ */ new Map();
const MAX_DEMOS_PER_IP = 3;
const RESET_WINDOW_MS = 24 * 60 * 60 * 1e3;
const prerender = false;
const GET = async ({ request, clientAddress }) => {
  try {
    const ip = clientAddress || "unknown";
    const now = Date.now();
    for (const [key, value] of demoUsage.entries()) {
      if (now > value.resetAt) {
        demoUsage.delete(key);
      }
    }
    const usage = demoUsage.get(ip);
    if (!usage) {
      demoUsage.set(ip, {
        count: 1,
        resetAt: now + RESET_WINDOW_MS
      });
      return new Response(
        JSON.stringify({
          allowed: true,
          remaining: MAX_DEMOS_PER_IP - 1
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" }
        }
      );
    }
    if (usage.count >= MAX_DEMOS_PER_IP) {
      const hoursUntilReset = Math.ceil((usage.resetAt - now) / (1e3 * 60 * 60));
      return new Response(
        JSON.stringify({
          allowed: false,
          remaining: 0,
          resetInHours: hoursUntilReset,
          message: `You've reached the demo limit. Please try again in ${hoursUntilReset} hours or purchase the full experience.`
        }),
        {
          status: 429,
          headers: { "Content-Type": "application/json" }
        }
      );
    }
    usage.count += 1;
    demoUsage.set(ip, usage);
    return new Response(
      JSON.stringify({
        allowed: true,
        remaining: MAX_DEMOS_PER_IP - usage.count
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" }
      }
    );
  } catch (error) {
    console.error("Rate limit check error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
