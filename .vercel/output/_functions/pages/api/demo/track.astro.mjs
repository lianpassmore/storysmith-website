export { renderers } from '../../../renderers.mjs';

const demoAnalytics = /* @__PURE__ */ new Map();
const prerender = false;
const POST = async ({ request }) => {
  try {
    const body = await request.json();
    const { event, metadata } = body;
    if (!event || typeof event !== "string") {
      return new Response(
        JSON.stringify({ error: "Invalid event" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    const today = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
    const stats = demoAnalytics.get(today) || {
      starts: 0,
      completions: 0,
      lastUpdated: Date.now()
    };
    switch (event) {
      case "demo_started":
        stats.starts += 1;
        break;
      case "demo_completed":
        stats.completions += 1;
        break;
      case "demo_conversion":
        console.log("Demo led to purchase page visit", metadata);
        break;
      default:
        console.log("Unknown event:", event, metadata);
    }
    stats.lastUpdated = Date.now();
    demoAnalytics.set(today, stats);
    console.log(`[Demo Analytics] ${event}:`, {
      date: today,
      totalStarts: stats.starts,
      totalCompletions: stats.completions,
      conversionRate: stats.starts > 0 ? (stats.completions / stats.starts * 100).toFixed(2) + "%" : "0%"
    });
    return new Response(
      JSON.stringify({ success: true }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" }
      }
    );
  } catch (error) {
    console.error("Analytics tracking error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
};
const GET = async () => {
  try {
    const stats = Array.from(demoAnalytics.entries()).map(([date, data]) => ({
      date,
      ...data,
      conversionRate: data.starts > 0 ? (data.completions / data.starts * 100).toFixed(2) + "%" : "0%"
    }));
    return new Response(
      JSON.stringify({ stats }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" }
      }
    );
  } catch (error) {
    console.error("Analytics retrieval error:", error);
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
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
