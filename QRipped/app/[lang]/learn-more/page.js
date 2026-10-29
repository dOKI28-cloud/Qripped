import React from 'react';
import Link from 'next/link';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import { getDictionary } from "../../lib/dictionaries";

export default async function LearnMorePage({ params }) {
  const resolvedParams = await params;
  const lang = resolvedParams?.lang || "sq";
  const dict = await getDictionary(lang);

  return (
    <div className="min-h-screen bg-[#f4fbf7] text-[#0f172a] font-sans antialiased flex flex-col justify-between">
      
      {/* Navbar */}
      <Navbar lang={lang} dict={dict} />

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 pt-28 pb-12 md:py-20 flex-1">
        
        {/* Header / Navigimi i thjeshtë */}
        <div className="mb-8">
         
        </div>

        {/* Hero Section e vogël brenda faqes */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="inline-block bg-[#e2f7ec] text-[#0f763e] text-xs font-bold tracking-wider uppercase px-3 py-1.5 rounded-full shadow-sm">
            {dict?.learnMore?.badge || "Rreth Platformës Sonë"}
          </span>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
            {dict?.learnMore?.title1 || "Mënyra më e zgjuar për të ndërtuar"} <br />
            <span className="text-[#0fa94a]">
              {dict?.learnMore?.title2 || "Trupin tënd më të Mirë"}
            </span>
          </h1>
          <p className="text-[#475569] text-lg font-medium">
            {dict?.learnMore?.subtitle || "QRipped nuk është thjesht një aplikacion stërvitjeje. Është udhërrëfyesi yt personal drejt një jete më të shëndetshme dhe një trupi më të fortë."}
          </p>
        </div>

        {/* Grid me Karakteristikat Kryesore (3 Kolona) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          
          {/* Kartela 1 */}
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm shadow-gray-200/50 hover:shadow-md transition duration-200">
            <div className="w-12 h-12 bg-[#e2f7ec] rounded-xl flex items-center justify-center text-[#0fa94a] mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">
              {dict?.learnMore?.card1Title || "Plane të Pastra"}
            </h3>
            <p className="text-[#475569] leading-relaxed text-sm">
              {dict?.learnMore?.card1Desc || "Ska më konfuzion. Çdo ushtrim vjen me udhëzime të qarta, video dhe këshilla precize për çdo grup muskulor."}
            </p>
          </div>

          {/* Kartela 2 */}
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm shadow-gray-200/50 hover:shadow-md transition duration-200">
            <div className="w-12 h-12 bg-[#e2f7ec] rounded-xl flex items-center justify-center text-[#0fa94a] mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">
              {dict?.learnMore?.card2Title || "Zgjidh Muskulin"}
            </h3>
            <p className="text-[#475569] leading-relaxed text-sm">
              {dict?.learnMore?.card2Desc || "Fokusohu aty ku ke nevojë. Filtro stërvitjet sipas pjesëve të trupit që dëshiron të përmirësosh sot."}
            </p>
          </div>

          {/* Kartela 3 */}
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm shadow-gray-200/50 hover:shadow-md transition duration-200">
            <div className="w-12 h-12 bg-[#e2f7ec] rounded-xl flex items-center justify-center text-[#0fa94a] mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">
              {dict?.learnMore?.card3Title || "Hap pas Hapi"}
            </h3>
            <p className="text-[#475569] leading-relaxed text-sm">
              {dict?.learnMore?.card3Desc || "Nga nivelet fillestare deri te ato të avancuara. Ndjekja e progresit tënd nuk ka qenë kurrë më e thjeshtë."}
            </p>
          </div>

        </div>

        {/* CTA Section */}
        <div className="bg-[#daf6e6] rounded-[32px] p-8 md:p-12 text-center border border-[#c3f0d5] space-y-6">
          <h2 className="text-2xl md:text-3xl font-black text-[#0f172a]">
            {dict?.learnMore?.ctaTitle || "Gati për të filluar transformimin tënd?"}
          </h2>
          <p className="text-[#0f763e] font-medium max-w-xl mx-auto text-base">
            {dict?.learnMore?.ctaDesc || "Zgjidh një grup muskulor dhe nis programin tënd të parë të stërvitjes që sot pa humbur kohë."}
          </p>
          <div className="pt-2">
            <Link 
  href={`/${lang}/pricing`} 
  className="inline-block bg-[#0fa94a] hover:bg-[#0c8e3e] text-white font-semibold px-8 py-4 rounded-xl shadow-lg shadow-[#0fa94a]/20 transition duration-200"
>
  {dict?.learnMore?.ctaBtn || "Fillo Tani"}
</Link>
          </div>
        </div>

      </main>

      {/* Footer */}
      <Footer lang={lang} dict={dict} />
    </div>
  );
}