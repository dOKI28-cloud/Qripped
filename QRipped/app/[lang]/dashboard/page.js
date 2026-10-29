"use client";
import React from "react";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";

export default function DashboardPage({ params }) {
  const resolvedParams = React.use(params);
  const lang = resolvedParams?.lang || "sq";

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans antialiased flex flex-col justify-between">
      <Navbar lang={lang} />
      <main className="max-w-4xl mx-auto px-6 pt-36 pb-24 flex-1 w-full">
        <h1 className="text-3xl font-black mb-4">Llogaria Jote</h1>
        <p className="text-slate-400 text-sm">Këtu mund të menaxhosh planet dhe ushtrimet e tua.</p>
      </main>
      <Footer lang={lang} />
    </div>
  );
}