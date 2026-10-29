"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../../../components/navbar";
import Footer from "../../../components/footer";

export default function SuccessPage({ params }) {
  const resolvedParams = React.use(params);
  const lang = resolvedParams?.lang || "sq";
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const handleFinalSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const clientData = {
      name: e.target.name.value,
      email: e.target.email.value,
      goal: e.target.goal.value, // "bulking" (masë) ose "cutting" (humbje peshe)
      age: e.target.age.value,
      weight: e.target.weight.value,
      height: e.target.height.value,
      notes: e.target.notes.value,
    };

    try {
      const res = await fetch("/api/save-client-data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(clientData),
      });

      if (res.ok) {
        localStorage.setItem("qr_client_data", JSON.stringify(clientData));
        router.push(`/${lang}/plan`);
      } else {
        alert("Gabim në ruajtjen e të dhënave.");
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f4fbf7] text-[#0f172a] font-sans antialiased flex flex-col justify-between">
      <Navbar lang={lang} />

      <main className="max-w-xl mx-auto px-6 pt-32 pb-20 flex-1 w-full">
        <div className="bg-white p-8 md:p-10 rounded-[28px] border border-gray-200 shadow-sm space-y-6">
          <div className="text-center space-y-2">
            <span className="inline-block bg-[#e2f7ec] text-[#0f763e] text-xs font-bold uppercase px-3.5 py-1.5 rounded-full tracking-wider">
              Pagesa u konfirmua!
            </span>
            <h1 className="text-2xl font-black tracking-tight">Zgjidh Qëllimin & Të Dhënat Tona</h1>
            <p className="text-gray-500 text-xs font-medium">Na trego çfarë dëshiron të arrish që të personalizojmë planin ushqimor.</p>
          </div>

          <form onSubmit={handleFinalSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">Qëllimi yt kryesor</label>
              <select required name="goal" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#0fa94a] font-medium">
                <option value="bulking">💪 Shtim Mase Muskulore Paster (Clean Bulk)</option>
                <option value="cutting">🔥 Humbje Peshe & Dhjami (Cutting / Dobësim)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">Emri Mbiemri</label>
              <input required name="name" type="text" placeholder="Jon Smith" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#0fa94a]" />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">Email Adresa</label>
              <input required name="email" type="email" placeholder="jon@example.com" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#0fa94a]" />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">Mosha</label>
                <input required name="age" type="number" placeholder="22" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#0fa94a]" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">Pesha (kg)</label>
                <input required name="weight" type="number" placeholder="76" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#0fa94a]" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">Gjatësia (cm)</label>
                <input required name="height" type="number" placeholder="183" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#0fa94a]" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">Alergji ose Shënime (Opsionale)</label>
              <textarea name="notes" rows="2" placeholder="p.sh. pa laktozë..." className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#0fa94a]"></textarea>
            </div>

            <button type="submit" disabled={loading} className="w-full bg-[#0fa94a] hover:bg-[#0c8e3e] text-white font-bold py-4 rounded-xl shadow-lg shadow-[#0fa94a]/20 transition duration-200 cursor-pointer mt-4">
              {loading ? "Duke gjeneruar planin..." : "Gjenero Planin e Personalizuar →"}
            </button>
          </form>
        </div>
      </main>

      <Footer lang={lang} />
    </div>
  );
}