"use client";
import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function Footer({ lang = "sq", dict }) {
  const currentYear = new Date().getFullYear();
  
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("IDLE");
  const [showMatrixOptions, setShowMatrixOptions] = useState(false);

  const muscleGroups = [
    { id: "chest", label: dict?.workouts?.chestName || "Chest" },
    { id: "back", label: dict?.workouts?.backName || "Back" },
    { id: "legs", label: dict?.workouts?.legsName || "Legs" },
    { id: "abs", label: dict?.workouts?.absName || "Abs" },
    { id: "arms", label: dict?.workouts?.armsName || "Arms" },
    { id: "shoulders", label: dict?.workouts?.shouldersName || "Shoulders" },
  ];

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;

    setStatus("LOADING");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setStatus("SUCCESS");
        setEmail("");
        setTimeout(() => setStatus("IDLE"), 3000);
      } else {
        setStatus("ERROR");
      }
    } catch (err) {
      setStatus("ERROR");
    }
  };

  return (
    <footer className="w-full bg-[#050505] border-t border-white/5 pt-16 pb-8 px-4 md:px-8 mt-20 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-[#00a859] to-transparent opacity-50"></div>
      
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          
          {/* Brand Section */}
          <div className="flex flex-col">
            <h2 className="text-2xl font-black italic tracking-tighter text-white mb-4">
              QR<span className="text-[#00a859]">IPPED</span>
            </h2>
            <p className="text-[11px] text-slate-500 uppercase tracking-widest leading-relaxed italic max-w-[280px]">
              {dict?.footer?.tagline || "The ultimate instructional matrix for high-performance training. Scan. Execute. Dominate."}
            </p>
          </div>

          {/* Navigation Protocol */}
          <div className="flex flex-col">
            <h4 className="text-[#00a859] text-[10px] font-black uppercase mb-6 tracking-[0.3em]">
              {dict?.footer?.protocolTitle || "Protocol"}
            </h4>
            <ul className="space-y-4 text-[12px] font-bold uppercase italic text-slate-300">
              <li>
                <Link href={`/${lang}`} className="hover:text-white transition-colors">
                  {dict?.nav?.home || "Dashboard"}
                </Link>
              </li>
              
              <li className="flex flex-col items-start">
                <button 
                  type="button"
                  onClick={() => setShowMatrixOptions(!showMatrixOptions)}
                  className="hover:text-[#00a859] transition-colors uppercase flex items-center gap-2 cursor-pointer bg-transparent border-none outline-none py-1"
                >
                  {dict?.footer?.matrixTitle || "Workouts Matrix"}
                  <motion.span 
                    animate={{ rotate: showMatrixOptions ? 180 : 0 }}
                    className="text-[8px]"
                  >
                    ▼
                  </motion.span>
                </button>

                <AnimatePresence>
                  {showMatrixOptions && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0, marginTop: 0 }}
                      animate={{ opacity: 1, height: "auto", marginTop: 12 }}
                      exit={{ opacity: 0, height: 0, marginTop: 0 }}
                      className="flex flex-wrap gap-2 w-full overflow-hidden"
                    >
                      {muscleGroups.map((group) => (
                        <Link 
                          key={group.id}
                          href={`/${lang}/workouts/${group.id}`}
                          className="text-[9px] bg-white/5 border border-white/10 hover:border-[#00a859]/50 hover:bg-[#00a859] hover:text-black px-3 py-1.5 rounded-md transition-all font-black"
                        >
                          {group.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>

              <li>
                <Link href={`/${lang}/contact`} className="hover:text-white transition-colors">
                  {dict?.nav?.contact || "Contact Us"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Direct Line & Status Panel */}
          <div className="space-y-6">
            <div>
              <h4 className="text-[#00a859] text-[10px] font-black uppercase mb-4 tracking-[0.3em]">
                {dict?.footer?.directLineTitle || "Direct_Line"}
              </h4>
              <p className="text-[12px] font-bold uppercase italic text-white mb-2 break-all">
                qripped.contact@gmail.com
              </p>
              <p className="text-[9px] text-slate-500 uppercase tracking-tighter leading-tight italic">
                {dict?.footer?.directLineDesc || "Our neural network is currently offline for social media. Use direct email for inquiries."}
              </p>
            </div>

            <div className="bg-[#0a0a0a] border border-white/5 p-4 rounded-xl relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1 h-full bg-[#00a859] opacity-20 group-hover:opacity-100 transition-opacity"></div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-[#00a859] rounded-full animate-pulse"></div>
                <span className="text-[10px] font-black uppercase tracking-tighter text-white">
                  {dict?.footer?.systemStatus || "System Status: Online"}
                </span>
              </div>
              <p className="text-[8px] text-slate-600 font-mono uppercase leading-tight">
                Node_v16.2.4 // Turbopack_Active
              </p>
            </div>
          </div>
        </div>

        {/* Newsletter Integration */}
        <div className="mt-12 border-t border-white/5 pt-12">
          <div className="bg-[#0f0f0f] p-6 md:p-8 rounded-[2rem] border border-white/5 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
            <div className="max-w-md relative z-10 text-center md:text-left">
              <h3 className="text-xl font-black uppercase italic leading-none mb-2 text-[#00a859]">
                {dict?.footer?.newsletterTitle || "Join the QRipped"}
              </h3>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest leading-relaxed font-bold italic">
                {dict?.footer?.newsletterDesc || "Get the latest instructional protocols and gym hacks delivered directly to your inbox."}
              </p>
            </div>
            
            <form onSubmit={handleSubscribe} className="w-full md:w-auto flex flex-col sm:flex-row gap-3 relative z-10">
              <input 
                required
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={
                  status === "SUCCESS" 
                    ? (dict?.footer?.statusAccepted || "PROTOCOL_ACCEPTED") 
                    : (dict?.footer?.emailPlaceholder || "ENTER_EMAIL_ADDRESS")
                }
                disabled={status === "LOADING" || status === "SUCCESS"}
                className="bg-black border border-white/10 px-6 py-4 rounded-full text-[10px] font-bold uppercase italic focus:outline-none focus:border-[#00a859] focus:ring-1 focus:ring-[#00a859] transition-all w-full md:w-72 text-white disabled:opacity-50"
              />
              <button 
                type="submit"
                disabled={status === "LOADING" || status === "SUCCESS"}
                className={`w-full sm:w-auto px-10 py-4 rounded-full text-[10px] font-black uppercase italic transition-all shadow-[0_0_20px_rgba(0,168,89,0.2)] ${
                  status === "SUCCESS" 
                    ? "bg-white text-black" 
                    : "bg-[#00a859] text-black hover:bg-white hover:scale-105"
                } disabled:cursor-not-allowed`}
              >
                {status === "IDLE" && (dict?.footer?.subscribeBtn || "SUBSCRIBE")}
                {status === "LOADING" && (dict?.footer?.sendingBtn || "SENDING...")}
                {status === "SUCCESS" && (dict?.footer?.linkedBtn || "LINKED")}
                {status === "ERROR" && (dict?.footer?.tryAgainBtn || "TRY_AGAIN")}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-white/5 mt-12 gap-4 text-center md:text-left">
          <p className="text-[9px] font-black uppercase tracking-[0.4em] text-white/20">
            © {currentYear} QRIPPED // {dict?.footer?.rightsReserved || "All Rights Reserved"}
          </p>
          
          <div className="flex gap-8">
            <span className="text-[9px] font-black uppercase text-white/10 italic hover:text-white/40 cursor-pointer transition-colors">
              {dict?.footer?.privacy || "Privacy_Policy"}
            </span>
            <span className="text-[9px] font-black uppercase text-white/10 italic hover:text-white/40 cursor-pointer transition-colors">
              {dict?.footer?.terms || "Terms_of_Service"}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}