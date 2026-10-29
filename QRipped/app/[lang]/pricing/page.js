import React from "react";
import Link from "next/link";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import { getDictionary } from "../../lib/dictionaries";

export default async function PricingPage({ params }) {
  const resolvedParams = await params;
  const lang = resolvedParams?.lang || "sq";
  const dict = await getDictionary(lang);

  return (
    <div className="min-h-screen bg-[#f4fbf7] text-[#0f172a] font-sans antialiased flex flex-col justify-between">
      <Navbar lang={lang} />

      <main className="relative py-24 px-6 overflow-hidden flex-1 flex flex-col justify-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#0fa94a]/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-5xl mx-auto relative z-10 space-y-12 w-full">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <span className="inline-block bg-[#e2f7ec] text-[#0f763e] text-xs font-bold uppercase px-4 py-1.5 rounded-full tracking-wider shadow-sm">
              {dict?.pricing?.badge || "Investo te Trupi Yt"}
            </span>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-[#0f172a]">
              {dict?.pricing?.title || "Zgjidh Paketën Tënde"}
            </h1>
            <p className="text-gray-600 text-base md:text-lg">
              {dict?.pricing?.subtitle || "Plane ushqimore dhe stërvitje të personalizuara me çmimin e një kafeje."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch max-w-4xl mx-auto">
            {/* Karta 1 */}
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
                  <li className="flex items-center gap-3"><span className="text-[#0fa94a] font-bold">✓</span> Qasje në ushtrimet bazë</li>
                  <li className="flex items-center gap-3"><span className="text-[#0fa94a] font-bold">✓</span> Udhëzues për çdo muskul</li>
                  <li className="flex items-center gap-3 text-gray-300"><span>✕</span> Plan ushqimor i personalizuar</li>
                </ul>
              </div>
              <div className="pt-8">
                <Link
                  href={`/${lang}/checkout`}
                  className="block text-center w-full bg-gray-100 hover:bg-gray-200 text-[#0f172a] font-bold py-4 rounded-2xl transition duration-200"
                >
                  Zgjidh Starter
                </Link>
              </div>
            </div>

            {/* Karta 2: PRO */}
            <div className="bg-gradient-to-b from-[#0f763e] to-[#0fa94a] rounded-[32px] p-8 md:p-10 text-white shadow-2xl shadow-[#0fa94a]/30 flex flex-col justify-between relative transform md:-translate-y-3 border-2 border-white/20">
              <div className="absolute -top-4 right-8 bg-white text-[#0f763e] text-xs font-black uppercase px-4 py-1.5 rounded-full shadow-md tracking-wider">
                Më i Zgjedhuri ⭐
              </div>
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-black">QRipped PRO Master</h3>
                  <p className="text-white/80 text-sm mt-1">Transformim total: Ushqim + Ushtrime të plota.</p>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-black tracking-tight">$19.99</span>
                  <span className="text-sm font-medium text-white/80">/ lifetime access</span>
                </div>
                <ul className="space-y-4 text-sm text-white/90 pt-4 border-t border-white/20">
                  <li className="flex items-center gap-3"><span className="bg-white/20 p-1 rounded-full text-xs">✅</span> Plan ushqimor i saktë & gramatura</li>
                  <li className="flex items-center gap-3"><span className="bg-white/20 p-1 rounded-full text-xs">✅</span> Të gjitha udhëzimet e stërvitjes</li>
                  <li className="flex items-center gap-3"><span className="bg-white/20 p-1 rounded-full text-xs">✅</span> Llogaritje automatike e kalorive</li>
                  <li className="flex items-center gap-3"><span className="bg-white/20 p-1 rounded-full text-xs">✅</span> Përditësime falas për jetë</li>
                </ul>
              </div>
              <div className="pt-8">
                <Link
                  href={`/${lang}/checkout`}
                  className="block text-center w-full bg-white hover:bg-gray-100 text-[#0f763e] font-black py-4 rounded-2xl shadow-xl transition duration-200 transform hover:scale-[1.02]"
                >
                  Fillo Tani PRO →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer lang={lang} />
    </div>
  );
}