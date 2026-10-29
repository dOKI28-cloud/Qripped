import React from 'react';
import Link from 'next/link';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import { getDictionary } from "../../lib/dictionaries";

export default async function ExploreWorkoutsPage({ params }) {
  // 1. Marrim gjuhën nga URL (sq, en, tr, mk)
  const resolvedParams = await params;
  const lang = resolvedParams?.lang || "sq";
  
  // 2. Ngarkojmë fjalorin e përkthimeve
  const dict = await getDictionary(lang);

  // Lista e grupeve muskulore e përkthyer nga fjalori
  const muscleGroups = [
    { 
      id: 'chest', 
      name: dict?.workouts?.chestName || 'Gjoksi', 
      count: dict?.workouts?.chestCount || '9 Ushtrime', 
      icon: '💪' 
    },
    { 
      id: 'back', 
      name: dict?.workouts?.backName || 'Shpina', 
      count: dict?.workouts?.backCount || '10 Ushtrime', 
      icon: '📐' 
    },
    { 
      id: 'legs', 
      name: dict?.workouts?.legsName || 'Këmbët', 
      count: dict?.workouts?.legsCount || '15 Ushtrime', 
      icon: '🦵' 
    },
    { 
      id: 'shoulders', 
      name: dict?.workouts?.shouldersName || 'Garpat', 
      count: dict?.workouts?.shouldersCount || '8 Ushtrime', 
      icon: '🦅' 
    },
    { 
      id: 'arms', 
      name: dict?.workouts?.armsName || 'Krahët', 
      count: dict?.workouts?.armsCount || '14 Ushtrime', 
      icon: '🚀' 
    },
    { 
      id: 'abs', 
      name: dict?.workouts?.absName || 'Muskujt e Barkut', 
      count: dict?.workouts?.absCount || '8 Ushtrime', 
      icon: '🍫' 
    },
  ];

  return (
    <div className="min-h-screen bg-[#f4fbf7] text-[#0f172a] font-sans antialiased flex flex-col justify-between">
      
      {/* Navbar dinamike me mbështetje gjuhe */}
      <Navbar lang={lang} dict={dict} />

      {/* Përmbajtja Kryesore */}
      <main className="max-w-6xl mx-auto px-6 pt-28 pb-12 md:py-20 flex-1 w-full">
        
        {/* Navigimi Kthehu */}
        <div className="mb-8">
          <Link 
            href={`/${lang}`} 
            className="text-sm font-semibold text-[#0f763e] hover:text-[#0fa94a] transition inline-flex items-center gap-2"
          >
            &larr; {dict?.workouts?.backHome || "Kthehu te Kreu"}
          </Link>
        </div>

        {/* Hyrja e faqes */}
        <div className="mb-12 space-y-3">
          <span className="inline-block bg-[#e2f7ec] text-[#0f763e] text-xs font-bold tracking-wider uppercase px-3 py-1.5 rounded-full shadow-sm">
            {dict?.workouts?.badge || "Eksploro programet"}
          </span>
          <h1 className="text-4xl font-black tracking-tight">
            {dict?.workouts?.title1 || "Zgjidh një"}{" "}
            <span className="text-[#0fa94a]">
              {dict?.workouts?.title2 || "Grup Muskulor"}
            </span>
          </h1>
          <p className="text-[#475569] text-base font-medium max-w-xl">
            {dict?.workouts?.subtitle || "Klikoni mbi një nga kategoritë më poshtë për të parë planet e pastra të stërvitjes dhe për të ndjekur udhëzimet hap pas hapi."}
          </p>
        </div>

        {/* Grid i Kategorive të Ushtrimeve */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {muscleGroups.map((muscle) => (
            <Link 
              key={muscle.id} 
              href={`/${lang}/workouts/${muscle.id}`}
              className="group bg-white p-6 rounded-2xl border border-gray-100 shadow-sm shadow-gray-200/50 hover:shadow-xl hover:border-[#c3f0d5] hover:bg-gradient-to-br hover:from-white hover:to-[#f4fbf7] transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                {/* Ikona */}
                <div className="w-14 h-14 bg-[#e2f7ec] group-hover:bg-[#0fa94a] text-[#0fa94a] group-hover:text-white rounded-xl flex items-center justify-center text-2xl transition-colors duration-300 shadow-sm">
                  {muscle.icon}
                </div>
                {/* Teksti */}
                <div>
                  <h3 className="font-bold text-lg text-[#0f172a] group-hover:text-[#0fa94a] transition-colors duration-200">
                    {muscle.name}
                  </h3>
                  <p className="text-sm text-[#475569] font-medium">
                    {muscle.count}
                  </p>
                </div>
              </div>

              {/* Shigjeta */}
              <div className="text-gray-300 group-hover:text-[#0fa94a] group-hover:translate-x-1 transition-all duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </div>
            </Link>
          ))}
        </div>

      </main>

      {/* Footer */}
      <Footer lang={lang} dict={dict} />
    </div>
  );
}