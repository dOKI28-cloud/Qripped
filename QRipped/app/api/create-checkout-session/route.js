import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  try {
    const { lang } = await request.json();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: 'QRipped Pro Plan',
              description: 'Udhërrëfyes dhe plane ushqimore të personalizuara për masë muskulore.',
            },
            unit_amount: 1900, // 19.00 EUR
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      // Pasi pagesa kryhet me sukses te Stripe, përdoruesi kthehet te kjo faqe
      success_url: `${request.headers.get('origin')}/${lang}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.headers.get('origin')}/${lang}/pricing`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Gabim në Stripe:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}