import React, { useState, useEffect } from 'react';
import { generateDietPlan } from '../services/geminiService';
import { DietPlan } from '../types';

const DietView: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [goal, setGoal] = useState('Weight Loss');
  const [consumedCalories, setConsumedCalories] = useState<number>(0);
  const [showInput, setShowInput] = useState(true); 
  const [plan, setPlan] = useState<DietPlan | null>(null);

  useEffect(() => {
    handleGenerate();
  }, []);

  const handleGenerate = async () => {
    setLoading(true);
    // Now calls the mock service which returns static data
    const result = await generateDietPlan(goal, consumedCalories);
    setPlan(result);
    setLoading(false);
    if(consumedCalories > 0) setShowInput(false); 
  };

  return (
    <div className="space-y-8 pb-24 md:pb-0">
      <div className="bg-white p-8 rounded-3xl shadow-3d border border-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -translate-y-1/2 translate-x-1/2"></div>
        
        <h2 className="text-3xl font-black text-gray-800 mb-2 flex items-center relative z-10">
          <span className="bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">맞춤 식단 가이드</span>
          <i className="fa-solid fa-leaf text-green-500 ml-3 text-2xl drop-shadow-md"></i>
        </h2>
        <p className="text-gray-500 font-medium mb-8 relative z-10">
          영양학적으로 균형 잡힌 건강한 식단을 추천해 드립니다.
        </p>
        
        <div className="grid md:grid-cols-2 gap-6 relative z-10">
          <div className="bg-gray-50 p-5 rounded-2xl shadow-inner border border-gray-100">
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">오늘 섭취한 칼로리</label>
            <div className="flex items-center">
              <input 
                type="number"
                value={consumedCalories}
                onChange={(e) => setConsumedCalories(Number(e.target.value))}
                placeholder="0"
                className="w-full bg-transparent text-2xl font-bold text-gray-800 outline-none placeholder-gray-300"
              />
              <span className="text-gray-400 font-medium ml-2">kcal</span>
            </div>
          </div>

          <div className="bg-gray-50 p-5 rounded-2xl shadow-inner border border-gray-100">
             <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">나의 목표</label>
             <select 
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              className="w-full bg-transparent text-lg font-bold text-gray-800 outline-none cursor-pointer"
            >
              <option value="Weight Loss">체중 감량 (다이어트)</option>
              <option value="Muscle Gain">근육 증가 (벌크업)</option>
              <option value="Maintenance">체중 유지 / 건강식</option>
              <option value="Keto">저탄고지</option>
              <option value="Vegan">비건 채식</option>
            </select>
          </div>
        </div>

        <div className="mt-8">
           <button
            onClick={handleGenerate}
            disabled={loading}
            className="btn-3d w-full bg-primary-500 hover:bg-primary-400 text-white border-primary-700 py-4 rounded-xl font-bold text-lg shadow-lg flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <><i className="fa-solid fa-circle-notch fa-spin mr-2"></i> 식단 불러오는 중...</>
            ) : (
              '식단 추천 받기'
            )}
          </button>
        </div>
      </div>

      {loading && !plan && (
         <div className="flex flex-col items-center justify-center py-20 animate-pulse">
            <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mb-6 shadow-floating">
               <i className="fa-solid fa-utensils text-4xl text-primary-500"></i>
            </div>
            <p className="text-gray-500 font-medium text-lg">건강한 식단을 구성하고 있습니다...</p>
         </div>
      )}

      {plan && !loading && (
        <div className="animate-fade-in space-y-6">
          <div className="bg-secondary text-white p-6 rounded-2xl shadow-floating transform hover:-translate-y-1 transition-transform duration-300">
            <div className="flex items-start">
               <i className="fa-solid fa-quote-left text-primary-500 text-3xl mr-4 opacity-50"></i>
               <div>
                  <h3 className="text-xl font-bold mb-2">{plan.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{plan.description}</p>
               </div>
            </div>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {plan.meals.map((meal, idx) => (
              <div key={idx} className="bg-white rounded-3xl overflow-hidden shadow-card hover:shadow-floating transition-all duration-300 group border border-gray-100">
                <div className="h-40 bg-gray-200 relative overflow-hidden">
                  <img 
                    src={`https://picsum.photos/400/250?food&random=${idx + 20}`} 
                    alt={meal.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full shadow-sm">
                    <span className="text-xs font-bold text-gray-800">{meal.calories} kcal</span>
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-bold text-gray-800 mb-4 truncate">{meal.name}</h4>
                  
                  <div className="flex justify-between text-sm text-gray-500 mb-6 bg-gray-50 p-3 rounded-xl">
                    <div className="text-center flex-1 border-r border-gray-200">
                      <div className="font-bold text-gray-800">{meal.protein}</div>
                      <div className="text-[10px] uppercase tracking-wide mt-1">단백질</div>
                    </div>
                    <div className="text-center flex-1 border-r border-gray-200">
                      <div className="font-bold text-gray-800">{meal.carbs}</div>
                      <div className="text-[10px] uppercase tracking-wide mt-1">탄수화물</div>
                    </div>
                    <div className="text-center flex-1">
                      <div className="font-bold text-gray-800">{meal.fat}</div>
                      <div className="text-[10px] uppercase tracking-wide mt-1">지방</div>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-3">추천 메뉴 구성</p>
                    <div className="flex flex-wrap gap-2">
                      {meal.ingredients.map((ing, i) => (
                        <span key={i} className="text-xs font-medium text-gray-600 bg-white border border-gray-200 px-3 py-1.5 rounded-lg shadow-sm">
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