"use client"; // E kthejmë në Client Component për të lexuar localStorage
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { getDictionary } from "../lib/dictionaries"; // Kujdes: getDictionary zakonisht ekzekutohet në server. Po e trajtojmë me params.

export default function Home({ params }) {
  const resolvedParams = React.use(params);
  const lang = resolvedParams?.lang || "sq";
  const router = useRouter();

  const [dict, setDict] = useState(null);

  // Simulojmë marrjen e fjalorit (dictionary) ose mund ta kalosh nga props nëse e ndan në sub-komponentë
  useEffect(() => {
    getDictionary(lang).then(setDict);
  }, [lang]);

  const categories = [
    { key: "chest", name: "Chest", url: `/${lang}/workouts/chest` },
    { key: "back", name: "Back", url: `/${lang}/workouts/back` },
    { key: "shoulders", name: "Shoulders", url: `/${lang}/workouts/shoulders` },
    { key: "arms", name: "Arms", url: `/${lang}/workouts/arms` },
    { key: "abs", name: "Abs", url: `/${lang}/workouts/abs` },
    { key: "legs", name: "Legs", url: `/${lang}/workouts/legs` },
  ];

  // Funksioni që kontrollon abonimin kur klikohet "Fillo Tani"
  const handleStartTraining = (e) => {
    e.preventDefault();
    const isLoggedIn = localStorage.getItem("qripped_logged_in") === "true";
    const hasSubscription = localStorage.getItem("qripped_has_subscription") === "true";

    if (!isLoggedIn) {
      // Nëse s'është i kyçur -> dërgoje te login
      router.push(`/${lang}/login`);
    } else if (hasSubscription) {
      // Nëse ka abonim -> dërgoje direkt te plani ushqimor / dashboard
      router.push(`/${lang}/nutrition-plan`); // Ndryshoje rrugën sipas faqes tënde të ushqimit
    } else {
      // Nëse është i kyçur por s'ka abonim -> dërgoje te çmimet/pagesat
      router.push(`/${lang}/pricing`);
    }
  };

  return (
    <main className="min-h-screen bg-white text-gray-900 pt-15">
      <Navbar lang={lang} dict={dict} />

      {/* Split Hero Section */}
      <section className="flex min-h-[85vh] items-center bg-gradient-to-br from-white via-green-50 to-white px-6 pt-24">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-12 lg:flex-row">
          <div className="flex-1 text-left">
            <span className="mb-4 inline-block rounded-full bg-green-100 px-4 py-1 text-sm font-bold uppercase tracking-widest text-green-700">
              Train smarter. Get stronger.
            </span>
            <h1 className="text-5xl font-extrabold leading-tight md:text-7xl">
              Build Your Best Body with <br />
              <span className="text-green-700">QRipped</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-gray-600">
              Choose a body part, follow clean workout plans, and improve your fitness step by step.
            </p>

            {/* Grupi i Butonave - Learn More */}
            <div className="flex justify-center lg:justify-start w-full pt-4">
              <Link
                href={`/${lang}/learn-more`}
                className="group inline-flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-[#0fa94a] to-[#0c8e3e] px-10 py-4 font-bold text-white shadow-xl shadow-[#0fa94a]/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#0fa94a]/35 w-full sm:w-auto text-lg min-w-[220px]"
              >
                <span>Learn More</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="w-5 h-5 transform transition-transform duration-200 group-hover:translate-x-1"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5l7.5 7.5-7.5 7.5M3 12h18" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Image/Graphic Placeholder */}
          <div className="hidden flex-1 lg:block">
            <div className="h-[500px] w-full rounded-3xl bg-green-100 shadow-inner"></div>
          </div>
        </div>
      </section>

      {/* Horizontal Category Cards */}
      <section id="categories" className="bg-white px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 border-b-2 border-green-50 pb-8 text-left">
            <h2 className="text-4xl font-bold text-gray-900">Choose Your Focus</h2>
            <p className="mt-2 text-gray-600">Target specific muscle groups to build your routine.</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {categories.map((item) => (
              <Link
                key={item.key}
                href={item.url}
                className="group flex cursor-pointer items-center gap-6 rounded-2xl border border-green-50 bg-white p-6 shadow-sm transition hover:border-green-700 hover:shadow-md"
              >
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-green-50 text-2xl transition group-hover:bg-green-700 group-hover:text-white">
                  💪
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-green-700">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-600">View sets, reps, and tips →</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Embedded CTA me Llogjikën e Abonimit */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-5xl rounded-3xl bg-green-700 px-6 py-16 text-center text-white shadow-xl">
          <h2 className="text-3xl font-bold md:text-4xl">Ready to get QRipped?</h2>
          <p className="mx-auto mt-4 max-w-lg text-green-100">
            Start today with simple workouts made for each body part.
          </p>
          
          <button 
            onClick={handleStartTraining}
            className="mt-8 rounded-full bg-white px-10 py-4 font-bold text-green-700 transition hover:bg-green-50 hover:shadow-lg cursor-pointer"
          >
            Start Training Now →
          </button>
        </div>
      </section>

      <Footer lang={lang} dict={dict} />
    </main>
  );
}