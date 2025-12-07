import React, { useState, useEffect } from 'react';
import { generateWorkoutRoutine } from '../services/geminiService';
import { WorkoutRoutine } from '../types';

const WorkoutView: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [difficulty, setDifficulty] = useState('Intermediate');
  const [routine, setRoutine] = useState<WorkoutRoutine | null>(null);

  const difficultyMap: Record<string, string> = {
    'Beginner': '초급',
    'Intermediate': '중급',
    'Advanced': '고급'
  };

  useEffect(() => {
    handleGenerate(difficulty);
  }, []);

  const handleGenerate = async (level: string) => {
    setDifficulty(level);
    setLoading(true);
    const result = await generateWorkoutRoutine(level);
    setRoutine(result);
    setLoading(false);
  };

  return (
    <div className="space-y-8 pb-24 md:pb-0">
      <div className="bg-white p-8 rounded-[32px] shadow-3d border border-white relative overflow-hidden">
        {/* Background Decorative Blob */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -translate-y-1/2 translate-x-1/2"></div>
        
        <div className="relative z-10">
          <h2 className="text-3xl font-black text-gray-800 mb-2 flex items-center">
            <span className="bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">AI 트레이닝 코치</span>
            <i className="fa-solid fa-dumbbell text-primary-500 ml-3 text-2xl drop-shadow-md"></i>
          </h2>
          <p className="text-gray-500 font-medium mb-8">
            목표에 맞는 최적의 운동 루틴을 제안합니다.
          </p>
          
          <div className="mb-8">
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">난이도 선택</label>
            <div className="flex gap-4">
              {Object.keys(difficultyMap).map((level) => (
                <button
                  key={level}
                  onClick={() => handleGenerate(level)}
                  className={`flex-1 py-4 px-4 rounded-2xl font-bold transition-all duration-300 ${
                    difficulty === level 
                    ? 'bg-primary-500 text-white shadow-lg scale-[1.02]' 
                    : 'bg-gray-50 text-gray-400 hover:bg-gray-100'
                  }`}
                >
                  {difficultyMap[level]}
                </button>
              ))}
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-12 animate-pulse bg-gray-50 rounded-3xl border border-gray-100">
             <div className="w-16 h-16 bg-primary-100 text-primary-500 rounded-full flex items-center justify-center mb-4 text-2xl shadow-sm">
                <i className="fa-solid fa-stopwatch fa-spin"></i>
             </div>
             <p className="text-gray-500 font-bold">맞춤형 루틴 생성 중...</p>
          </div>
        ) : routine && (
          <div className="animate-fade-in space-y-6">
            <div className="bg-gray-900 text-white p-6 rounded-3xl shadow-lg relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500 rounded-full mix-blend-overlay filter blur-[60px] opacity-20"></div>
               <div className="relative z-10">
                  <div className="flex justify-between items-start mb-4">
                     <div>
                       <h3 className="text-2xl font-black mb-1">{routine.title}</h3>
                       <div className="flex gap-2 mt-2">
                         <span className="bg-white/10 px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md border border-white/10">
                           ⏱ {routine.durationMinutes}분
                         </span>
                         <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                           routine.difficulty === 'Beginner' ? 'bg-green-500' :
                           routine.difficulty === 'Intermediate' ? 'bg-yellow-500' : 'bg-red-500'
                         }`}>
                           {difficultyMap[routine.difficulty]}
                         </span>
                       </div>
                     </div>
                     <i className="fa-solid fa-person-running text-4xl text-primary-400 opacity-80"></i>
                  </div>
               </div>
            </div>

            <div className="grid gap-4">
               {routine.exercises.map((exercise, idx) => (
                 <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all group">
                    <div className="flex items-start gap-4">
                       <div className="w-12 h-12 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center font-black text-xl shadow-inner group-hover:scale-110 transition-transform">
                          {idx + 1}
                       </div>
                       <div className="flex-1">
                          <div className="flex justify-between items-center mb-2">
                             <h4 className="font-bold text-gray-800 text-lg">{exercise.name}</h4>
                             <div className="text-right">
                                <span className="block text-primary-600 font-black text-lg">{exercise.sets} SETS</span>
                                <span className="block text-xs text-gray-400 font-bold">{exercise.reps}</span>
                             </div>
                          </div>
                          <p className="text-gray-500 text-sm bg-gray-50 p-3 rounded-lg leading-relaxed">
                            {exercise.description}
                          </p>
                       </div>
                    </div>
                 </div>
               ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkoutView;