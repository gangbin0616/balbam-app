import React, { useState, useEffect } from 'react';
import { StyleSheet, ActivityIndicator, Alert, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import NaverMapView, { MapMarker, MapPath } from '@mj-studio/react-native-naver-map';
import { View, Text } from '@/components/Themed';
import { Colors } from '@/constants/Colors';
import * as Haptics from 'expo-haptics';

// Dummy API call simulation
const fetchRouteData = async (origin: string, destination: string) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulate route data
      const dummyRoutes = [
        {
          id: 'route1',
          duration: '약 30분',
          transferCount: 1,
          walkDistance: '500m',
          fare: '1,250원',
          arrivalTime: '10:30',
          steps: [
            '출발지에서 도보 5분',
            '버스 100번 승차 후 3정거장 이동',
            '환승 후 지하철 2호선 승차 후 2정거장 이동',
            '목적지까지 도보 3분',
          ],
          originCoords: { latitude: 37.5665, longitude: 126.9780 }, // Seoul City Hall
          destinationCoords: { latitude: 37.5509, longitude: 126.9880 }, // Namsan Tower area
          polylineCoords: [
            { latitude: 37.5665, longitude: 126.9780 },
            { latitude: 37.5600, longitude: 126.9800 },
            { latitude: 37.5550, longitude: 126.9850 },
            { latitude: 37.5509, longitude: 126.9880 },
          ],
        },
        {
          id: 'route2',
          duration: '약 45분',
          transferCount: 0,
          walkDistance: '1.2km',
          fare: '1,500원',
          arrivalTime: '10:45',
          steps: [
            '출발지에서 도보 10분',
            '버스 200번 승차 후 7정거장 이동',
            '목적지까지 도보 5분',
          ],
          originCoords: { latitude: 37.5665, longitude: 126.9780 },
          destinationCoords: { latitude: 37.5509, longitude: 126.9880 },
          polylineCoords: [
            { latitude: 37.5665, longitude: 126.9780 },
            { latitude: 37.5650, longitude: 126.9700 },
            { latitude: 37.5500, longitude: 126.9800 },
            { latitude: 37.5509, longitude: 126.9880 },
          ],
        },
      ];
      resolve(dummyRoutes);
    }, 2000); // Simulate network delay
  });
};

export default function SearchScreen() {
  const { origin: paramOrigin, destination: paramDestination } = useLocalSearchParams();
  const [loading, setLoading] = useState(true);
  const [routes, setRoutes] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedRoute, setSelectedRoute] = useState<any>(null);

  useEffect(() => {
    const loadRoutes = async () => {
      if (!paramOrigin || !paramDestination) {
        setError('출발지 또는 목적지 정보가 없습니다.');
        setLoading(false);
        return;
      }

      try {
        const data: any = await fetchRouteData(paramOrigin as string, paramDestination as string);
        setRoutes(data);
        if (data.length > 0) {
          setSelectedRoute(data[0]); // Select the first route by default
        }
      } catch (err) {
        setError('경로를 찾을 수 없습니다. 다시 시도해주세요.');
      } finally {
        setLoading(false);
      }
    };
    loadRoutes();
  }, [paramOrigin, paramDestination]);

  const handleStartNavigation = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy); // Heavy haptic feedback for important action
    if (selectedRoute) {
      Alert.alert('내비게이션 시작', `선택된 경로로 내비게이션을 시작합니다:\n${selectedRoute.duration}`);
      // Implement actual navigation logic here
    } else {
      Alert.alert('경로 선택', '먼저 경로를 선택해주세요.');
    }
  };

  const handleRouteSelect = (route: any) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); // Light haptic feedback for selection
    setSelectedRoute(route);
  };

  console.log('Colors in SearchScreen:', Colors); // Added console.log for debugging

  if (loading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color={'#0A7EA4'} />
        <Text style={styles.loadingText}>경로를 검색 중입니다...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Text style={styles.errorText}>{'#EF4444'}</Text>
      </View>
    );
  }

  if (routes.length === 0) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Text style={styles.noResultsText}>검색 결과가 없습니다.</Text>
      </View>
    );
  }

  // Calculate map center and zoom for selected route
  const mapCenter = selectedRoute ? {
    latitude: (selectedRoute.originCoords.latitude + selectedRoute.destinationCoords.latitude) / 2,
    longitude: (selectedRoute.originCoords.longitude + selectedRoute.destinationCoords.longitude) / 2,
  } : undefined;

  return (
    <View style={styles.container}>
      {/* Reduced Map View */}
      {selectedRoute && (
        Platform.OS === 'ios' || Platform.OS === 'android' ? (
          <NaverMapView
            style={styles.map}
            zoomControl={false}
            center={{ ...mapCenter!, zoom: 12 }} // Use non-null assertion or conditional rendering
            showsMyLocationButton={false}
          >
            <MapMarker coordinate={selectedRoute.originCoords} caption={{ text: '출발지' }} />
            <MapMarker coordinate={selectedRoute.destinationCoords} caption={{ text: '목적지' }} pinColor={'#22C55E'} />
            <MapPath coordinates={selectedRoute.polylineCoords} width={5} color={'#0A7EA4'} />
          </NaverMapView>
        ) : (
          <View style={styles.mapFallback}>
            <Text style={styles.mapFallbackText}>웹에서는 지도를 사용할 수 없습니다.</Text>
          </View>
        )
      )}

      {/* Route Cards List */}
      <ScrollView style={styles.routeCardsContainer}>
        {routes.map((route) => (
          <TouchableOpacity
            key={route.id}
            style={[styles.routeCard, selectedRoute?.id === route.id && styles.selectedRouteCard]}
            onPress={() => handleRouteSelect(route)}
          >
            <View style={styles.routeHeader}>
              <Text style={styles.routeDuration}>{route.duration}</Text>
              <Text style={styles.routeArrivalTime}>{route.arrivalTime} 도착</Text>
            </View>
            <View style={styles.routeDetails}>
              <Text style={styles.detailText}>환승 {route.transferCount}회</Text>
              <Text style={styles.detailText}>도보 {route.walkDistance}</Text>
              <Text style={styles.detailText}>{route.fare}</Text>
            </View>
            {selectedRoute?.id === route.id && (
              <View style={styles.routeSteps}>
                {route.steps.map((step: string, index: number) => (
                  <Text key={index} style={styles.stepText}>{`${index + 1}. ${step}`}</Text>
                ))}
              </View>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Fixed Navigation Start Button */}
      <TouchableOpacity style={styles.startButton} onPress={handleStartNavigation}>
        <Text style={styles.startButtonText}>내비게이션 시작</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 15,
    fontSize: 16,
    color: '#11181C',
  },
  errorText: {
    color: '#EF4444',
    fontSize: 16,
    textAlign: 'center',
  },
  noResultsText: {
    fontSize: 16,
    color: '#11181C',
  },
  map: {
    width: '100%',
    height: 200, // Reduced height for condensed map view
  },
  routeCardsContainer: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 15,
  },
  routeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  selectedRouteCard: {
    borderColor: '#0A7EA4',
    borderWidth: 2,
  },
  routeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  routeDuration: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#11181C',
  },
  routeArrivalTime: {
    fontSize: 16,
    color: '#11181C',
    alignSelf: 'flex-end',
  },
  routeDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  detailText: {
    fontSize: 14,
    color: '#11181C',
  },
  routeSteps: {
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 10,
  },
  stepText: {
    fontSize: 14,
    color: '#11181C',
    marginBottom: 5,
  },
  startButton: {
    backgroundColor: '#0A7EA4',
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  startButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  mapFallback: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0e0e0', // Light gray background for fallback map
  },
  mapFallbackText: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
  },
});
