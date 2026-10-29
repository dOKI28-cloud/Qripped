"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function PricingSection({ lang = "sq", dict }) {
  const [billingCycle, setBillingCycle] = useState("lifetime"); // lifetime ose monthly

  return (
    <section className="relative py-24 px-6 overflow-hidden bg-gradient-to-b from-[#f4fbf7] to-white">
      {/* Elementë dekorativë sfondi */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#0fa94a]/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10 space-y-12">
        
        {/* Koka e Seksionit */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="inline-block bg-[#e2f7ec] text-[#0f763e] text-xs font-bold uppercase px-4 py-1.5 rounded-full tracking-wider shadow-sm">
            {dict?.pricing?.badge || "Investo te Trupi Yt"}
          </span>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-[#0f172a]">
            {dict?.pricing?.title || "Zgjidh Paketën Tënde"}
          </h2>
          <p className="text-gray-600 text-base md:text-lg">
            {dict?.pricing?.subtitle || "Plane ushqimore dhe stërvitje të personalizuara me çmimin e një kafeje."}
          </p>

          {/* Butonat e ndërprerjes (Monthly / Lifetime) */}
          <div className="inline-flex bg-gray-100 p-1.5 rounded-2xl border border-gray-200 mt-6">
            <button
              onClick={() => setBillingCycle("lifetime")}
              className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all duration-200 ${
                billingCycle === "lifetime"
                  ? "bg-white text-[#0f172a] shadow-md"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              {dict?.pricing?.lifetimeBtn || "Akses i Përjetshëm 🚀"}
            </button>
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all duration-200 ${
                billingCycle === "monthly"
                  ? "bg-white text-[#0f172a] shadow-md"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              {dict?.pricing?.monthlyBtn || "Paguaj Muaj për Muaj"}
            </button>
          </div>
        </div>

        {/* Kartat e Çmimeve (2 Opsione: Standard dhe PRO) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch max-w-4xl mx-auto">
          
          {/* Karta 1: Bazike / Standard */}
          <div className="bg-white rounded-[32px] p-8 md:p-10 border border-gray-200 shadow-sm flex flex-col justify-between transition hover:shadow-md">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-extrabold text-[#0f172a]">Starter Plan</h3>
                <p className="text-gray-500 text-sm mt-1">Për ata që duan një orientim bazë në palestër.</p>
              </div>

              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black tracking-tight text-[#0f172a]">$4.99</span>
                <span className="text-sm font-semibold text-gray-400">/ one-time</span>
              </div>

              <ul className="space-y-4 text-sm text-gray-600 pt-4 border-t border-gray-100">
                <li className="flex items-center gap-3">
                  <span className="text-[#0fa94a] font-bold">✓</span> Qasje në ushtrimet bazë
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-[#0fa94a] font-bold">✓</span> Udhëzues për çdo muskul
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <span>✕</span> Plan ushqimor i personalizuar
                </li>
              </ul>
            </div>

            <div className="pt-8">
              <Link
                href={`/${lang}/checkout/success`}
                className="block text-center w-full bg-gray-100 hover:bg-gray-200 text-[#0f172a] font-bold py-4 rounded-2xl transition duration-200"
              >
                Fillo Falas / Basic
              </Link>
            </div>
          </div>

          {/* Karta 2: PRO / Spektakolare (E Veçuar me ngjyrë dhe hije) */}
          <div className="bg-gradient-to-b from-[#0f763e] to-[#0fa94a] rounded-[32px] p-8 md:p-10 text-white shadow-2xl shadow-[#0fa94a]/30 flex flex-col justify-between relative transform md:-translate-y-3 border-2 border-white/20">
            {/* Etiketa e Popullaritetit */}
            <div className="absolute -top-4 right-8 bg-white text-[#0f763e] text-xs font-black uppercase px-4 py-1.5 rounded-full shadow-md tracking-wider">
              {dict?.pricing?.popularBadge || "Më i Zgjedhuri ⭐"}
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-black">{dict?.pricing?.proTitle || "QRipped PRO Master"}</h3>
                <p className="text-white/80 text-sm mt-1">Transformim total: Ushqim + Ushtrime të plota.</p>
              </div>

              <div className="flex items-baseline gap-1">
                <span className="text-5xl font-black tracking-tight">
                  {billingCycle === "lifetime" ? "$9.99" : "$3.99"}
                </span>
                <span className="text-sm font-medium text-white/80">
                  {billingCycle === "lifetime" ? "/ lifetime access" : "/ monthly"}
                </span>
              </div>

              <ul className="space-y-4 text-sm text-white/90 pt-4 border-t border-white/20">
                <li className="flex items-center gap-3">
                  <span className="bg-white/20 p-1 rounded-full text-xs">✅</span> {dict?.mealsHeader || "Plan ushqimor i saktë & gramatura"}
                </li>
                <li className="flex items-center gap-3">
                  <span className="bg-white/20 p-1 rounded-full text-xs">✅</span> {dict?.workouts?.badge || "Të gjitha udhëzimet e stërvitjes"}
                </li>
                <li className="flex items-center gap-3">
                  <span className="bg-white/20 p-1 rounded-full text-xs">✅</span> Llogaritje automatike e kalorive (Bulking/Cutting)
                </li>
                <li className="flex items-center gap-3">
                  <span className="bg-white/20 p-1 rounded-full text-xs">✅</span> Përditësime falas për jetë
                </li>
              </ul>
            </div>

            <div className="pt-8">
              <Link
                href={`/${lang}/checkout/success`}
                className="block text-center w-full bg-white hover:bg-gray-100 text-[#0f763e] font-black py-4 rounded-2xl shadow-xl transition duration-200 transform hover:scale-[1.02]"
              >
                {dict?.submitBtn || "Merr Planin Tani Të Plote →"}
              </Link>
            </div>
          </div>

        </div>

        {/* Garancia / Informacion shtesë */}
        <div className="text-center text-xs text-gray-400 space-y-1">
          <p>🔒 Pagesë e siguruar dhe e mbrojtur. Qasje e menjëhershme pas konfirmimit.</p>
        </div>

      </div>
    </section>
  );
}