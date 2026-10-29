"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";

export default function UserPlanPage({ params }) {
  const resolvedParams = React.use(params);
  const lang = resolvedParams?.lang || "sq";
  const [clientData, setClientData] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem("qr_client_data");
    if (data) {
      setClientData(JSON.parse(data));
    }
  }, []);

  const isBulking = clientData?.goal !== "cutting";

  return (
    <div className="min-h-screen bg-[#f4fbf7] text-[#0f172a] font-sans antialiased flex flex-col justify-between">
      <Navbar lang={lang} />

      <main className="max-w-4xl mx-auto px-6 pt-32 pb-20 flex-1 w-full space-y-8">
        
        {/* Pjesa e Përshëndetjes dhe Profilit */}
        <div className="bg-white p-8 rounded-[28px] border border-gray-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <span className="inline-block bg-[#e2f7ec] text-[#0f763e] text-xs font-bold uppercase px-3.5 py-1.5 rounded-full tracking-wider mb-2">
              {isBulking ? "Plani: Shtim Mase Muskulore Paster" : "Plani: Humbje Peshe & Dhjami"}
            </span>
            <h1 className="text-3xl font-black tracking-tight">Përshëndetje, {clientData?.name || "Atlet"}! 🎯</h1>
            <p className="text-gray-500 text-sm mt-1">
              Për trupin tuaj ({clientData?.weight || 76} kg, {clientData?.height || 183} cm), ky është programi i saktë ushqimor.
            </p>
          </div>
          <div className="bg-[#f4fbf7] p-4 rounded-2xl border border-green-100 text-center">
            <span className="block text-xs text-gray-500 uppercase font-bold">Statusi i Dietës</span>
            <span className="text-lg font-black text-[#0f763e]">
              {isBulking ? "Suficit Kalorik (+)" : "Deficit Kalorik (-)"}
            </span>
          </div>
        </div>

        {/* Lista e Vakteve e Ndryshuar Sipas Qëllimit */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold tracking-tight">Vaktet Ditore & Gramatura e Saktë</h2>

          {/* Vakti 1 */}
          <div className="bg-white p-6 md:p-8 rounded-[24px] border border-gray-200 shadow-sm space-y-4">
            <div className="flex justify-between items-center border-b border-gray-100 pb-4">
              <h3 className="text-lg font-bold text-[#0f763e]">Vakti 1: Mëngjesi</h3>
              <span className="bg-gray-100 text-gray-700 font-semibold text-xs px-3 py-1 rounded-full">08:00 - 08:30</span>
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-700">
              <li className="bg-gray-50 p-3 rounded-xl border border-gray-100 flex justify-between">
                <span>🥣 Tërshërë (Oats)</span>
                <strong className="text-[#0f172a]">{isBulking ? "100 gram" : "50 gram"}</strong>
              </li>
              <li className="bg-gray-50 p-3 rounded-xl border border-gray-100 flex justify-between">
                <span>🥛 Qumësht ose Shkumë Bajamesh</span>
                <strong className="text-[#0f172a]">{isBulking ? "300 ml" : "200 ml (pa yndyrë)"}</strong>
              </li>
              <li className="bg-gray-50 p-3 rounded-xl border border-gray-100 flex justify-between">
                <span>🍌 Banane ose Fruta pylli</span>
                <strong className="text-[#0f172a]">{isBulking ? "1 copë e madhe (150g)" : "1 copë e vogël (80g)"}</strong>
              </li>
              <li className="bg-gray-50 p-3 rounded-xl border border-gray-100 flex justify-between">
                <span>🥚 Vezë të ziera (Të plota + Të bardha)</span>
                <strong className="text-[#0f172a]">{isBulking ? "2 të plota + 2 të bardha" : "1 e plotë + 3 të bardha"}</strong>
              </li>
            </ul>
          </div>

          {/* Vakti 2 */}
          <div className="bg-white p-6 md:p-8 rounded-[24px] border border-gray-200 shadow-sm space-y-4">
            <div className="flex justify-between items-center border-b border-gray-100 pb-4">
              <h3 className="text-lg font-bold text-[#0f763e]">Vakti 2: Dreka</h3>
              <span className="bg-gray-100 text-gray-700 font-semibold text-xs px-3 py-1 rounded-full">13:30 - 14:00</span>
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-700">
              <li className="bg-gray-50 p-3 rounded-xl border border-gray-100 flex justify-between">
                <span>🥩 Gjoks Pule ose Viç i zier</span>
                <strong className="text-[#0f172a]">{isBulking ? "220 gram" : "180 gram"}</strong>
              </li>
              <li className="bg-gray-50 p-3 rounded-xl border border-gray-100 flex justify-between">
                <span>🍚 Oriz Basmati ose Patate e ëmbël</span>
                <strong className="text-[#0f172a]">{isBulking ? "180 gram (i peshuar i gjallë)" : "90 gram (i peshuar i gjallë)"}</strong>
              </li>
              <li className="bg-gray-50 p-3 rounded-xl border border-gray-100 flex justify-between">
                <span>🥗 Sallatë e gjelbër (lakër, kastravec, domate)</span>
                <strong className="text-[#0f172a]">Sasi e pakufizuar</strong>
              </li>
              <li className="bg-gray-50 p-3 rounded-xl border border-gray-100 flex justify-between">
                <span>🫒 Vaj Ulliri</span>
                <strong className="text-[#0f172a]">{isBulking ? "15 ml (1 lugë gjelle)" : "5 ml (1 lugë çaji)"}</strong>
              </li>
            </ul>
          </div>

          {/* Vakti 3 */}
          <div className="bg-white p-6 md:p-8 rounded-[24px] border border-gray-200 shadow-sm space-y-4">
            <div className="flex justify-between items-center border-b border-gray-100 pb-4">
              <h3 className="text-lg font-bold text-[#0f763e]">Vakti 3: Pasdite (Para/Pas Stërvitjes)</h3>
              <span className="bg-gray-100 text-gray-700 font-semibold text-xs px-3 py-1 rounded-full">17:30 - 18:00</span>
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-700">
              <li className="bg-gray-50 p-3 rounded-xl border border-gray-100 flex justify-between">
                <span>🥤 Whey Protein (Proteinë hirre)</span>
                <strong className="text-[#0f172a]">35 gram (1 masë)</strong>
              </li>
              <li className="bg-gray-50 p-3 rounded-xl border border-gray-100 flex justify-between">
                <span>🍏 Mollë e gjelbër ose Oriz i fryrë (Rice Cakes)</span>
                <strong className="text-[#0f172a]">{isBulking ? "4 feta oriz i fryrë" : "1 mollë mesatare"}</strong>
              </li>
            </ul>
          </div>

          {/* Vakti 4 */}
          <div className="bg-white p-6 md:p-8 rounded-[24px] border border-gray-200 shadow-sm space-y-4">
            <div className="flex justify-between items-center border-b border-gray-100 pb-4">
              <h3 className="text-lg font-bold text-[#0f763e]">Vakti 4: Darka</h3>
              <span className="bg-gray-100 text-gray-700 font-semibold text-xs px-3 py-1 rounded-full">21:00 - 21:30</span>
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-700">
              <li className="bg-gray-50 p-3 rounded-xl border border-gray-100 flex justify-between">
                <span>🐟 Peshk Salmon ose Fileto Deti (Gjoks Pule)</span>
                <strong className="text-[#0f172a]">{isBulking ? "200 gram" : "180 gram (pa yndyrë)"}</strong>
              </li>
              <li className="bg-gray-50 p-3 rounded-xl border border-gray-100 flex justify-between">
                <span>🥦 Brokoli, Spinaq ose Lulelakër të ziera</span>
                <strong className="text-[#0f172a]">300 gram (fibër e lartë)</strong>
              </li>
              <li className="bg-gray-50 p-3 rounded-xl border border-gray-100 flex justify-between">
                <span>🧀 Gjizë ose Kos pa yndyrë (Kaseinë para gjumit)</span>
                <strong className="text-[#0f172a]">150 gram</strong>
              </li>
            </ul>
          </div>

        </div>

        <div className="text-center pt-4">
          <Link href={`/${lang}`} className="inline-block bg-[#0fa94a] hover:bg-[#0c8e3e] text-white font-bold px-8 py-4 rounded-xl shadow-lg shadow-[#0fa94a]/20 transition duration-200">
            Kthehu te Faqja Kryesore
          </Link>
        </div>

      </main>

      <Footer lang={lang} />
    </div>
  );
}