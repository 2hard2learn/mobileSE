import react, {useState, useRef, useEffect} from "react";
import { View, Text, StyleSheet, SafeAreaView, Dimensions, TouchableOpacity, Image } from "react-native";
import MapView, { Marker,AnimatedRegion,PROVIDER_GOOGLE} from 'react-native-maps';
import { GOOGLE_MAPS_APIKEY } from "./constants/googleMapKey";
import MapViewDirections from "react-native-maps-directions";
import { icCurLoc,icGreenMarker } from "./constants/imagePath";
import { getDocs, collection } from "firebase/firestore"; 
import { db } from './../firestore/config';

import AddressPickup from "./components/AddressPickup";

const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const Home = ({navigation}) => {
    const [show, setShow] = useState(false);
    const [namePlace, setNamePlace] = useState([]);
    const [locateLatitude, setLocateLatitude] = useState([]);
    const [locateLongitude, setLocateLongitude] = useState([]);

    const [state, setState] = useState({
        startingCords: {
            latitude: 13.361143,
            longitude: 100.984673,
        },
        destinationCords: {
            latitude: 12.95006,
            longitude: 100.89091,
        },
    })

    useEffect(() => {
        getDocs(collection(db, 'location')).then(docSnap => {
            let tmpName = [];
            let tmpCoords = [];
            docSnap.forEach((doc) => {
                tmpName.push({...doc.data().id,id:doc.id});
                tmpCoords.push({...doc.data().coords,id:doc.id});
            });
            const exName = tmpName.map(obj => obj.id.replace(/[^A-Za-z0-9 ]/g, '').trim());
            const exLat = tmpCoords.map(obj => obj.latitude);
            const exLong = tmpCoords.map(obj => obj.longitude);
            setNamePlace(exName);
            setLocateLatitude(exLat);
            setLocateLongitude(exLong);
        })
    }, []);

    const mapRef = useRef()
    const {startingCords, destinationCords} = state

    const onTest = () => {
        console.log(namePlace)
        console.log(locateLatitude)
        console.log(locateLongitude)
    }

    const onPressLocation = () => {
        navigation.navigate('chooseLocation',{getCordinates: fetchValues})
    }

    const fetchValues = (data) => {
        setState({
            startingCords: {
                latitude: data.pickupCords.latitude,
                longitude: data.pickupCords.longitude,
            },
            destinationCords: {
                latitude: data.destinationCords.latitude,
                longitude: data.destinationCords.longitude,
            },
        })
        console.log("data===>", data)
    }

    return (
        <View style = {styles.container}>
            <View style={{flex:1}}>
                {show ? (
                    <MapView
                    ref={mapRef}
                    provider={PROVIDER_GOOGLE}
                    style = {StyleSheet.absoluteFill}
                    initialRegion={{...startingCords,}}
                    >
                        <Marker 
                            coordinate = {startingCords}
                            title="Starting Point"
                        >
                            {icCurLoc}
                        </Marker>
                        <Marker 
                            coordinate = {destinationCords}
                            title="Destination Point"
                        >
                            {icGreenMarker}
                        </Marker>   
                        <MapViewDirections
                            origin={startingCords}
                            destination={destinationCords}
                            apikey={GOOGLE_MAPS_APIKEY}
                            strokeWidth={3}
                            strokeColor="orange"
                            optimizeWaypoints={true}
                            onReady={result => {
                                mapRef.current.fitToCoordinates(result.coordinates, {
                                    edgePadding: {
                                        right: 30,
                                        bottom: 150,
                                        left: 30,
                                        top: 100,
                                    }
                                })
                            }}
                        />
                    </MapView>
                    
                ) : <MapView
                        ref={mapRef}
                        style={StyleSheet.absoluteFill}
                        provider={PROVIDER_GOOGLE}
                        showsUserLocation={true}
                        followsUserLocation={true}
                        initialRegion={{
                            latitude: startingCords.latitude || 13.361143,
                            longitude: startingCords.longitude || 100.984673,
                            latitudeDelta: 0.03,
                            longitudeDelta: 0.03,
                        }}
                    >
                        {locateLatitude.map((latitude, index) => (
                            <Marker 
                                key={index}
                                coordinate={{
                                    latitude: latitude,
                                    longitude: locateLongitude[index],
                                }}
                                title={namePlace[index]}
                                pinColor={"green"}
                            />
                        ))}
                    </MapView>}
                
            </View>
            <View style= {styles.bottomCard}>
                    <Text>Where are you going..?</Text>
                    <TouchableOpacity 
                        style={styles.inputStyle}
                        onPress={onPressLocation}
                    >
                        <Text>Choose your location</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.inputStyle}
                        onPress={onTest}
                    >
                        <Text>Test</Text>
                    </TouchableOpacity>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        borderWidth: 0,
    },
    bottomCard: {
        backgroundColor: 'white',
        width: '100%',
        padding: 30,
        borderTopEndRadius: 24,
        borderTopStartRadius: 24,
    },
    inputStyle: {
        backgroundColor: 'white',
        borderRadius: 4,
        borderWidth: 1,
        alignItems: 'center',
        height: 48,
        justifyContent: 'center',
        marginTop: 16,
    }
});

export default Home;