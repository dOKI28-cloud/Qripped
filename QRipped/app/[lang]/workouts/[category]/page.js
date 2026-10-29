"use client";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { workoutData } from "@/data/workouts";

export default function CategoryPage() {
  const params = useParams();
  const categoryName = params.category;

  // LOGJIKA E RE: Nëse kategoria është 'all', merr të gjithë listën, 
  // përndryshe filtro sipas emrit të kategorisë.
  const filteredWorkouts = categoryName?.toLowerCase() === "all" 
    ? workoutData 
    : workoutData.filter((w) => w.category === categoryName?.toLowerCase());

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-6 italic">
      <div className="max-w-xl mx-auto">
        
        {/* Headeri i faqes */}
        <div className="mb-10 pt-10">
          <Link href="/" className="text-[#00a859] text-[10px] font-black uppercase mb-2 inline-block hover:underline">
            ← Return to Dashboard
          </Link>
          <h1 className="text-4xl font-black uppercase italic leading-none">
            {/* Shfaq "All" ose emrin e kategorisë */}
            {categoryName} <span className="text-[#00a859]">Protocol</span>
          </h1>
          <div className="h-1 w-20 bg-[#00a859] mt-2"></div>
          <p className="text-slate-400 mt-4 font-bold uppercase text-xs tracking-widest">
            {categoryName?.toLowerCase() === "all" 
              ? "Global_Matrix_Access" 
              : `Sector_${categoryName}_Unlocked`}
          </p>
        </div>

        {/* Grid-i i ushtrimeve */}
        <div className="grid grid-cols-2 gap-4">
          {filteredWorkouts.length > 0 ? (
            filteredWorkouts.map((workout) => (
              <Link key={workout.id} href={`/exercise/${workout.id}`}>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative bg-[#151515] rounded-[2rem] overflow-hidden border border-white/5 hover:border-[#00a859]/50 transition-all shadow-2xl cursor-pointer"
                >
                  {/* Image Container */}
                  <div className="relative h-48 bg-black overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#151515] via-transparent to-transparent z-10"></div>
                    <img 
                      src={workout.image} 
                      className="w-full h-full object-cover opacity-60 group-hover:scale-110 group-hover:opacity-100 transition-all duration-700" 
                      alt={workout.name}
                    />
                    
                    {/* Type Badge */}
                    <span className="absolute top-4 left-4 z-20 bg-white/10 backdrop-blur-md text-white text-[8px] px-2 py-1 rounded font-black uppercase italic border border-white/10">
                      {workout.type}
                    </span>

                    {/* Play Icon on Hover */}
                    <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                       <div className="bg-[#00a859] p-3 rounded-full shadow-[0_0_20px_rgba(0,168,89,0.5)]">
                          <span className="text-white text-xl">▶</span>
                       </div>
                    </div>
                  </div>

                  {/* Teksti i ushtrimit */}
                  <div className="p-5 relative z-20">
                    <h3 className="font-black uppercase text-[11px] leading-tight group-hover:text-[#00a859] transition-colors tracking-tighter">
                      {workout.name}
                    </h3>
                    <div className="mt-3 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#00a859] animate-pulse"></div>
                      <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">Video Active</span>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))
          ) : (
            <div className="col-span-2 py-20 text-center border-2 border-dashed border-white/5 rounded-3xl">
              <p className="text-slate-600 font-black uppercase italic">No data found in {categoryName} sector.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}