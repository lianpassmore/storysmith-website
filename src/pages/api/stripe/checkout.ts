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
      priceId = import.meta.env.STRIPE_PRICE_ID // The Spoken Legacy Product Price ID
    } = body;

    // Validate required fields (storyteller email is optional)
    if (!email || !yourName || !storytellerName) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (!priceId) {
      return new Response(
        JSON.stringify({ error: 'Product price not configured. Please contact support.' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const appUrl = import.meta.env.PUBLIC_APP_URL || 'https://storysmith.work';

    // Create Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'afterpay_clearpay'],
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
        storytellerEmail: storytellerEmail || 'Not provided',
        giftingType: giftingType || 'digital',
        mailingAddress: body.mailingAddress || 'N/A',
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
