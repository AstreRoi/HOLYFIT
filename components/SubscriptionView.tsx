import React from 'react';
import { SubscriptionTier } from '../types';

const SubscriptionView: React.FC = () => {
  const tiers: SubscriptionTier[] = [
    {
      id: 'basic',
      name: '무료',
      price: '₩0',
      features: ['기본 식단 가이드', '운동 영상 3개', '커뮤니티 접근'],
      recommended: false,
    },
    {
      id: 'pro',
      name: '프로',
      price: '₩9,900',
      features: ['AI 식단 플래너', 'AI 운동 생성기', '진척도 추적', '광고 제거'],
      recommended: true,
    },
    {
      id: 'elite',
      name: '엘리트',
      price: '₩19,900',
      features: ['프로 기능 전체 포함', '1:1 코칭', '라이브 클래스', '우선 지원 서비스'],
      recommended: false,
    },
  ];

  return (
    <div className="pb-24 md:pb-0">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-black text-gray-900 mb-3">Premium Plans</h2>
        <p className="text-gray-500 font-medium">당신의 건강을 위한 최고의 투자를 선택하세요.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-center">
        {tiers.map((tier) => (
          <div 
            key={tier.id} 
            className={`relative bg-white rounded-[32px] p-8 transition-all duration-300 ${
              tier.recommended 
                ? 'border-2 border-primary-500 shadow-2xl scale-105 z-10' 
                : 'border border-gray-100 shadow-card hover:shadow-floating hover:-translate-y-2'
            }`}
          >
            {tier.recommended && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary-500 text-white px-6 py-2 rounded-full text-sm font-black shadow-lg uppercase tracking-wide">
                Best Choice
              </div>
            )}

            <div className="text-center mb-8 pt-4">
              <h3 className={`text-lg font-bold uppercase tracking-wider mb-4 ${tier.recommended ? 'text-primary-600' : 'text-gray-400'}`}>
                {tier.name}
              </h3>
              <div className="flex items-baseline justify-center">
                <span className="text-5xl font-black text-gray-800 tracking-tight">{tier.price}</span>
                <span className="ml-2 text-gray-400 font-bold">/월</span>
              </div>
            </div>

            <ul className="space-y-4 mb-10">
              {tier.features.map((feature, i) => (
                <li key={i} className="flex items-center">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0 ${tier.recommended ? 'bg-primary-100 text-primary-600' : 'bg-gray-100 text-gray-400'}`}>
                    <i className="fa-solid fa-check text-xs"></i>
                  </div>
                  <p className="text-gray-600 text-sm font-medium">{feature}</p>
                </li>
              ))}
            </ul>

            <button className={`w-full py-4 rounded-xl font-bold text-lg transition-all btn-3d ${
              tier.recommended
                ? 'bg-primary-500 text-white border-primary-700 shadow-lg hover:bg-primary-400'
                : 'bg-gray-100 text-gray-600 border-gray-300 hover:bg-gray-200'
            }`}>
              {tier.id === 'basic' ? '현재 이용중' : '시작하기'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionView;