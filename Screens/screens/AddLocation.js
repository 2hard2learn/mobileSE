//import liraries
import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Alert, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Constants from 'expo-constants';
import { Ionicons } from '@expo/vector-icons';
import * as WorkModel from '../../firebase/workModel'
import { useSelector } from 'react-redux'
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';

// create a component
export const AddLocation = ({navigation}) => {
    const [newLocation, setNewLocation] = useState(false);
    const [show, setShow] = useState(false);
    const Info = useSelector((state) => state.auths)

    const [locationLatitude, setlocationLatitude] = useState('');
    const [locationLongitude, setlocationLongitude] = useState('');

    const edit_location_success = () => {
        navigation.goBack();
    }
    
    const edit_location_unsuccess = (msg) => {
        Alert.alert(msg)
    }

    const create = () => {
        let Location = {
            'lat':locationLatitude.toString(),
            'lng':locationLongitude.toString(),
        }
        // console.log(WorkModel)
        WorkModel.editGarageLoc(Info.profile,Location,edit_location_success,edit_location_unsuccess)
    }

    

    const checkValid = () => {
        if(!newLocation){
            showError('Please find your location first')
            return false
        }
        return true
    }

    const onDone = () => {
        const isValid = checkValid()
        console.log('is valid...?',isValid)
        if (isValid){
            Alert.alert("Confirmation","Are you sure about the location?",
            [
            {
                text: "Cancel",
                style: "cancel"
            },
            {
                text: "Confirm",
                onPress: () => {
                    create();
                },
            },
            ],
            { cancelable: false}
            );
            
        }
    };

    const onFind = () => {
        navigation.navigate('MapScreen',{getCordinates: fetchValues});
        setShow(true);
    };

    const fetchValues = (data) => {
        setlocationLatitude(data.latitude);
        setlocationLongitude(data.longitude);
        setNewLocation(true);
        // console.log(data)
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
                <Text style={styles.topHeader}>แก้ไขที่อยู่อู่</Text>
            </View>
            <ScrollView
                keyboardShouldPersistTaps='handled'
                style={{backgroundColor: 'white', flex: 1, padding: 24, marginTop:0}}
            >
            {show ? (<View style={{flexDirection:'row',justifyContent:'space-around'}}>
                <View style={{borderWidth:0}}>
                    <Text style={styles.textinfo}>Latitude</Text>
                    <View style={styles.view1}>
                        <Text style={{borderWidth:0,fontSize:14,color:'gray',fontFamily:'Sound-Rounded'}}>{locationLatitude}</Text>
                    </View>
                </View>
                <View style={{borderWidth:0}}>
                    <Text style={styles.textinfo}>Longitude</Text>
                    <View style={styles.view1}>
                        <Text style={{borderWidth:0,fontSize:14,color:'gray',fontFamily:'Sound-Rounded'}}>{locationLatitude}</Text>
                    </View>
                </View>
            </View>) : null}
            
                {/* <TextInput 
                    value={locationName}
                    onChangeText={(locationName) => {setLocationName(locationName)}} 
                    placeholder='Location Name' 
                    style={styles.addLocationButton}
                ></TextInput> */}
                <TouchableOpacity 
                    onPress={onDone}
                    style={styles.btnStyle}
                >
                    <Text style={styles.textStyle}>Done</Text>
                </TouchableOpacity>
                {show ? (
                    <MapView
                    style={{height:225, marginTop:24}}
                    provider={PROVIDER_GOOGLE}
                    region={{
                        latitude: parseFloat(locationLatitude) || 13.121535126979689,
                        longitude: parseFloat(locationLongitude) || 100.91912181391285,
                        latitudeDelta: 0.004,
                        longitudeDelta: 0.005,
                    }}
                    onRegionChangeComplete={fetchValues}
                    scrollEnabled={false}
                    zoomEnabled={false}>
                    {newLocation ? (
                        <Marker 
                            coordinate={{
                                latitude: locationLatitude,
                                longitude: locationLongitude,
                            }}
                            pinColor='red'
                        />
                    ) : null}
                </MapView>
                ) : null}
                <TouchableOpacity 
                    onPress={onFind}
                    style={styles.btnStyle2}
                >
                    <Text style={styles.textStyle}>Find your location</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:'space-between',
        paddingTop: Constants.statusBarHeight
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
    view1: {
        borderWidth:0,
        backgroundColor:'white',
        width:150,
        height:30,
        borderRadius:10,
        justifyContent:'center'
    },
    textinfo: {
        borderWidth:0,
        fontSize:18,
        color:'black',
        fontFamily:'Sound-Rounded',
    },
    latlng: {
        opacity:.3
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
        fontSize: 20,
        color:'white',
    },
});
