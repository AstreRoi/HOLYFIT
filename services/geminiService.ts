import { DietPlan, WorkoutRoutine } from "../types";

// --- Mock Data: Diet Plans ---
const MOCK_DIET_PLANS: Record<string, DietPlan> = {
  'Weight Loss': {
    title: "체중 감량을 위한 클린 식단",
    description: "칼로리 밀도는 낮추고 포만감은 높인 식단입니다. 탄수화물을 줄이고 식이섬유 섭취를 늘려 체지방 연소를 돕습니다.",
    meals: [
      {
        name: "아침: 그릭요거트 볼",
        calories: 320,
        protein: "15g",
        carbs: "30g",
        fat: "10g",
        ingredients: ["무가당 그릭요거트", "블루베리", "아몬드 슬라이스", "꿀 약간"]
      },
      {
        name: "점심: 닭가슴살 아보카도 샐러드",
        calories: 450,
        protein: "35g",
        carbs: "20g",
        fat: "25g",
        ingredients: ["닭가슴살", "아보카도 1/2개", "방울토마토", "믹스 채소", "올리브 오일 드레싱"]
      },
      {
        name: "저녁: 흰살 생선 구이와 구운 야채",
        calories: 380,
        protein: "30g",
        carbs: "15g",
        fat: "12g",
        ingredients: ["대구살 또는 가자미", "아스파라거스", "브로콜리", "레몬 즙"]
      }
    ]
  },
  'Muscle Gain': {
    title: "근성장을 위한 고단백 식단",
    description: "근육 회복과 성장을 위해 충분한 단백질과 양질의 탄수화물을 공급하는 식단입니다.",
    meals: [
      {
        name: "아침: 오트밀과 계란 흰자",
        calories: 500,
        protein: "30g",
        carbs: "60g",
        fat: "10g",
        ingredients: ["오트밀", "계란 흰자 3개", "바나나", "프로틴 파우더"]
      },
      {
        name: "점심: 소고기 부챗살 덮밥",
        calories: 700,
        protein: "45g",
        carbs: "80g",
        fat: "20g",
        ingredients: ["소고기 부챗살", "현미밥", "양파", "버섯", "스테이크 소스"]
      },
      {
        name: "저녁: 연어 스테이크와 고구마",
        calories: 600,
        protein: "40g",
        carbs: "50g",
        fat: "25g",
        ingredients: ["생연어", "고구마", "그린빈", "마늘"]
      }
    ]
  },
  'Default': {
    title: "활력 넘치는 하루를 위한 밸런스 식단",
    description: "탄수화물, 단백질, 지방의 균형을 완벽하게 맞춘 건강한 하루 식단입니다. 꾸준히 실천하면 컨디션이 좋아집니다.",
    meals: [
      {
        name: "아침: 통밀 토스트와 스크램블 에그",
        calories: 400,
        protein: "20g",
        carbs: "40g",
        fat: "15g",
        ingredients: ["통밀 식빵 2장", "계란 2개", "우유", "사과 1/2개"]
      },
      {
        name: "점심: 비빔밥 (저염식)",
        calories: 550,
        protein: "20g",
        carbs: "70g",
        fat: "15g",
        ingredients: ["잡곡밥", "콩나물", "시금치", "당근", "소고기 볶음", "약고추장"]
      },
      {
        name: "저녁: 두부면 파스타",
        calories: 350,
        protein: "25g",
        carbs: "10g",
        fat: "20g",
        ingredients: ["두부면", "토마토 소스", "새우", "버섯", "파마산 치즈"]
      }
    ]
  }
};

// --- Mock Data: Workout Routines ---
const MOCK_WORKOUT_ROUTINES: Record<string, WorkoutRoutine> = {
  'Beginner': {
    title: "기초 체력 다지기 (전신)",
    difficulty: "Beginner",
    durationMinutes: 30,
    exercises: [
      {
        name: "맨몸 스쿼트",
        sets: 3,
        reps: "12-15회",
        description: "허벅지와 엉덩이 근육을 사용하는 가장 기본적인 하체 운동입니다. 무릎이 발끝을 넘지 않도록 주의하세요."
      },
      {
        name: "푸쉬업 (니 푸쉬업)",
        sets: 3,
        reps: "10-12회",
        description: "가슴과 팔 근육을 발달시킵니다. 초보자는 무릎을 대고 진행해도 좋습니다."
      },
      {
        name: "플랭크",
        sets: 3,
        reps: "30초",
        description: "코어 근육을 강화하여 신체 안정성을 높여주는 버티기 운동입니다."
      },
      {
        name: "제자리 런지",
        sets: 3,
        reps: "양쪽 10회",
        description: "균형 감각과 하체 근력을 동시에 키워줍니다."
      }
    ]
  },
  'Intermediate': {
    title: "체지방 태우기 & 라인 잡기",
    difficulty: "Intermediate",
    durationMinutes: 45,
    exercises: [
      {
        name: "덤벨 런지 & 프레스",
        sets: 4,
        reps: "12회",
        description: "하체와 어깨를 동시에 자극하여 칼로리 소모를 극대화합니다."
      },
      {
        name: "마운틴 클라이머",
        sets: 4,
        reps: "30초",
        description: "빠르게 진행하여 심박수를 높이고 뱃살을 빼는데 효과적입니다."
      },
      {
        name: "데드리프트 (덤벨/바벨)",
        sets: 4,
        reps: "10회",
        description: "전신 후면 사슬을 강화하여 바른 자세를 만들어줍니다."
      },
      {
        name: "바이시클 크런치",
        sets: 3,
        reps: "20회",
        description: "복부 전체, 특히 옆구리를 자극하는 최고의 복근 운동입니다."
      }
    ]
  },
  'Advanced': {
    title: "엘리트 파워 트레이닝",
    difficulty: "Advanced",
    durationMinutes: 60,
    exercises: [
      {
        name: "바벨 백 스쿼트",
        sets: 5,
        reps: "5-8회",
        description: "고중량을 사용하여 하체 근력과 전체적인 파워를 폭발적으로 증가시킵니다."
      },
      {
        name: "풀업 (턱걸이)",
        sets: 4,
        reps: "실패 지점까지",
        description: "등 근육의 넓이와 두께를 동시에 키워주는 최고의 상체 운동입니다."
      },
      {
        name: "벤치 프레스",
        sets: 5,
        reps: "8-10회",
        description: "상체 미는 힘을 기르는 대표적인 3대 운동 중 하나입니다."
      },
      {
        name: "행잉 레그 레이즈",
        sets: 4,
        reps: "15회",
        description: "매달린 상태에서 다리를 들어올려 하복부를 강하게 자극합니다."
      },
      {
        name: "버피 테스트",
        sets: 3,
        reps: "20회",
        description: "마지막으로 심박수를 최대치로 끌어올리는 전신 유산소성 근력 운동입니다."
      }
    ]
  }
};

export const generateDietPlan = async (goal: string, consumedCalories: number = 0): Promise<DietPlan | null> => {
  // Simulate network delay for realistic feel
  await new Promise(resolve => setTimeout(resolve, 500));

  let plan = MOCK_DIET_PLANS['Default'];
  
  if (goal === 'Weight Loss' || goal === 'Keto') {
    plan = MOCK_DIET_PLANS['Weight Loss'];
  } else if (goal === 'Muscle Gain') {
    plan = MOCK_DIET_PLANS['Muscle Gain'];
  } else {
    // Default fallback
    plan = MOCK_DIET_PLANS['Default'];
  }

  // Deep copy to modify description dynamically
  const planCopy = JSON.parse(JSON.stringify(plan));

  if (consumedCalories > 0) {
     const target = 2500;
     const remaining = target - consumedCalories;
     if (remaining > 0) {
        planCopy.description = `오늘 이미 ${consumedCalories}kcal를 섭취하셨군요. 목표 달성을 위해 남은 ${remaining}kcal 내에서 섭취할 수 있는 최적의 식단을 구성했습니다.`;
     } else {
        planCopy.description = `오늘 목표 칼로리(${target}kcal)를 초과했습니다. 남은 시간은 가벼운 수분 섭취와 채소 위주의 식단을 권장합니다.`;
     }
  }

  return planCopy;
};

export const generateWorkoutRoutine = async (level: string): Promise<WorkoutRoutine | null> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 600));

  return MOCK_WORKOUT_ROUTINES[level] || MOCK_WORKOUT_ROUTINES['Intermediate'];
};