"use client";
import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
 
export default function Navbar({ lang = "sq", dict }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [langPos, setLangPos] = useState({ top: 0, right: 0 });
  const [activeSection, setActiveSection] = useState("home");
  
  const pathname = usePathname();
  const router = useRouter();
  const langRef = useRef(null);
  const langBtnRef = useRef(null);
 
  const languages = [
    { code: "sq", label: "Shqip" },
    { code: "en", label: "English" },
    { code: "tr", label: "Türkçe" },
  ];
 
  const navLinks = [
    { id: "home", href: `/${lang}`, label: dict?.nav?.home || "Dashboard" },
    { id: "workouts", href: `/${lang}#categories`, label: dict?.nav?.workouts || "Workouts" },
    { id: "contact", href: `/${lang}/contact`, label: dict?.nav?.contact || "Contact" },
  ];
 
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!pathname.endsWith(`/${lang}`) && !pathname.endsWith(`/${lang}/`)) return;

    const handleScroll = () => {
      const categoriesSection = document.getElementById("categories");
      if (!categoriesSection) return;

      const rect = categoriesSection.getBoundingClientRect();
      if (rect.top <= 250 && rect.bottom >= 250) {
        setActiveSection("workouts");
      } else {
        setActiveSection("home");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname, lang]);
 
  const handleLanguageChange = (newLang) => {
    console.log("Language changed to:", newLang);
    if (!pathname) return;
    const segments = pathname.split("/");
    segments[1] = newLang;
    router.push(segments.join("/"));
    setLangDropdownOpen(false);
    setMobileMenuOpen(false);
  };
 
  const openLangDropdown = () => {
    if (langBtnRef.current) {
      const rect = langBtnRef.current.getBoundingClientRect();
      setLangPos({
        top: rect.bottom + 10,
        right: window.innerWidth - rect.right,
      });
    }
    setLangDropdownOpen((v) => !v);
    setMobileMenuOpen(false);
  };
 
  useEffect(() => {
    function handleClickOutside(e) {
      if (
        langRef.current &&
        !langRef.current.contains(e.target) &&
        !e.target.closest("[data-lang-portal]")
      ) {
        setLangDropdownOpen(false);
      }
    }
    document.addEventListener("pointerdown", handleClickOutside);
    return () => document.removeEventListener("pointerdown", handleClickOutside);
  }, []);
 
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);
 
  return (
    <header className="fixed top-0 left-0 w-full z-[100] bg-[#050505]/80 backdrop-blur-xl border-b border-white/5 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-20 flex items-center justify-between relative">
 
        {/* Logo */}
        <Link
          href={`/${lang}`}
          className="flex items-center gap-3 group relative py-2"
          onClick={() => {
            console.log("Logo clicked");
            setMobileMenuOpen(false);
          }}
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-[#00a859]/40 to-emerald-600/0 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition duration-500"></div>
          <svg width="36" height="36" viewBox="0 0 34 34" className="shrink-0 relative z-10 transition-transform duration-300 group-hover:scale-105">
            <rect width="34" height="34" rx="10" fill="#0f2027" className="stroke-white/10 stroke-1" />
            <text x="17" y="24" textAnchor="middle" fontSize="17" fontWeight="900" fontStyle="italic" fill="#ffffff" fontFamily="Arial, sans-serif">Q</text>
            <path d="M13 8 L16 13 L12 17 L16 21 L12 26" fill="none" stroke="#00a859" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="text-xl md:text-2xl font-black italic tracking-tighter text-white relative z-10">
            QR<span className="text-[#00a859] drop-shadow-[0_0_12px_rgba(0,168,89,0.5)]">IPPED</span>
          </span>
        </Link>
 
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 bg-white/[0.03] border border-white/10 px-3 py-1.5 rounded-full shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] backdrop-blur-md">
          {navLinks.map((link) => {
            const isHomeActive = link.id === "home" && pathname === `/${lang}` && activeSection === "home";
            const isWorkoutsActive = link.id === "workouts" && (activeSection === "workouts" || pathname.includes("/workouts"));
            const isOtherActive = link.id !== "home" && link.id !== "workouts" && pathname.startsWith(link.href);
            
            const isActive = isHomeActive || isWorkoutsActive || isOtherActive;

            return (
              <Link 
                key={link.href} 
                href={link.href} 
                onClick={() => {
                  console.log("Desktop link clicked:", link.label);
                  if (link.id === "workouts") setActiveSection("workouts");
                  if (link.id === "home") setActiveSection("home");
                }}
                className={`relative px-4 py-2 text-[11px] font-black uppercase tracking-wider transition-all duration-300 rounded-full ${
                  isActive ? "text-black bg-[#00a859] shadow-[0_0_20px_rgba(0,168,89,0.4)]" : "text-slate-300 hover:text-white hover:bg-white/5"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
 
        {/* Right Action Area */}
        <div className="flex items-center gap-3">
          
          <div ref={langRef} className="relative">
            <button
              ref={langBtnRef}
              onClick={openLangDropdown}
              type="button"
              aria-expanded={langDropdownOpen}
              className="bg-white/5 border border-white/10 text-white text-[11px] font-black uppercase px-4 py-2.5 rounded-xl flex items-center gap-2.5 hover:border-[#00a859]/50 hover:bg-white/[0.08] active:scale-95 transition-all cursor-pointer touch-manipulation shadow-lg group"
            >
              <span className="w-2 h-2 rounded-full bg-[#00a859] shadow-[0_0_8px_#00a859]"></span>
              <span className="tracking-wide">{lang.toUpperCase()}</span>
              <span className={`text-[9px] text-slate-400 group-hover:text-white transition-transform duration-300 ${langDropdownOpen ? "rotate-180" : ""}`}>▼</span>
            </button>
          </div>
 
          {/* Mobile Menu Button */}
          <button
            onClick={() => {
              console.log("Mobile hamburger menu toggled, current state:", !mobileMenuOpen);
              setMobileMenuOpen((v) => !v);
              setLangDropdownOpen(false);
            }}
            type="button"
            aria-label="Toggle Menu"
            aria-expanded={mobileMenuOpen}
            className="md:hidden text-white bg-white/5 border border-white/10 rounded-xl hover:border-[#00a859]/50 active:scale-95 transition-all cursor-pointer touch-manipulation flex items-center justify-center w-11 h-11 relative group"
          >
            <div className="absolute inset-0 bg-[#00a859]/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <span className="relative w-5 h-4 flex flex-col justify-between z-10">
              <span className={`block h-[2px] w-full bg-current rounded-full transition-all duration-300 origin-center ${mobileMenuOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
              <span className={`block h-[2px] w-3/4 ml-auto bg-current rounded-full transition-all duration-200 ${mobileMenuOpen ? "opacity-0 translate-x-3" : "opacity-100"}`} />
              <span className={`block h-[2px] w-full bg-current rounded-full transition-all duration-300 origin-center ${mobileMenuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
            </span>
          </button>
        </div>
      </div>
 
      {/* Portals për Dropdown & Mobile Menu */}
      {mounted && createPortal(
        <>
          {/* Language Dropdown */}
          {langDropdownOpen && (
            <div
              data-lang-portal
              style={{ position: "fixed", top: langPos.top, right: langPos.right, zIndex: 9999 }}
              className="w-40 bg-[#0a0a0a]/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden p-1.5 animate-[dropIn_0.2s_cubic-bezier(0.16,1,0.3,1)]"
            >
              {languages.map((l) => (
                <button
                  key={l.code}
                  onClick={() => handleLanguageChange(l.code)}
                  type="button"
                  className={`w-full text-left px-3.5 py-2.5 text-[11px] font-black uppercase tracking-wider rounded-xl transition-all duration-200 flex items-center justify-between cursor-pointer touch-manipulation ${
                    lang === l.code
                      ? "bg-[#00a859] text-black shadow-[0_0_15px_rgba(0,168,89,0.4)]"
                      : "text-slate-300 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <span>{l.label}</span>
                  {lang === l.code && <span className="font-bold text-xs">✓</span>}
                </button>
              ))}
            </div>
          )}
 
          {/* Mobile Fullscreen Immersive Drawer */}
          <div
            style={{ zIndex: 9998 }}
            className={`md:hidden fixed inset-0 transition-all duration-300 ${
              mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            }`}
          >
            <div
              className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity"
              onClick={() => {
                console.log("Backdrop clicked, closing mobile menu");
                setMobileMenuOpen(false);
              }}
            />
            
            <div
              className={`absolute top-0 right-0 h-full w-[88%] max-w-sm bg-gradient-to-b from-[#0e0e0e] via-[#080808] to-[#030303] border-l border-white/10 pt-24 px-6 flex flex-col justify-between shadow-[-25px_0_60px_rgba(0,0,0,0.95)] transition-transform duration-300 ease-out ${
                mobileMenuOpen ? "translate-x-0" : "translate-x-full"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5 px-1">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#00a859] animate-pulse"></span>
                    <span className="text-[11px] font-black tracking-widest text-slate-400 uppercase">Menuja Kryesore</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-600">QRIPPED v2.0</span>
                </div>

                {/* Nav Links në Telefon */}
                <div className="flex flex-col gap-3">
                  {navLinks.map((link) => {
                    const isHomeActive = link.id === "home" && pathname === `/${lang}` && activeSection === "home";
                    const isWorkoutsActive = link.id === "workouts" && (activeSection === "workouts" || pathname.includes("/workouts"));
                    const isOtherActive = link.id !== "home" && link.id !== "workouts" && pathname.startsWith(link.href);
                    const isActive = isHomeActive || isWorkoutsActive || isOtherActive;

                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={(e) => {
                          console.log("MOBILE LINK CLICKED:", link.label, "-> Navigating to:", link.href);
                          setMobileMenuOpen(false);
                          if (link.id === "workouts") setActiveSection("workouts");
                          if (link.id === "home") setActiveSection("home");
                        }}
                        className={`group flex items-center justify-between text-sm font-black uppercase tracking-wider py-4 px-5 rounded-2xl border transition-all duration-200 cursor-pointer touch-manipulation active:scale-[0.98] ${
                          isActive 
                            ? "bg-[#00a859]/15 border-[#00a859]/40 text-[#00a859] shadow-[0_0_20px_rgba(0,168,89,0.15)]" 
                            : "bg-white/[0.02] border-white/5 text-slate-200 hover:bg-white/[0.06] hover:border-white/10 hover:text-white"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className={`w-1.5 h-1.5 rounded-full transition-colors ${isActive ? "bg-[#00a859]" : "bg-slate-600 group-hover:bg-slate-400"}`}></span>
                          <span>{link.label}</span>
                        </div>
                        <span className={`text-xs transition-transform duration-300 group-hover:translate-x-1 ${isActive ? "text-[#00a859]" : "text-slate-600"}`}>→</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
 
              <div className="pb-10">
                <div className="p-4 rounded-2xl bg-gradient-to-r from-white/[0.03] to-white/[0.01] border border-white/5 space-y-1.5">
                  <div className="text-[11px] uppercase tracking-widest text-[#00a859] font-black">
                    Train smarter.
                  </div>
                  <div className="text-[10px] text-slate-400 font-medium">
                    Get stronger with QRipped daily routines.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>,
        document.body
      )}
 
      <style jsx global>{`
        @keyframes dropIn {
          from { opacity: 0; transform: translateY(-8px) scale(0.96); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </header>
  );
}