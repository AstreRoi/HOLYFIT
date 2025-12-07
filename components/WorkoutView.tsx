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

  // Initial generation on mount
  useEffect(() => {
    handleGenerate();
  }, []);

  const handleGenerate = async () => {
    setLoading(true);
    const result = await generateWorkoutRoutine(difficulty);
    setRoutine(result);
    setLoading(false);
  };

  return (
    <div className="space-y-6 pb-24 md:pb-0">
       <div className="bg-gradient-to-r from-secondary to-slate-800 p-8 rounded-3xl shadow-lg text-white">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h2 className="text-3xl font-bold mb-2">HOLYFIT 운동 루틴</h2>
            <p className="text-gray-300">내 수준에 맞는 전문적인 운동 루틴을 생성하세요.</p>
          </div>
          <div className="flex bg-white/10 p-1 rounded-xl backdrop-blur-sm">
            {['Beginner', 'Intermediate', 'Advanced'].map((level) => (
              <button
                key={level}
                onClick={() => setDifficulty(level)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  difficulty === level 
                    ? 'bg-primary-500 text-white shadow-lg' 
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {difficultyMap[level]}
              </button>
            ))}
          </div>
        </div>
        
        <div className="mt-8 flex justify-end">
           <button
            onClick={handleGenerate}
            disabled={loading}
            className="bg-white text-secondary px-6 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors disabled:opacity-70 flex items-center"
          >
            {loading ? (
              <span className="flex items-center">
                <i className="fa-solid fa-circle-notch fa-spin mr-2"></i> 생성 중...
              </span>
            ) : (
              <>
                <i className="fa-solid fa-rotate-right mr-2 text-primary-600"></i> 다시 생성하기
              </>
            )}
          </button>
        </div>
      </div>

      {loading && !routine && (
         <div className="flex flex-col items-center justify-center py-20">
            <i className="fa-solid fa-dumbbell fa-bounce text-4xl text-primary-500 mb-4"></i>
            <p className="text-gray-500">최적의 운동 루틴을 구성하고 있습니다...</p>
         </div>
      )}

      {routine && !loading && (
        <div className="animate-fade-in">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-800">{routine.title}</h3>
              <div className="flex items-center gap-4 mt-1">
                <span className="text-sm text-gray-500 flex items-center">
                  <i className="fa-regular fa-clock mr-1"></i> {routine.durationMinutes} 분
                </span>
                <span className="text-sm text-primary-600 font-medium bg-primary-50 px-2 py-0.5 rounded">
                  {difficultyMap[routine.difficulty] || routine.difficulty}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {routine.exercises.map((exercise, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-6 hover:shadow-md transition-shadow">
                <div className="w-full md:w-48 h-32 bg-gray-100 rounded-lg flex-shrink-0 flex items-center justify-center text-gray-400">
                   {/* Placeholder for video thumbnail */}
                   <i className="fa-solid fa-play-circle text-4xl"></i>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-lg font-bold text-gray-800">{exercise.name}</h4>
                    <div className="text-right">
                       <span className="block text-2xl font-bold text-primary-600">{exercise.sets}</span>
                       <span className="text-xs text-gray-400 uppercase">세트</span>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{exercise.description}</p>
                  <div className="inline-block bg-gray-50 border border-gray-200 rounded-lg px-3 py-1 text-sm font-medium text-gray-700">
                    <i className="fa-solid fa-rotate-right mr-2 text-gray-400"></i>
                    {exercise.reps}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkoutView;