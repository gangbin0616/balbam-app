// app/search.tsx
import { View, Text, TextInput, StyleSheet, Pressable, Alert, ActivityIndicator } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import MapView, { Marker, Polyline } from 'react-native-maps'; // MapView, Marker, Polyline import
import { fetchRoute } from '../utils/api'; // api.ts에서 fetchRoute 함수 import

export default function SearchScreen() {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [loading, setLoading] = useState(false); // 로딩 상태
  const [error, setError] = useState<string | null>(null); // 오류 상태
  const [routeResult, setRouteResult] = useState<{ time: number; route: string[]; coordinates: { latitude: number; longitude: number }[] } | null>(null); // 결과 상태, coordinates 추가

  const router = useRouter();

  // 서울의 대략적인 중심 좌표
  const initialRegion = {
    latitude: 37.5665,
    longitude: 126.9780,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const handleSearch = async () => { // handleSearch를 async 함수로 변경
    // 기존 유효성 검사
    if (!origin.trim() || !destination.trim()) {
      Alert.alert('Error', 'Please enter both origin and destination.');
      return;
    }

    // 상태 초기화
    setError(null);
    setRouteResult(null);
    setLoading(true); // 로딩 시작

    try {
      // api.ts의 fetchRoute 함수 호출
      const result = await fetchRoute(origin.trim(), destination.trim());
      console.log('API Result:', result);
      setRouteResult(result); // 결과 상태 업데이트
    } catch (err) {
      console.error('Search Error:', err);
      setError('Failed to fetch route. Please try again.'); // 오류 상태 업데이트
      // 실제 API에서는 더 구체적인 오류 처리가 필요함
    } finally {
      setLoading(false); // 로딩 종료
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search Route</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter origin (e.g., Seoul Station)"
        value={origin}
        onChangeText={setOrigin}
        autoCapitalize="words"
      />
      <TextInput
        style={styles.input}
        placeholder="Enter destination (e.g., Gangnam Station)"
        value={destination}
        onChangeText={setDestination}
        autoCapitalize="words"
      />
      <Pressable style={styles.button} onPress={handleSearch} disabled={loading}> {/* 로딩 중일 때 버튼 비활성화 */}
        {loading ? ( // 로딩 중이면 인디케이터 표시
          <ActivityIndicator size="small" color="#ffffff" />
        ) : (
          <Text style={styles.buttonText}>Find Route</Text>
        )}
      </Pressable>

      {/* 오류 메시지 표시 */}
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      {/* 결과 표시 */}
      {routeResult ? (
        <View style={styles.resultContainer}>
          <Text style={styles.resultTitle}>Estimated Travel Time: {routeResult.time} minutes</Text>
          <Text style={styles.resultSubtitle}>Route:</Text>
          {routeResult.route.map((step, index) => (
            <Text key={index} style={styles.resultStep}>- {step}</Text>
          ))}
        </View>
      ) : null}

      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={initialRegion}
          provider="google" // Google Maps provider 사용
        >
          {routeResult && routeResult.coordinates.length > 0 && (
            <>
              <Marker
                coordinate={routeResult.coordinates[0]}
                title="Origin"
                pinColor="green"
              />
              <Marker
                coordinate={routeResult.coordinates[routeResult.coordinates.length - 1]}
                title="Destination"
                pinColor="red"
              />
              <Polyline
                coordinates={routeResult.coordinates}
                strokeWidth={4}
                strokeColor="blue"
              />
            </>
          )}
        </MapView>
        <Text style={styles.mapDisclaimer}>
          Google Maps API Key가 필요합니다. `app.json` 또는 `.env` 파일에 설정해주세요.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-start', // 콘텐츠를 위로 정렬
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    marginVertical: 8,
    borderRadius: 6,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
    // 로딩 중일 때 버튼 색상 변경 (선택 사항)
    opacity: 1, // 기본적으로 1
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
  },
  resultContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  resultSubtitle: {
    fontSize: 16,
    marginTop: 10,
    fontWeight: '600',
  },
  resultStep: {
    fontSize: 14,
    marginLeft: 10,
    marginTop: 5,
  },
  mapContainer: {
    flex: 1, // 지도가 남은 공간을 차지하도록 설정
    marginTop: 20,
    borderRadius: 8,
    overflow: 'hidden', // 맵 모서리 둥글게 처리
  },
  map: {
    width: '100%',
    height: '100%',
  },
  mapDisclaimer: {
    fontSize: 12,
    color: '#888',
    textAlign: 'center',
    marginTop: 5,
  },
});