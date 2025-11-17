import type { APIRoute } from 'astro';
import Stripe from 'stripe';

const stripe = new Stripe(import.meta.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-11-20.acacia',
});

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const {
      email,
      yourName,
      storytellerName,
      storytellerEmail,
      giftingType,
      productId = 'price_1SROmLIMOgoHmS2Ca82ES1sj' // The Spoken Legacy Product
    } = body;

    // Validate required fields
    if (!email || !yourName || !storytellerName || !storytellerEmail) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const appUrl = import.meta.env.PUBLIC_APP_URL || 'https://storysmith.work';

    // Get the default price for this product
    const prices = await stripe.prices.list({
      product: productId,
      active: true,
      limit: 1,
    });

    if (!prices.data || prices.data.length === 0) {
      throw new Error('No active price found for this product');
    }

    const priceId = prices.data[0].id;

    // Create Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${appUrl}/purchase-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/legacy-purchase`,
      customer_email: email,
      metadata: {
        product: 'The Spoken Legacy',
        purchaserName: yourName,
        purchaserEmail: email,
        storytellerName: storytellerName,
        storytellerEmail: storytellerEmail,
        giftingType: giftingType || 'digital',
      },
      allow_promotion_codes: true,
    });

    return new Response(
      JSON.stringify({
        sessionId: session.id,
        url: session.url
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  } catch (error: any) {
    console.error('Stripe checkout error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
};
