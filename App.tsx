import React, { useState } from 'react';
import Navigation from './components/Navigation';
import DietView from './components/DietView';
import WorkoutView from './components/WorkoutView';
import SubscriptionView from './components/SubscriptionView';
import { ViewState } from './types';

function App() {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.HOME);

  const renderView = () => {
    switch (currentView) {
      case ViewState.HOME:
        return <HomeDashboard setView={setCurrentView} />;
      case ViewState.DIET:
        return <DietView />;
      case ViewState.WORKOUT:
        return <WorkoutView />;
      case ViewState.SUBSCRIPTION:
        return <SubscriptionView />;
      default:
        return <HomeDashboard setView={setCurrentView} />;
    }
  };

  const getHeaderTitle = () => {
    switch (currentView) {
      case ViewState.HOME: return ''; // Removed "대시보드" text
      case ViewState.DIET: return '영양 관리';
      case ViewState.WORKOUT: return '트레이닝';
      case ViewState.SUBSCRIPTION: return '구독 관리';
      default: return '';
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row max-w-[1600px] mx-auto bg-[#f0f4f8]">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex flex-col w-72 h-[95vh] sticky top-4 ml-4 rounded-[40px] bg-white shadow-3d z-20 overflow-hidden">
        <div className="flex items-center gap-4 px-8 py-8 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-primary-600 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-lg shadow-primary-500/40 transform -rotate-6">
            H
          </div>
          <div>
            <h1 className="font-black text-2xl text-gray-800 tracking-tight">HOLYFIT</h1>
          </div>
        </div>
        
        <div className="flex-1 px-4">
          <Navigation currentView={currentView} setView={setCurrentView} />
        </div>
        
        <div className="p-6 mt-auto">
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-3xl border border-gray-100 shadow-inner">
             <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-gray-200 to-gray-300 overflow-hidden border-2 border-white shadow-md">
               <img src="https://picsum.photos/100/100" alt="User" />
             </div>
             <div className="flex-1 min-w-0">
               <p className="text-sm font-bold text-gray-900 truncate">김철수</p>
               <p className="text-xs text-gray-500 truncate font-medium">Free Plan</p>
             </div>
          </div>
        </div>
      </aside>

      {/* Mobile Header & Nav */}
      <div className="md:hidden sticky top-0 z-50 bg-[#f0f4f8]/80 backdrop-blur-md p-4">
        <div className="flex justify-between items-center bg-white p-4 rounded-2xl shadow-3d">
          <div className="flex items-center gap-2">
             <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center text-white font-bold">H</div>
             <span className="font-black text-lg text-gray-800">HOLYFIT</span>
          </div>
          <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
             <img src="https://picsum.photos/100/100" alt="User" />
          </div>
        </div>
        <div className="fixed bottom-6 left-4 right-4 z-50">
           <Navigation currentView={currentView} setView={setCurrentView} />
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 md:pl-10 overflow-y-auto h-screen no-scrollbar">
        {getHeaderTitle() && (
          <header className="mb-8 animate-fade-in">
            <h1 className="text-4xl font-black text-gray-800 mb-2 tracking-tight">
              {getHeaderTitle()}
            </h1>
            <p className="text-gray-500 font-medium">오늘 하루도 건강하게 시작해볼까요?</p>
          </header>
        )}

        {renderView()}
      </main>
    </div>
  );
}

// Sub-component for Home View
const HomeDashboard: React.FC<{ setView: (v: ViewState) => void }> = ({ setView }) => {
  // State for editable stats
  const [stats, setStats] = useState({
    calories: '1,250',
    protein: '85',
    workoutCount: '3',
    weight: '72.5'
  });

  const [isEditing, setIsEditing] = useState<string | null>(null);

  const handleStatChange = (key: keyof typeof stats, value: string) => {
    setStats(prev => ({ ...prev, [key]: value }));
  };

  const statConfig = [
    { id: 'calories', label: '섭취 칼로리', unit: 'kcal', icon: 'fa-fire', color: 'text-orange-500', bg: 'bg-orange-50' },
    { id: 'protein', label: '단백질', unit: 'g', icon: 'fa-drumstick-bite', color: 'text-blue-500', bg: 'bg-blue-50' },
    { id: 'workoutCount', label: '이번주 운동', unit: '회', icon: 'fa-dumbbell', color: 'text-purple-500', bg: 'bg-purple-50' },
    { id: 'weight', label: '현재 체중', unit: 'kg', icon: 'fa-scale-balanced', color: 'text-green-500', bg: 'bg-green-50' },
  ];

  return (
    <div className="space-y-8 pb-32 md:pb-10">
      
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-6">
         <div>
            <h2 className="text-3xl md:text-4xl font-black text-gray-800 mb-2">안녕하세요, 철수님! 👋</h2>
            <p className="text-gray-500 font-medium">오늘의 목표 달성까지 조금만 더 힘내세요.</p>
         </div>
      </div>

      {/* Editable Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {statConfig.map((stat) => (
          <div 
            key={stat.id} 
            className="bg-white p-5 rounded-3xl shadow-card hover:shadow-floating transition-all duration-300 border border-gray-100 group relative overflow-hidden"
          >
            {/* Background Icon Decoration */}
            <div className={`absolute -right-4 -bottom-4 text-6xl opacity-5 transform rotate-12 group-hover:scale-110 transition-transform ${stat.color}`}>
              <i className={`fa-solid ${stat.icon}`}></i>
            </div>

            <div className="relative z-10">
              <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-3 flex items-center gap-2">
                <i className={`fa-solid ${stat.icon} ${stat.color}`}></i>
                {stat.label}
              </p>
              <div className="flex items-baseline cursor-text" onClick={() => setIsEditing(stat.id)}>
                {isEditing === stat.id ? (
                  <input 
                    type="text" 
                    value={stats[stat.id as keyof typeof stats]}
                    onChange={(e) => handleStatChange(stat.id as keyof typeof stats, e.target.value)}
                    onBlur={() => setIsEditing(null)}
                    onKeyDown={(e) => e.key === 'Enter' && setIsEditing(null)}
                    autoFocus
                    className="w-full text-3xl font-black text-gray-800 bg-gray-50 rounded-lg px-2 outline-none border-b-2 border-primary-500"
                  />
                ) : (
                  <span className="text-3xl font-black text-gray-800 group-hover:text-primary-600 transition-colors">
                    {stats[stat.id as keyof typeof stats]}
                  </span>
                )}
                <span className="text-sm font-bold text-gray-400 ml-1">{stat.unit}</span>
              </div>
              <p className="text-[10px] text-gray-400 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">클릭하여 수정</p>
            </div>
          </div>
        ))}
      </div>

      {/* Hero Banner 3D */}
      <div className="relative bg-gradient-to-r from-gray-900 to-gray-800 rounded-[32px] p-8 md:p-12 text-white overflow-hidden shadow-2xl transform transition-transform hover:scale-[1.01]">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-600 rounded-full mix-blend-overlay filter blur-[100px] opacity-20 animate-pulse"></div>
        
        <div className="relative z-10 max-w-lg">
          <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full border border-white/10 mb-4 inline-block">
             🔥 오늘의 추천
          </span>
          <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight">
            한계를 넘어설<br/>준비가 되셨나요?
          </h2>
          <p className="mb-8 text-gray-300 text-lg font-medium leading-relaxed">
            AI 코치가 당신의 컨디션을 분석하여 가장 효과적인 인터벌 트레이닝 세션을 준비했습니다.
          </p>
          <button 
            onClick={() => setView(ViewState.WORKOUT)}
            className="btn-3d bg-primary-500 hover:bg-primary-400 text-white border-primary-700 px-8 py-4 rounded-xl font-bold text-lg shadow-lg inline-flex items-center gap-3"
          >
            <span>운동 시작하기</span>
            <i className="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Diet Card */}
        <div 
          onClick={() => setView(ViewState.DIET)}
          className="bg-white p-8 rounded-[32px] shadow-3d hover:shadow-3d-hover active:shadow-3d-active transition-all cursor-pointer group border border-gray-100 relative overflow-hidden"
        >
           <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:rotate-12 duration-500">
              <i className="fa-solid fa-carrot text-9xl text-green-500"></i>
           </div>
          <div className="relative z-10">
             <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center text-green-600 mb-6 shadow-sm group-hover:scale-110 transition-transform">
               <i className="fa-solid fa-utensils text-2xl"></i>
             </div>
             <h3 className="font-black text-2xl text-gray-800 mb-2 group-hover:text-green-600 transition-colors">식단 가이드</h3>
             <p className="text-gray-500 font-medium leading-relaxed">오늘 먹은 칼로리를 입력하고,<br/>남은 하루를 위한 최적의 식단을 추천받으세요.</p>
          </div>
        </div>

        {/* Subscription Card */}
        <div 
           onClick={() => setView(ViewState.SUBSCRIPTION)}
           className="bg-white p-8 rounded-[32px] shadow-3d hover:shadow-3d-hover active:shadow-3d-active transition-all cursor-pointer group border border-gray-100 relative overflow-hidden"
        >
           <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:rotate-12 duration-500">
              <i className="fa-solid fa-crown text-9xl text-yellow-500"></i>
           </div>
          <div className="relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-yellow-100 flex items-center justify-center text-yellow-600 mb-6 shadow-sm group-hover:scale-110 transition-transform">
              <i className="fa-solid fa-star text-2xl"></i>
            </div>
            <h3 className="font-black text-2xl text-gray-800 mb-2 group-hover:text-yellow-600 transition-colors">구독 관리</h3>
            <p className="text-gray-500 font-medium leading-relaxed">프로 버전으로 업그레이드하고<br/>무제한 AI 코칭과 상세 리포트를 받아보세요.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;