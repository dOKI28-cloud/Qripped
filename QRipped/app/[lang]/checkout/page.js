"use client";
import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../components/CheckoutForm";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";

// Inicializimi i Stripe me çelësin publik live
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function CheckoutPage({ params }) {
  const resolvedParams = React.use(params);
  const lang = resolvedParams?.lang || "sq";
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // Gjeneron clientSecret sapo hapet faqja
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.clientSecret) {
          setClientSecret(data.clientSecret);
        }
      })
      .catch((err) => console.error("Gabim në ngarkimin e Stripe:", err));
  }, []);

  // Stilizimi i integruar që përshtatet me modulin e Stripe
  const appearance = {
    theme: 'stripe',
    variables: {
      colorPrimary: '#0fa94a',
      colorBackground: '#ffffff',
      colorText: '#0f172a',
      colorDanger: '#ef4444',
      fontFamily: 'system-ui, sans-serif',
      borderRadius: '12px',
    },
  };

  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="min-h-screen bg-[#f4fbf7] text-[#0f172a] font-sans antialiased flex flex-col justify-between">
      <Navbar lang={lang} />

      <main className="max-w-md mx-auto px-6 pt-32 pb-20 flex-1 w-full space-y-4">
        
        {/* 1. Përmbledhja e Porosisë (Order Summary Box) */}
        <div className="bg-white p-5 rounded-[24px] border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Paketa e Zgjedhur</p>
            <h3 className="text-sm font-black text-[#0f172a]">QRipped PRO Master</h3>
          </div>
          <div className="text-right">
            <span className="text-lg font-black text-[#0f763e]">$19.99</span>
            <span className="block text-[10px] text-gray-400 font-semibold">Qasje e Përjetshme</span>
          </div>
        </div>

        {/* Kutia Kryesore e Pagesës */}
        <div className="bg-white p-8 md:p-10 rounded-[28px] border border-gray-200 shadow-sm space-y-6">
          <div className="text-center space-y-2">
            <span className="inline-block bg-[#e2f7ec] text-[#0f763e] text-xs font-bold uppercase px-3.5 py-1.5 rounded-full tracking-wider">
              QRipped Pro Plan
            </span>
            <h1 className="text-2xl font-black tracking-tight">Detajet e Pagesës</h1>
            <p className="text-gray-500 text-xs font-medium">Pagesë e mbrojtur dhe e enkriptuar nga Stripe SSL.</p>
          </div>

          {clientSecret ? (
            <Elements stripe={stripePromise} options={options}>
              <CheckoutForm lang={lang} />
            </Elements>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 space-y-3">
              <div className="w-8 h-8 border-3 border-[#0fa94a] border-t-transparent rounded-full animate-spin"></div>
              <p className="text-gray-400 text-xs font-medium">Duke përgatitur arkën e sigurt...</p>
            </div>
          )}

          {/* 4. Pyetjet e Shpeshta (FAQ) të shkurtra */}
          <div className="pt-4 border-t border-gray-100 space-y-2">
            <p className="text-xs font-bold text-gray-700">❓ Pyetje të shpeshta:</p>
            <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 text-xs space-y-1">
              <p className="font-bold text-[#0f172a]">A fitoj qasje të menjëhershme pas pagesës?</p>
              <p className="text-gray-500">Po, menjëherë pas konfirmimit do të kalosh te krijimi i planit tënd.</p>
            </div>
          </div>

          {/* 2 & 3. Garancia (Money-Back) & Trust Badges (SSL) */}
          <div className="pt-2 flex flex-col items-center space-y-2 text-center">
            <div className="flex items-center gap-1.5 text-xs font-bold text-gray-600">
              <span>🛡️ Garanci 30-ditore e kthimit të parave</span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-gray-400 font-medium">
              <span>Enkriptim 256-bit SSL • Siguruar nga</span>
              <span className="text-[#635bff] font-black tracking-wider text-xs">stripe</span>
            </div>
          </div>
        </div>
      </main>

      <Footer lang={lang} />
    </div>
  );
}