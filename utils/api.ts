// utils/api.ts

// 더미 데이터를 반환하는 함수
export const fetchRoute = async (origin: string, destination: string): Promise<{ time: number; route: string[] }> => {
  // 실제 API 호출은 여기에
  // 예: const response = await fetch(`https://api.example.com/route?origin=${origin}&dest=${destination}`);
  // const data = await response.json();
  // return data;

  // MVP를 위한 더미 응답
  console.log(`Fetching route for ${origin} to ${destination} (dummy API)`);

  // 2초 지연 시뮬
  await new Promise(resolve => setTimeout(resolve, 2000));

  // 더미 데이터
  const dummyData = {
    time: Math.floor(Math.random() * 30) + 15, // 15~45분 사이 랜덤
    route: [
      `${origin}`,
      "Transfer to Line 2",
      "Take Line 2 towards Sindorim",
      "Transfer to Line 7",
      "Take Line 7 towards Onsu",
      `${destination}`
    ],
  };

  return dummyData;
};