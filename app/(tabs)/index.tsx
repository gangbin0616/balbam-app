import React, { useState, useRef } from 'react';
import { StyleSheet, TextInput, View as RNView, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { useNavigation } from 'expo-router';
import NaverMapView, { MapMarker } from '@mj-studio/react-native-naver-map';
import { Text, View } from '@/components/Themed';
import { Colors } from '@/constants/Colors';
import * as Haptics from 'expo-haptics';
import { SFSymbol } from 'react-native-sfsymbols'; // Import SFSymbol

export default function HomeScreen() {
  const navigation = useNavigation();
  const [origin, setOrigin] = useState('현재 위치');
  const [destination, setDestination] = useState('');

  // Dummy current location for Naver Map
  const initialLocation = { latitude: 37.5665, longitude: 126.9780 }; // Seoul City Hall

  const handleSearch = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); // Haptic feedback on button press
    navigation.navigate('search', { origin, destination });
  };

  console.log('Colors in HomeScreen:', Colors); // Added console.log for debugging

  return (
    <View style={styles.container}>
      {/* Map View */}
      {Platform.OS === 'ios' || Platform.OS === 'android' ? (
        <NaverMapView
          style={styles.map}
          zoomControl={false}
          center={{ ...initialLocation, zoom: 14 }}
        >
          <MapMarker coordinate={initialLocation} caption={{ text: '현재 위치' }} />
          {/* Destination marker will be added on the search results screen */}
        </NaverMapView>
      ) : (
        <RNView style={styles.mapFallback}>
          <Text style={styles.mapFallbackText}>웹에서는 지도를 사용할 수 없습니다.</Text>
        </RNView>
      )}

      {/* Input Card */}
      <RNView style={styles.inputCard}>
        <TextInput
          style={styles.inputField}
          placeholder="출발지"
          value={origin}
          onChangeText={setOrigin}
        />
        <TextInput
          style={styles.inputField}
          placeholder="목적지"
          value={destination}
          onChangeText={setDestination}
          onFocus={() => { /* Potentially show suggestions or expand card */ }}
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          {Platform.OS === 'ios' ? (
            <SFSymbol
              name="magnifyingglass" // SF Symbol for search
              weight="semibold"
              scale="large"
              color="#fff"
              size={20}
              resizeMode="center"
              style={styles.searchIcon}
            />
          ) : (
            <Text style={styles.searchButtonText}>경로 검색</Text> // Android fallback
          )}
          <Text style={styles.searchButtonText}>경로 검색</Text>
        </TouchableOpacity>
      </RNView>

      {/* Slide-up Sheet Placeholder (for recent searches and favorites) */}
      <RNView style={styles.slideUpSheet}>
        <ScrollView>
          <Text style={styles.listTitle}>최근 검색</Text>
          {/* Dummy recent searches */}
          {['강남역', '서울역', '홍대입구'].map((item, index) => (
            <TouchableOpacity key={index} style={styles.listItem} onPress={() => {Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); setDestination(item);}}>
              <Text style={styles.listItemText}>{item}</Text>
            </TouchableOpacity>
          ))}
          <Text style={styles.listTitle}>즐겨찾기</Text>
          {/* Dummy favorites */}
          {['집', '회사'].map((item, index) => (
            <TouchableOpacity key={index} style={styles.listItem} onPress={() => {Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); setDestination(item);}}>
              <Text style={styles.listItemText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </RNView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', // Replaced Colors.background.light
  },
  map: {
    flex: 1,
  },
  inputCard: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    backgroundColor: '#FFFFFF', // Replaced Colors.background.light
    borderRadius: 12,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    zIndex: 10,
  },
  inputField: {
    height: 44,
    borderColor: '#e0e0e0',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 10,
    fontSize: 16,
    color: '#11181C', // Replaced Colors.foreground.light
  },
  searchButton: {
    backgroundColor: '#0A7EA4', // Replaced Colors.primary
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center', // Center icon and text
    flexDirection: 'row', // Align icon and text horizontally
    marginTop: 10,
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8, // Space between icon and text
  },
  searchIcon: {
    width: 20,
    height: 20,
  },
  slideUpSheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '40%', // Adjust as needed for the slide-up behavior
    backgroundColor: '#FFFFFF', // Replaced Colors.background.light
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    zIndex: 5,
  },
  listTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#11181C', // Replaced Colors.foreground.light
    marginBottom: 15,
    marginTop: 10,
  },
  listItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  listItemText: {
    fontSize: 16,
    color: '#11181C', // Replaced Colors.foreground.light
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
