"use client";

import React, { useState } from "react";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import { createClient } from "@/utils/supabase/client";
import Swal from "sweetalert2";
import confetti from "canvas-confetti";

export default function ContactClient({ lang, dict }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const supabase = createClient();

    const { error: dbError } = await supabase.from("messages").insert([
      {
        full_name: formData.name,
        email: formData.email,
        message: formData.message,
      },
    ]);

    if (dbError) {
      Swal.fire({
        title: "DATABASE ERROR",
        text: dbError.message,
        icon: "error",
        confirmButtonColor: "#003d29",
        background: "#fcfcfc",
        color: "#003d29",
      });
      setLoading(false);
      return;
    }

    try {
      const emailResponse = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      if (emailResponse.ok) {
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#00a859", "#003d29", "#ffffff"],
        });

        Swal.fire({
          title: dict?.contact?.alert_success_title || "TRANSMISSION SUCCESSFUL!",
          text: dict?.contact?.alert_success_text || "Your message has been secured and sent to the HQ.",
          icon: "success",
          background: "#fcfcfc",
          color: "#003d29",
          confirmButtonColor: "#00a859",
          confirmButtonText: "OK",
        });

        setFormData({ name: "", email: "", message: "" });
      }
    } catch (err) {
      console.error("Email error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfcfc] text-[#003d29] font-sans selection:bg-[#00a859] selection:text-white overflow-x-hidden">
      <Navbar lang={lang} dict={dict} />

      {/* Background Decor */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-[15%] -right-[10%] w-[300px] h-[300px] md:w-[600px] md:h-[600px] rounded-full bg-[#00a859]/5 blur-[80px] md:blur-[120px]"></div>
        <div className="absolute bottom-[5%] -left-[10%] w-[250px] h-[250px] md:w-[500px] md:h-[500px] rounded-full bg-[#003d29]/5 blur-[80px] md:blur-[120px]"></div>
      </div>

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-28">
        {/* Header */}
        <div className="text-center md:text-left mb-12 md:mb-20">
          <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-[#00a859]/10 border border-[#00a859]/20">
            <span className="text-[#00a859] text-[10px] md:text-xs font-bold uppercase tracking-[0.2em]">
              {dict?.contact?.badge || "Contact Us"}
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9] uppercase italic text-[#003d29]">
            {dict?.contact?.title || "Ready for the"}{" "}
            <br className="hidden sm:block" />
            <span className="text-[#00a859]">
              {dict?.contact?.title_green || "Challenge?"}
            </span>
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 italic text-[#003d29]">
          {/* LEFT COLUMN: Info Cards */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {/* Email Card */}
            <div className="bg-white p-6 md:p-8 rounded-[2rem] border border-slate-100 shadow-sm">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">
                {dict?.contact?.email_label || "Official Email"}
              </h3>
              <p className="text-lg md:text-l font-extrabold truncate uppercase">
                qripped.contact@gmail.com
              </p>
            </div>

            {/* Location Card */}
            <a
              href="https://www.google.com/maps/place/Gostivar"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white p-6 md:p-8 rounded-[2rem] border-2 border-[#00a859]/10 shadow-lg min-h-[160px] flex flex-col justify-end transition-all duration-300 hover:bg-[#003d29] hover:border-[#003d29] group"
            >
              <h3 className="text-[#00a859] text-[10px] font-black uppercase tracking-widest mb-1 transition-colors duration-300 group-hover:text-white">
                {dict?.contact?.location_label || "Location"}
              </h3>
              <p className="text-2xl md:text-3xl font-black leading-tight uppercase transition-colors duration-300 group-hover:text-white">
                {dict?.contact?.location_value || "Gostivar, North Macedonia"}
              </p>
            </a>

            {/* ABOUT US CARD */}
            <div className="bg-white p-6 md:p-8 rounded-[2rem] border-2 border-[#00a859]/10 shadow-lg min-h-[160px] flex flex-col justify-between">
              <div>
                <h3 className="text-[#00a859] text-[10px] font-black uppercase tracking-widest mb-2">
                  {dict?.contact?.about_title || "About QRIPPED"}
                </h3>
                <p className="text-[11px] font-bold uppercase leading-relaxed text-slate-500">
                  {dict?.contact?.about_desc ||
                    "A high-performance training matrix designed to eliminate guesswork. Scan the machines, get the protocols, and dominate your workout."}
                </p>
              </div>
              <div className="flex items-center gap-2 mt-4">
                <div className="h-1 w-8 bg-[#00a859] rounded-full"></div>
                <span className="text-[9px] font-black uppercase tracking-tighter italic text-[#003d29]">
                  {dict?.contact?.about_tag || "The Future of Fitness"}
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Form */}
          <div className="lg:col-span-8 bg-white p-6 sm:p-10 md:p-14 rounded-[2.5rem] md:rounded-[3.5rem] border border-slate-50 shadow-2xl text-[#003d29]">
            <h2 className="text-2xl md:text-3xl font-black uppercase mb-8 md:mb-12 tracking-tight">
              {dict?.contact?.form_title || "Send a Message"}
            </h2>

            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 italic"
            >
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">
                  {dict?.contact?.name_label || "Full Name"}
                </label>
                <input
                  type="text"
                  required
                  placeholder={
                    dict?.contact?.name_placeholder || "JOHN DOE"
                  }
                  className="w-full bg-slate-50 border-none rounded-xl px-6 py-4 focus:ring-2 focus:ring-[#00a859] font-bold text-[#003d29]"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">
                  {dict?.contact?.email_label || "Email Address"}
                </label>
                <input
                  type="email"
                  required
                  placeholder={
                    dict?.contact?.email_placeholder || "USER@QRIPPED.COM"
                  }
                  className="w-full bg-slate-50 border-none rounded-xl px-6 py-4 focus:ring-2 focus:ring-[#00a859] font-bold text-[#003d29]"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>

              <div className="md:col-span-2 space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">
                  {dict?.contact?.msg_label || "Your Message"}
                </label>
                <textarea
                  rows="4"
                  required
                  placeholder={
                    dict?.contact?.msg_placeholder || "HOW CAN WE HELP YOU?"
                  }
                  className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-[#00a859] font-bold resize-none text-[#003d29]"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                ></textarea>
              </div>

              <div className="md:col-span-2">
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full ${
                    loading
                      ? "bg-slate-400 animate-pulse cursor-not-allowed"
                      : "bg-[#00a859] hover:bg-[#003d29]"
                  } py-5 rounded-2xl text-white font-black uppercase text-xl transition-all shadow-lg active:scale-95`}
                >
                  {loading
                    ? dict?.contact?.btn_loading || "Transmitting..."
                    : dict?.contact?.btn_send || "Send Transmission"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      <Footer lang={lang} dict={dict} />
    </div>
  );
}