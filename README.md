# 발밤 (Balbam) - 초개인화 대중교통 내비게이션

## 🚶‍♂️ 프로젝트 개요

**발밤**은 '발밤발밤(가는 곳을 정하지 아니하고 한 걸음 한 걸음 천천히 걷는 모양)'에서 착안한 AI 기반 초개인화 대중교통 내비게이션 앱입니다. AI가 사용자의 보행 패턴을 학습하고, 실시간 교통 데이터와 결합하여 '진짜' 도착 시간과 최적 경로를 제안하여, 사용자가 급하게 뛰지 않아도 여유롭게 목적지에 도착할 수 있도록 돕습니다.

## ✨ 주요 기능 (MVP 포함)

### 1. AI 페이스메이커 (사용자 패턴 학습 엔진)
*   사용자의 평소 보행 및 환승 속도를 학습하여 '나 전용' 이동 시간을 계산합니다.
*   GPS 및 가속도 센서 데이터를 활용해 개인별 보행 속도 프로필을 구축합니다.

### 2. 능동형 동적 경로 재탐색 (Active Rerouting)
*   경로 이탈이나 지연 발생 시 즉시 따릉이, 킥보드, 택시 등을 포함한 '지각 방지 대안'을 제시합니다. (MVP에서는 더미 데이터 기반 시뮬레이션)

### 3. 온타임 가디언 (목적지 원하는 시간 도착 시스템)
*   사용자가 설정한 '도착 희망 시각'으로부터 역산하여 최적의 이동 수단 조합을 제안합니다. (MVP에서는 더미 데이터 기반 시뮬레이션)

### 4. 크라우드소싱 현장 가이드 (Field Intelligence)
*   제작자와 사용자가 직접 수집한 현장 정보(지하철 안내판 실제 문구 등)를 반영하여 초행길 가독성을 극대화합니다. (MVP 미포함, 향후 개발 예정)

### 5. 지도 기반 경로 시각화 (MVP)
*   React Native Maps를 활용하여 출발지, 목적지, 그리고 더미 데이터를 기반으로 한 경로를 지도 위에 시각적으로 표시합니다.

## 🛠️ 기술 스택

*   **Frontend (Mobile App)**: React Native + Expo + TypeScript + expo-router
*   **Backend**: Node.js + Express (향후 개발 예정)
*   **Database**: PostgreSQL (향후 개발 예정)
*   **AI/ML**: TensorFlow.js (또는 Python 기반 TensorFlow + Flask/FastAPI API 서버, 향후 개발 예정)
*   **Map SDK**: `react-native-maps` (Google Maps Provider)

## 🚀 시작하기

### 필수 설치

`Node.js`와 `npm` 또는 `yarn`이 설치되어 있어야 합니다.

### 프로젝트 설치

```bash
# 레포지토리 클론
git clone [YOUR_REPOSITORY_URL]
cd balbam-app

# 의존성 설치
npm install
# 또는 yarn install
```

### Google Maps API 키 설정

`react-native-maps`는 Google Maps를 사용하기 위해 API 키가 필요합니다. 프로젝트 루트에 `.env` 파일을 생성하고 다음 내용을 추가하세요:

```
EXPO_PUBLIC_GOOGLE_MAPS_API_KEY=YOUR_GOOGLE_MAPS_API_KEY_HERE
```

`YOUR_GOOGLE_MAPS_API_KEY_HERE`를 [Google Cloud Platform](https://console.cloud.google.com/)에서 발급받은 실제 Google Maps API 키로 교체해야 합니다.

**`app.json` 설정:**
`app.json` 파일에 `react-native-google-maps` 플러그인이 아래와 같이 설정되어 있습니다:

```json
"plugins": [
  [
    "react-native-google-maps",
    {
      "androidApiKey": "${process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY}",
      "iosApiKey": "${process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY}"
    }
  ]
]
```

### 앱 실행

앱을 세로 모드로 실행해야 합니다.

```bash
npx expo start
```

명령어 실행 후 Expo Dev Tools가 브라우저에 열립니다. 모바일 기기 또는 에뮬레이터에서 앱을 실행하여 테스트할 수 있습니다.

## 🗺️ 현재 MVP 기능

*   **홈 화면**: 앱 소개 및 경로 검색 화면으로 이동하는 버튼.
*   **경로 검색 화면 (`app/search.tsx`)**:
    *   출발지 및 목적지 입력 필드.
    *   경로 검색 버튼 (더미 API 호출).
    *   로딩 및 에러 상태 표시.
    *   더미 데이터를 기반으로 한 예상 이동 시간 및 경로 단계 표시.
    *   Google Maps를 이용한 지도 표시:
        *   서울 중심을 초기 지도로 설정.
        *   더미 데이터에서 제공되는 좌표를 기반으로 출발지/목적지 마커 및 경로 `Polyline` 표시.

## 💡 향후 계획 (발밤 프로젝트 기획서 기준)

*   **1단계: MVP + AI 페이스메이커 (기본 학습/적용)**
*   **2단계: 능동형 동적 경로 재탐색 (기본 감지/리라우팅) + 날씨 연동**
*   **3단계: 크라우드소싱 가이드 (기본 제보 기능) + 익스트림 모드 + 민간 API 연동 (선택적)**
*   **백엔드 및 데이터베이스 연동**
*   **실시간 교통 API 연동 및 데이터 정합성 강화**
*   **배터리 효율성 및 GPS 정확도 최적화**
*   **오프라인 기능 지원**
*   **UI/UX 개선 및 사용자 피드백 반영**

---

