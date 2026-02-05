// utils/api.ts

// 더미 데이터를 반환하는 함수
export const fetchRoute = async (
  origin: string,
  destination: string
): Promise<{ time: number; route: string[]; coordinates: { latitude: number; longitude: number }[] }> => {
  // 실제 API 호출은 여기에
  // 예: const response = await fetch(`https://api.example.com/route?origin=${origin}&dest=${destination}`);
  // const data = await response.json();
  // return data;

  // MVP를 위한 더미 응답
  console.log(`Fetching route for ${origin} to ${destination} (dummy API)`);

  // 2초 지연 시뮬
  await new Promise(resolve => setTimeout(resolve, 2000));

  // 서울 시내를 가로지르는 간단한 더미 경로 (경복궁 -> 강남역 근처)
  const dummyCoordinates = [
    { latitude: 37.5797, longitude: 126.9770 }, // 경복궁
    { latitude: 37.5663, longitude: 126.9779 }, // 시청
    { latitude: 37.5509, longitude: 126.9882 }, // 서울역
    { latitude: 37.4979, longitude: 127.0276 }, // 강남역
  ];

  // 더미 데이터
  const dummyData = {
    time: Math.floor(Math.random() * 30) + 15, // 15~45분 사이 랜덤
    route: [
      `${origin}에서 출발`,
      "지하철 5호선 탑승 (경복궁역)",
      "시청역에서 2호선으로 환승",
      "강남역 도착",
      `${destination}까지 도보`
    ],
    coordinates: dummyCoordinates,
  };

  return dummyData;
};