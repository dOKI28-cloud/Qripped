// data/workouts.js

export const workoutData = [
  // --- CHEST (Kraharori) ---
  { id: "barbell-bench-press", name: "Barbell Flat Bench Press", category: "chest", muscles: ["Chest", "Triceps", "Front Delts"], type: "Free Weights" },
  { id: "machine-chest-press", name: "Machine Chest Press", category: "chest", muscles: ["Chest", "Triceps"], type: "Machine" },
  { id: "incline-dumbbell-press", name: "Incline Dumbbell Press", category: "chest", muscles: ["Upper Chest", "Front Delts", "Triceps"], type: "Free Weights" },
  { id: "pec-deck-fly", name: "Pec Deck Fly", category: "chest", muscles: ["Chest"], type: "Machine" },
  { id: "cable-crossover", name: "Cable Crossover", category: "chest", muscles: ["Chest", "Front Delts"], type: "Cables" },
  { id: "decline-bench-press", name: "Decline Barbell Press", category: "chest", muscles: ["Lower Chest", "Triceps"], type: "Free Weights" },
  { id: "chest-dips", name: "Chest Dips", category: "chest", muscles: ["Lower Chest", "Triceps", "Front Delts"], type: "Bodyweight" },
  { id: "smith-machine-incline", name: "Smith Machine Incline Press", category: "chest", muscles: ["Upper Chest", "Triceps"], type: "Machine" },
  { id: "low-to-high-cable-fly", name: "Low-to-High Cable Fly", category: "chest", muscles: ["Upper Chest", "Front Delts"], type: "Cables" },

  // --- BACK (Shpina) ---
  { id: "lat-pulldown", name: "Lat Pulldown Machine", category: "back", muscles: ["Lats", "Biceps", "Upper Back"], type: "Machine" },
  { id: "barbell-row", name: "Barbell Overhand Row", category: "back", muscles: ["Lats", "Rhomboids", "Biceps"], type: "Free Weights" },
  { id: "seated-cable-row", name: "Seated Cable Row", category: "back", muscles: ["Mid Back", "Lats", "Biceps"], type: "Machine" },
  { id: "one-arm-db-row", name: "One Arm Dumbbell Row", category: "back", muscles: ["Lats", "Lower Back"], type: "Free Weights" },
  { id: "pull-ups", name: "Pull Ups", category: "back", muscles: ["Lats", "Biceps", "Forearms"], type: "Bodyweight" },
  { id: "deadlift", name: "Conventional Deadlift", category: "back", muscles: ["Lower Back", "Hamstrings", "Glutes", "Traps"], type: "Free Weights" },
  { id: "t-bar-row", name: "T-Bar Row", category: "back", muscles: ["Upper Back", "Lats", "Biceps"], type: "Machine" },
  { id: "hyperextensions", name: "Hyperextensions", category: "back", muscles: ["Lower Back", "Glutes"], type: "Bodyweight" },
  { id: "straight-arm-pulldown", name: "Straight Arm Cable Pull", category: "back", muscles: ["Lats", "Triceps"], type: "Cables" },
  { id: "rack-pulls", name: "Rack Pulls", category: "back", muscles: ["Lower Back", "Traps", "Forearms"], type: "Free Weights" },

  // --- SHOULDERS (Supet) ---
  { id: "overhead-press", name: "Barbell Overhead Press", category: "shoulders", muscles: ["Front Delts", "Side Delts", "Triceps"], type: "Free Weights" },
  { id: "lateral-raise", name: "Dumbbell Lateral Raise", category: "shoulders", muscles: ["Side Delts"], type: "Free Weights" },
  { id: "machine-shoulder-press", name: "Machine Shoulder Press", category: "shoulders", muscles: ["Front Delts", "Triceps"], type: "Machine" },
  { id: "face-pulls", name: "Cable Face Pulls", category: "shoulders", muscles: ["Rear Delts", "Traps", "Rotator Cuff"], type: "Cables" },
  { id: "front-raise", name: "Dumbbell Front Raise", category: "shoulders", muscles: ["Front Delts"], type: "Free Weights" },
  { id: "rear-delt-fly", name: "Reverse Pec Deck Fly", category: "shoulders", muscles: ["Rear Delts"], type: "Machine" },
  { id: "arnold-press", name: "Arnold Press", category: "shoulders", muscles: ["Front Delts", "Side Delts", "Triceps"], type: "Free Weights" },
  { id: "shrugs", name: "Dumbbell Shrugs", category: "shoulders", muscles: ["Upper Traps"], type: "Free Weights" },

  // --- ARMS (Biceps & Triceps) ---
  { id: "bicep-curl", name: "Barbell Bicep Curl", category: "arms", muscles: ["Biceps", "Forearms"], type: "Free Weights" },
  { id: "tricep-pushdown", name: "Cable Tricep Pushdown", category: "arms", muscles: ["Triceps"], type: "Cables" },
  { id: "hammer-curl", name: "Dumbbell Hammer Curl", category: "arms", muscles: ["Biceps", "Brachialis", "Forearms"], type: "Free Weights" },
  { id: "skull-crusher", name: "EZ Bar Skull Crusher", category: "arms", muscles: ["Triceps"], type: "Free Weights" },
  { id: "preacher-curl", name: "Preacher Curl Machine", category: "arms", muscles: ["Biceps"], type: "Machine" },
  { id: "overhead-extension", name: "Dumbbell Overhead Extension", category: "arms", muscles: ["Triceps"], type: "Free Weights" },
  { id: "rope-bicep-curl", name: "Cable Rope Bicep Curl", category: "arms", muscles: ["Biceps"], type: "Cables" },
  { id: "close-grip-bench", name: "Close Grip Bench Press", category: "arms", muscles: ["Triceps", "Chest"], type: "Free Weights" },

  // --- LEGS (Këmbët) ---
  { id: "barbell-squat", name: "Barbell Back Squat", category: "legs", muscles: ["Quads", "Glutes", "Hamstrings", "Core"], type: "Free Weights" },
  { id: "leg-press", name: "Leg Press Machine", category: "legs", muscles: ["Quads", "Glutes"], type: "Machine" },
  { id: "leg-extension", name: "Leg Extension Machine", category: "legs", muscles: ["Quads"], type: "Machine" },
  { id: "leg-curl", name: "Lying Leg Curl", category: "legs", muscles: ["Hamstrings"], type: "Machine" },
  { id: "calf-raise", name: "Standing Calf Raise", category: "legs", muscles: ["Calves"], type: "Machine" },
  { id: "lunges", name: "Dumbbell Walking Lunges", category: "legs", muscles: ["Quads", "Glutes", "Hamstrings"], type: "Free Weights" },
  { id: "hack-squat", name: "Hack Squat Machine", category: "legs", muscles: ["Quads", "Glutes"], type: "Machine" },
  { id: "hip-thrust", name: "Barbell Hip Thrust", category: "legs", muscles: ["Glutes", "Hamstrings"], type: "Free Weights" },
  { id: "bulgarian-split-squat", name: "Bulgarian Split Squat", category: "legs", muscles: ["Quads", "Glutes"], type: "Free Weights" },

  // --- ABS (Barku) ---
  { id: "ab-crunch-machine", name: "Abdominal Crunch Machine", category: "abs", muscles: ["Abs"], type: "Machine" },
  { id: "hanging-leg-raise", name: "Hanging Leg Raise", category: "abs", muscles: ["Lower Abs", "Hip Flexors"], type: "Bodyweight" },
  { id: "plank", name: "Standard Plank", category: "abs", muscles: ["Core", "Transverse Abdominis"], type: "Bodyweight" },
  { id: "russian-twist", name: "Russian Twist", category: "abs", muscles: ["Obliques"], type: "Bodyweight" },
  { id: "cable-crunch", name: "Cable Rope Crunch", category: "abs", muscles: ["Upper Abs"], type: "Cables" },
  { id: "bicycle-crunch", name: "Bicycle Crunches", category: "abs", muscles: ["Abs", "Obliques"], type: "Bodyweight" }
];