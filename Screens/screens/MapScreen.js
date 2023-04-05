//import liraries
import React, { Component,useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet,Image, Touchable, TouchableOpacity, TextInput } from 'react-native';
import MapView, { Marker,PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location'
import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';

// create a component
export const MapScreen = ({navigation,route}) => {
    const mapViewRef = useRef(null);
    const latitudeDelta = 0.025
    const longitudeDelta = 0.025

    const [region, setRegion] = useState({
            latitude: 13.121535126979689,
            longitude: 100.91912181391285,
            latitudeDelta,
            longitudeDelta,
    });

    const  userLocation = async () => {
        let {status} = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied')
        }
        let location = await Location.getCurrentPositionAsync({enableHighAccuracy:true})
        setRegion({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: latitudeDelta,
            longitudeDelta: longitudeDelta,
        });
        mapViewRef.current.animateToRegion({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
        },
        1000
        );
        // console.log(location.coords.latitude, location.coords.longitude)
    };
    
    // useEffect(()=> {
    //     userLocation();
    // }, []);

    const onChangeValue = (newRegion) => {
        setRegion(newRegion);
    };

    // const onMyLoc = () => {
    //     userLocation()
        
    // }

    const onDone = () => {
        route.params.getCordinates(region)
        navigation.goBack()
    };

    return (
        <View style={styles.container}>
            <View style={styles.topCard}>
                <TouchableOpacity style={styles.topCardbtn}
                    onPress={()=>{
                        navigation.goBack()
                    }}
                    
                >
                    <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.topHeader}>เลือกที่อยู่อู่</Text>
            </View>
            <MapView
                style={{flex:1}}
                initialRegion = {region}
                provider={PROVIDER_GOOGLE}
                showsUserLocation={true}
                onRegionChangeComplete = {onChangeValue}
                ref={mapViewRef}
            >
                <Marker coordinate={region} pinColor='red'/>

            </MapView>
        <View style={styles.bottomCard}>
            <TouchableOpacity 
                onPress={userLocation}
                style={styles.btnStyle2}
            >
                <Text style={styles.textStyle}>My location</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                onPress={onDone}
                style={styles.btnStyle}
            >
                <Text style={styles.textStyle}>Done</Text>
            </TouchableOpacity>
        </View>
        
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:'space-between',
        paddingTop: Constants.statusBarHeight,
    },
    topCard: {
        height:80,
        backgroundColor:'#05C3FF',
        alignItems:'center',
        flexDirection:'row'
    },
    topCardbtn: {
        width:50,
        height:50,
        backgroundColor:'#FFA133',
        marginLeft:10,
        borderRadius:10,
        justifyContent:'center',
        alignItems:'center',
    },
    topHeader: {
        borderWidth:0,
        fontSize:25,
        color:'white',
        marginLeft:20,
        fontFamily:'Sound-Rounded',
    },
    bottomCard: {
        backgroundColor: '#05C3FF',
        width: '100%',
        padding: 5,
        borderTopEndRadius: 20,
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
    },
    btnStyle: {
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00D662',
        paddingHorizontal: 16,
        borderWidth: 1,
        borderRadius: 15,
        marginTop: 24,
    },
    btnStyle2: {
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFB156',
        paddingHorizontal: 16,
        borderWidth: 1,
        borderRadius: 15,
        marginTop: 24,
    },
    textStyle: {
        fontFamily:'Sound-Rounded',
        fontSize: 16,
        color:'white',
    },
});

