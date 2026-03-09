import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');

export async function POST(request) {
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json(
        { error: 'Stripe is not configured. Add STRIPE_SECRET_KEY to environment variables.' },
        { status: 500 }
      );
    }

    const { item } = await request.json();

    if (!item || !item.title || typeof item.price !== 'number' || item.price < 0) {
      return NextResponse.json(
        { error: 'Invalid item. Requires title and price.' },
        { status: 400 }
      );
    }

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: item.title,
              description: item.description || item.location || 'Used item from Axiom Realty',
              images: item.image ? [item.image] : undefined,
              metadata: {
                itemId: String(item.id || ''),
                category: item.category || 'other',
              },
            },
            unit_amount: Math.round(item.price * 100), // Stripe uses cents
          },
          quantity: 1,
        },
      ],
      success_url: `${baseUrl}/used-items?success=true&item=${encodeURIComponent(item.title)}`,
      cancel_url: `${baseUrl}/used-items?canceled=true`,
      metadata: {
        itemId: String(item.id || ''),
        itemTitle: item.title,
        itemCategory: item.category || 'other',
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error('Stripe checkout error:', err);
    return NextResponse.json(
      { error: err.message || 'Checkout failed' },
      { status: 500 }
    );
  }
}
