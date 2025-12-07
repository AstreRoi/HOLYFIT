import React from 'react';
import { ViewState } from '../types';

interface NavigationProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentView, setView }) => {
  const navItems = [
    { id: ViewState.HOME, label: '홈', icon: 'fa-house' },
    { id: ViewState.DIET, label: '식단 가이드', icon: 'fa-utensils' },
    { id: ViewState.WORKOUT, label: '운동 프로그램', icon: 'fa-dumbbell' },
    { id: ViewState.SUBSCRIPTION, label: '구독 관리', icon: 'fa-crown' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg md:relative md:border-none md:shadow-none md:bg-transparent z-50">
      <div className="flex justify-around items-center h-16 md:flex-col md:h-auto md:items-start md:space-y-4 md:mt-8">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setView(item.id)}
            className={`flex flex-col md:flex-row items-center p-2 rounded-lg transition-colors w-full md:px-4 md:py-3 ${
              currentView === item.id
                ? 'text-primary-600 bg-primary-50'
                : 'text-gray-500 hover:text-primary-500 hover:bg-gray-50'
            }`}
          >
            <i className={`fa-solid ${item.icon} text-xl mb-1 md:mb-0 md:mr-3`}></i>
            <span className="text-xs md:text-sm font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;