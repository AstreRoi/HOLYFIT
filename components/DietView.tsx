import React, { useState, useEffect } from 'react';
import { generateDietPlan } from '../services/geminiService';
import { DietPlan } from '../types';

const DietView: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [goal, setGoal] = useState('Weight Loss');
  const [plan, setPlan] = useState<DietPlan | null>(null);

  // Initial generation on mount
  useEffect(() => {
    handleGenerate();
  }, []);

  const handleGenerate = async () => {
    setLoading(true);
    const result = await generateDietPlan(goal);
    setPlan(result);
    setLoading(false);
  };

  return (
    <div className="space-y-6 pb-24 md:pb-0">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
          <i className="fa-solid fa-wand-magic-sparkles text-primary-500 mr-3"></i>
          AI 식단 플래너
        </h2>
        <p className="text-gray-600 mb-6">Gemini가 당신의 목표에 맞는 완벽한 식단을 제안합니다.</p>
        
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <select 
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            className="flex-1 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none bg-gray-50"
          >
            <option value="Weight Loss">체중 감량</option>
            <option value="Muscle Gain">근육 증가</option>
            <option value="Maintenance">체중 유지</option>
            <option value="Keto">키토제닉 (저탄고지)</option>
            <option value="Vegan">비건 (채식)</option>
          </select>
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="bg-primary-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-primary-700 transition-colors disabled:opacity-50 flex items-center justify-center min-w-[160px]"
          >
            {loading ? (
              <i className="fa-solid fa-circle-notch fa-spin"></i>
            ) : (
              '다시 생성하기'
            )}
          </button>
        </div>
      </div>

      {loading && !plan && (
         <div className="flex flex-col items-center justify-center py-20">
            <i className="fa-solid fa-circle-notch fa-spin text-4xl text-primary-500 mb-4"></i>
            <p className="text-gray-500">AI가 맞춤형 식단을 구성하고 있습니다...</p>
         </div>
      )}

      {plan && !loading && (
        <div className="animate-fade-in">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-800">{plan.title}</h3>
            <p className="text-gray-500">{plan.description}</p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {plan.meals.map((meal, idx) => (
              <div key={idx} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                <div className="h-32 bg-gray-200 relative">
                  <img 
                    src={`https://picsum.photos/400/200?random=${idx + 10}`} 
                    alt={meal.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                    <span className="text-white font-bold">{meal.name}</span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-center mb-4">
                    <span className="bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-xs font-semibold">
                      {meal.calories} kcal
                    </span>
                  </div>
                  
                  <div className="flex justify-between text-sm text-gray-500 mb-4">
                    <div className="text-center">
                      <div className="font-semibold text-gray-800">{meal.protein}</div>
                      <div className="text-xs">단백질</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-gray-800">{meal.carbs}</div>
                      <div className="text-xs">탄수화물</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-gray-800">{meal.fat}</div>
                      <div className="text-xs">지방</div>
                    </div>
                  </div>

                  <div className="border-t pt-3">
                    <p className="text-xs text-gray-400 font-medium mb-2">재료</p>
                    <div className="flex flex-wrap gap-2">
                      {meal.ingredients.map((ing, i) => (
                        <span key={i} className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">
                          {ing}
                        </span>
                      ))}
                    </div>
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

export default DietView;