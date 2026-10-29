import { NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST(request) {
  try {
    // Kontrollo nëse çelësi ekziston para se të krijosh instancën
    if (!process.env.STRIPE_SECRET_KEY) {
      console.error("STRIPE_SECRET_KEY mungon në variablat e mjedisit!");
      return NextResponse.json({ error: "Server configuration error: Missing Stripe Key" }, { status: 500 });
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1900, // 19.00 EUR
      currency: 'eur',
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return NextResponse.json({ 
      clientSecret: paymentIntent.client_secret 
    });
  } catch (error) {
    console.error("Gabim i detajuar nga Stripe:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}