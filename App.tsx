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
      case ViewState.HOME: return '대시보드';
      case ViewState.DIET: return '영양 관리';
      case ViewState.WORKOUT: return '트레이닝';
      case ViewState.SUBSCRIPTION: return '구독 관리';
      default: return '대시보드';
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row max-w-7xl mx-auto">
      {/* Mobile Navigation (Bottom) / Desktop Sidebar */}
      <aside className="md:w-64 md:flex-shrink-0 md:h-screen md:sticky md:top-0 p-4 md:border-r border-gray-200 bg-white">
        <div className="flex items-center gap-3 px-4 py-4 mb-2">
          <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-primary-500/30">
            H
          </div>
          <div>
            <h1 className="font-bold text-gray-900 tracking-tight">HOLYFIT</h1>
            <p className="text-xs text-gray-500">Health Management</p>
          </div>
        </div>
        <Navigation currentView={currentView} setView={setCurrentView} />
        
        {/* User Profile Snippet (Desktop only) */}
        <div className="hidden md:flex items-center gap-3 absolute bottom-8 left-4 right-4 p-3 bg-gray-50 rounded-xl">
           <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden">
             <img src="https://picsum.photos/100/100" alt="User" />
           </div>
           <div className="flex-1 min-w-0">
             <p className="text-sm font-medium text-gray-900 truncate">김철수</p>
             <p className="text-xs text-gray-500 truncate">무료 플랜</p>
           </div>
           <i className="fa-solid fa-gear text-gray-400 cursor-pointer hover:text-gray-600"></i>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto h-screen no-scrollbar">
        {/* Header Area */}
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {getHeaderTitle()}
            </h1>
            <p className="text-sm text-gray-500">오늘도 활기찬 하루 되세요!</p>
          </div>
          <button className="md:hidden p-2 text-gray-600">
            <i className="fa-regular fa-bell text-xl"></i>
          </button>
        </header>

        {renderView()}
      </main>
    </div>
  );
}

// Sub-component for Home View
const HomeDashboard: React.FC<{ setView: (v: ViewState) => void }> = ({ setView }) => {
  return (
    <div className="space-y-6 pb-24 md:pb-0">
      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: '섭취 칼로리', val: '1,250', unit: 'kcal', color: 'text-orange-500', bg: 'bg-orange-50' },
          { label: '단백질', val: '85', unit: 'g', color: 'text-blue-500', bg: 'bg-blue-50' },
          { label: '이번주 운동', val: '3', unit: '회', color: 'text-purple-500', bg: 'bg-purple-50' },
          { label: '현재 체중', val: '72.5', unit: 'kg', color: 'text-green-500', bg: 'bg-green-50' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
            <p className="text-xs text-gray-500 uppercase font-medium">{stat.label}</p>
            <div className="flex items-baseline mt-2">
              <span className={`text-2xl font-bold ${stat.color}`}>{stat.val}</span>
              <span className="text-xs text-gray-400 ml-1">{stat.unit}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Hero Banner */}
      <div className="relative bg-primary-600 rounded-3xl p-6 md:p-10 text-white overflow-hidden">
        <div className="relative z-10 max-w-md">
          <h2 className="text-3xl font-bold mb-4">오늘 운동 준비 되셨나요?</h2>
          <p className="mb-6 text-primary-100">AI 코치가 당신을 위해 새로운 고강도 인터벌 트레이닝 세션을 준비했습니다.</p>
          <button 
            onClick={() => setView(ViewState.WORKOUT)}
            className="bg-white text-primary-700 px-6 py-3 rounded-xl font-bold hover:bg-primary-50 transition-colors"
          >
            운동 시작하기
          </button>
        </div>
        <div className="absolute right-0 bottom-0 opacity-20 transform translate-x-10 translate-y-10">
          <i className="fa-solid fa-dumbbell text-[200px]"></i>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div 
          onClick={() => setView(ViewState.DIET)}
          className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm cursor-pointer hover:shadow-md transition-all group"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600">
              <i className="fa-solid fa-carrot text-xl"></i>
            </div>
            <i className="fa-solid fa-arrow-right text-gray-300 group-hover:text-green-500 transition-colors"></i>
          </div>
          <h3 className="font-bold text-lg text-gray-900 mb-1">식단 가이드</h3>
          <p className="text-sm text-gray-500">오늘의 식단을 확인하거나 Gemini AI로 새로운 메뉴를 추천받으세요.</p>
        </div>

        <div 
           onClick={() => setView(ViewState.SUBSCRIPTION)}
           className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm cursor-pointer hover:shadow-md transition-all group"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600">
              <i className="fa-solid fa-crown text-xl"></i>
            </div>
            <i className="fa-solid fa-arrow-right text-gray-300 group-hover:text-yellow-500 transition-colors"></i>
          </div>
          <h3 className="font-bold text-lg text-gray-900 mb-1">구독 관리</h3>
          <p className="text-sm text-gray-500">요금제를 관리하거나 프로 버전으로 업그레이드하여 무제한 AI 기능을 즐기세요.</p>
        </div>
      </div>
    </div>
  );
};

export default App;