//import liraries
import React, { Component, useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, VirtualizedList, Linking, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
//components
import { AddressPickup } from './AddressPickup';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location'
import * as WorkModel from '../../firebase/workModel'
import Constants from 'expo-constants';
import { useSelector } from 'react-redux'
import { getRoughCompassDirection } from 'geolib';

// create a component
export const ChooseLocation = ({navigation,route}) => {

    const [navCur, setNavCur] = useState(true);
    const [state, setState] = useState({
        pickupCords: {},
        destinationCords: {}
    })
    const { pickupCords, destinationCords} = state

    const checkValid = () => {
        if(Object.keys(pickupCords).length === 0) {
            Alert.alert('Please enter your pickup location')
            return false
        }
        if(Object.keys(destinationCords).length === 0) {
            Alert.alert('Please enter your destination location')
            return false
        }
        return true
    }

    const checkValidDestination = () => {
        if(Object.keys(destinationCords).length === 0) {
            Alert.alert('Please enter your destination location')
            return false
        }
        return true
    }

    const onDone = () => {
        const isValid = checkValid()
        console.log('is valid...?',isValid)
        if(isValid){
            Alert.alert("Navigation","This will show you have far you have to drive",
            [
            {
                text: "Cancel",
                style: "cancel"
            },
            {
                text: "Confirm",
                onPress: () => {
                    route.params.getCordinates({
                        pickupCords,
                        destinationCords
                    })
                    navigation.goBack()
                },
            },
            ],
            { cancelable: false}
            );
        }
    }

    // const onAdd = () => {
    //     navigation.navigate('addLocation')
    // }

    // const onDel = () => {
    //     navigation.navigate('delLocation')
    // }

    const onCancel = () => {
        setNavCur(true)
    }

    const navigateCur = () => {
        setNavCur(false);
        const isValidDestination = checkValidDestination()
        if(isValidDestination) {
            let lat = destinationCords.latitude
            let lng = destinationCords.longitude
            const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
            Linking.openURL(url);
        }
    }

    const fetchAddressCords = (lat,lng) => {
        setState({
            ...state, pickupCords: {
                latitude: lat,
                longitude: lng
            }
        });
        // console.log(pickupCords)
    }
    const fetchDestinationCords = (lat,lng) => {
        setState({
            ...state, destinationCords: {
                latitude: lat,
                longitude: lng
            }
        });
        // console.log(destinationCords)
    }

    const userLocation = async () => {
        let {status} = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied')
        }
        let location = await Location.getCurrentPositionAsync({enableHighAccuracy:true})
        let lat = location.coords.latitude
        let lng = location.coords.longitude
        fetchAddressCords(lat,lng)
        setNavCur(false)
    };

    // console.log("props===>",props)
    // console.log("pickup cords==>",pickupCords)
    // console.log("destination cords==>",destinationCords)

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
            <ScrollView
                keyboardShouldPersistTaps='handled'
                style={{backgroundColor: 'white', flex: 1, padding: 24}}
            >
                {navCur ? (
                    <AddressPickup
                    placeholderText="เลือกที่เริ่มต้น"
                    fetchAddress={fetchAddressCords}
                    />
                ) : <TouchableOpacity
                        style = {styles.btnStyle}
                        onPress={onCancel}
                    >
                        <Text styles={styles.textStyle}>Cancel</Text>
                    </TouchableOpacity>}
                <View style = {{marginBottom: 16}} />
                <AddressPickup 
                    placeholderText="เลือกที่ปลายทาง"
                    fetchAddress={fetchDestinationCords}
                />
                <TouchableOpacity 
                    onPress={onDone}
                    style={styles.btnDone}
                >
                    <Text style={styles.textStyle}>Done</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={userLocation}
                    style={styles.btnStyle2}
                >
                    <Text style={styles.textStyle}>From my location</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={navigateCur}
                    style={styles.btnStyle2}
                >
                    <Text style={styles.textStyle}>GoogleMap navigation</Text>
                </TouchableOpacity>
                {/* <View style={{flexDirection:'row'}}>
                <TouchableOpacity 
                    onPress={onAdd}
                    style={styles.btnStyle3}
                >
                    <Text style={styles.textStyle}>Add</Text>
                </TouchableOpacity>
                <View style={{marginLeft:5}}></View>
                <TouchableOpacity 
                    onPress={onDel}
                    style={styles.btnStyle3}
                >
                    <Text style={styles.textStyle}>Delete</Text>
                </TouchableOpacity>
                </View> */}
            </ScrollView>
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
    btnStyle: {
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FC3B3B',
        paddingHorizontal: 16,
        borderWidth: 1,
        borderRadius: 15,
        opacity: .7,
    },
    btnStyle2: {
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFB156',
        paddingHorizontal: 0,
        borderWidth: 1,
        borderRadius: 15,
        marginTop: 24,
    },
    btnStyle3: {
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFB156',
        paddingHorizontal: 16,
        borderWidth: 1,
        borderRadius: 15,
        marginTop: 24,
        width: '49%'
    },
    btnDone: {
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00D662',
        paddingHorizontal: 16,
        borderWidth: 1,
        borderRadius: 15,
        marginTop: 24,
    },
    textStyle: {
        fontFamily:'Sound-Rounded',
        fontSize: 20,
        color:'white',
    },
});

