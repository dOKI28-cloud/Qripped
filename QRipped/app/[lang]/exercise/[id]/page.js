"use client";
import { useParams, useRouter } from "next/navigation"; // Shto useRouter
import Link from "next/link";
import { motion } from "framer-motion";
import { workoutData } from "@/data/workouts";

export default function ExerciseDetail() {
  const params = useParams();
  const router = useRouter(); // Inicializo router-in
  const { id } = params;

  const exercise = workoutData.find((item) => item.id === id);

  const displayName = exercise 
    ? exercise.name 
    : id?.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-6 italic font-sans selection:bg-[#00a859] selection:text-black">
      <div className="max-w-xl mx-auto pt-10">
        
        {/* Header Navigation */}
        <div className="flex justify-between items-center mb-6">
          {/* NDRYSHIMI KËTU: Përdorim buton në vend të Link për kthim dinamik */}
          <button 
            onClick={() => router.back()} 
            className="text-[#00a859] text-[10px] font-black uppercase tracking-tighter hover:opacity-70 transition-opacity bg-transparent border-none cursor-pointer p-0 italic"
          >
            ← Back to Protocol
          </button>
          <span className="text-[10px] text-white/30 font-mono uppercase">System_Active</span>
        </div>

        {/* ... pjesa tjetër e kodit mbetet e njëjtë ... */}
        
        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-black uppercase italic leading-[0.8] mb-2 tracking-tighter">
            {displayName}
          </h1>
          <div className="h-1.5 w-24 bg-[#00a859] mb-8 skew-x-[-20deg]"></div>
        </motion.div>

        {/* Video Player */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative w-full aspect-video bg-[#111] rounded-[2rem] overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,168,89,0.1)]"
        >
          <video 
            key={id} 
            src={`/videos/${id}.mp4`} 
            controls 
            autoPlay 
            muted 
            loop
            className="w-full h-full object-cover"
            playsInline 
          >
            Your browser does not support the video tag.
          </video>
        </motion.div>

        {/* Technical Data Grid */}
        <div className="mt-8 grid grid-cols-2 gap-4">
          <div className="bg-[#151515] p-5 rounded-2xl border border-white/5 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1 h-full bg-[#00a859] opacity-100"></div>
            <h4 className="text-[#00a859] text-[10px] font-black uppercase mb-1 tracking-widest">Protocol_ID</h4>
            <p className="text-sm font-bold uppercase truncate italic">{id}</p>
          </div>
          
          <div className="bg-[#151515] p-5 rounded-2xl border border-white/5 relative overflow-hidden">
            <h4 className="text-[#00a859] text-[10px] font-black uppercase mb-1 tracking-widest">Category</h4>
            {/* Shfaqim kategorinë dinamike këtu */}
            <p className="text-sm font-bold uppercase truncate italic text-white/70">
              {exercise?.category || "General"}
            </p>
          </div>
        </div>

        {/* Target Muscles */}
        <div className="mt-4 bg-[#151515] p-5 rounded-2xl border border-white/5">
          <h4 className="text-[#00a859] text-[10px] font-black uppercase mb-3 tracking-widest">Target_Muscles</h4>
          <div className="flex flex-wrap gap-2">
            {exercise?.muscles ? (
              exercise.muscles.map((muscle, index) => (
                <span key={index} className="bg-white/5 border border-white/10 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-slate-300">
                  {muscle}
                </span>
              ))
            ) : (
              <span className="text-[10px] text-white/20 uppercase">Data_Not_Available</span>
            )}
          </div>
        </div>

        {/* Execution Tips */}
        <div className="mt-4 bg-[#151515] p-5 rounded-2xl border border-white/5">
          <h4 className="text-[#00a859] text-[10px] font-black uppercase mb-2 tracking-widest">Execution_Tips</h4>
          <ul className="text-[13px] text-white/60 space-y-2 font-medium not-italic">
            <li className="flex gap-2"><span>•</span> Keep your core engaged throughout the movement.</li>
            <li className="flex gap-2"><span>•</span> Focus on the mind-muscle connection.</li>
            <li className="flex gap-2"><span>•</span> Control the tempo, especially on the eccentric phase.</li>
          </ul>
        </div>

        {/* Safety Warning */}
        <div className="mt-4 bg-[#ff3e3e]/5 p-4 rounded-2xl border border-[#ff3e3e]/20">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-1.5 h-1.5 rounded-full bg-[#ff3e3e] animate-pulse"></div>
            <h4 className="text-[#ff3e3e] text-[10px] font-black uppercase tracking-widest">Safety_Alert</h4>
          </div>
          <p className="text-[11px] text-slate-400 leading-tight not-italic">
            If you feel sharp pain, stop immediately. Ensure your form matches the video before increasing weight.
          </p>
        </div>

        {/* Footer */}
        <div className="mt-16 pb-10 text-center opacity-20">
          <p className="text-[9px] font-black uppercase tracking-[0.5em]">
            QRipped // Instructional_Matrix_v1.0
          </p>
        </div>

      </div>
    </div>
  );
}