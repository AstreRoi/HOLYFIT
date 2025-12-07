import React from 'react';
import { ViewState } from '../types';

interface NavigationProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentView, setView }) => {
  const navItems = [
    { id: ViewState.HOME, label: '홈', icon: 'fa-house' },
    { id: ViewState.DIET, label: '식단', icon: 'fa-utensils' },
    { id: ViewState.WORKOUT, label: '운동', icon: 'fa-dumbbell' },
    { id: ViewState.SUBSCRIPTION, label: '구독', icon: 'fa-crown' },
  ];

  return (
    <nav className="md:block">
      {/* Desktop Vertical Nav */}
      <div className="hidden md:flex flex-col space-y-3">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setView(item.id)}
            className={`flex items-center p-4 rounded-2xl transition-all duration-200 group relative overflow-hidden ${
              currentView === item.id
                ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30 translate-x-2'
                : 'text-gray-500 hover:bg-gray-50 hover:text-primary-600'
            }`}
          >
            <div className={`w-8 flex justify-center text-xl transition-transform ${currentView === item.id ? 'scale-110' : 'group-hover:scale-110'}`}>
               <i className={`fa-solid ${item.icon}`}></i>
            </div>
            <span className="font-bold ml-3">{item.label}</span>
            {currentView === item.id && (
               <div className="absolute right-4 w-2 h-2 bg-white rounded-full animate-pulse"></div>
            )}
          </button>
        ))}
      </div>

      {/* Mobile Floating Dock */}
      <div className="md:hidden bg-white/90 backdrop-blur-xl border border-white/20 p-2 rounded-3xl shadow-3d flex justify-around items-center">
         {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setView(item.id)}
            className={`flex flex-col items-center justify-center w-14 h-14 rounded-2xl transition-all duration-300 ${
              currentView === item.id
                ? 'bg-primary-500 text-white shadow-lg -translate-y-4 scale-110'
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <i className={`fa-solid ${item.icon} text-lg mb-1`}></i>
            {currentView !== item.id && <span className="text-[10px] font-medium">{item.label}</span>}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;