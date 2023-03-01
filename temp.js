import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View ,Button ,PermissionsAndroid,Dimensions} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import React , {useState,useEffect} from 'react'
import * as Location from 'expo-location'

export default function App() {
  const [mapRegion,setMapRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  })

  const  userLocation = async () => {
    let {status} = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied')
    }
    let location = await Location.getCurrentPositionAsync({enableHighAccuracy:true})
    setMapRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    })
    console.log(location.coords.latitude, location.coords.longitude)
  }

  useEffect(()=> {
    userLocation();
  }, []);

  return (
    <View style={{flex:1}}>
      <View style={{flex:1}}>
        <MapView style={styles.map} region={mapRegion}>
          <Marker coordinate={mapRegion} title='Marker'/>
        </MapView>
      </View>
      <Button title='get Location' onPress={userLocation} />

      {/* <MapView style={styles.map} showsUserLocation={true}/> */}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: StatusBar.currentHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  item: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
