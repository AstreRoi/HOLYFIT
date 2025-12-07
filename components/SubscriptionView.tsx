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
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">요금제 선택</h2>
        <p className="text-gray-600">HolyFit 프리미엄으로 더 건강한 라이프스타일을 즐기세요.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {tiers.map((tier) => (
          <div 
            key={tier.id} 
            className={`relative bg-white rounded-2xl p-8 border transition-transform hover:-translate-y-1 ${
              tier.recommended 
                ? 'border-primary-500 shadow-xl ring-4 ring-primary-500/10' 
                : 'border-gray-200 shadow-sm'
            }`}
          >
            {tier.recommended && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary-500 text-white px-4 py-1 rounded-full text-sm font-bold shadow-sm">
                인기 플랜
              </div>
            )}

            <div className="text-center mb-8">
              <h3 className="text-lg font-semibold text-gray-500 uppercase tracking-wider">{tier.name}</h3>
              <div className="mt-4 flex items-baseline justify-center">
                <span className="text-4xl font-extrabold text-gray-900">{tier.price}</span>
                <span className="ml-1 text-gray-500">/월</span>
              </div>
            </div>

            <ul className="space-y-4 mb-8">
              {tier.features.map((feature, i) => (
                <li key={i} className="flex items-start">
                  <div className="flex-shrink-0">
                    <i className="fa-solid fa-check text-primary-500 mt-1"></i>
                  </div>
                  <p className="ml-3 text-gray-600 text-sm">{feature}</p>
                </li>
              ))}
            </ul>

            <button className={`w-full py-3 rounded-xl font-bold transition-colors ${
              tier.recommended
                ? 'bg-primary-600 text-white hover:bg-primary-700'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}>
              {tier.id === 'basic' ? '현재 이용중' : '지금 업그레이드'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionView;