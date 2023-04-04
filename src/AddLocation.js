//import liraries
import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomBtn from './components/CustomBtn';
import { showError, showSuccess } from './helper/helpFunction';
import { doc, setDoc } from "firebase/firestore"; 
import { db } from './../firestore/config';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';

// create a component
const AddLocation = () => {
    const navigation = useNavigation()
    const [newLocation, setNewLocation] = useState(false);
    const [show, setShow] = useState(false);

    const [locationName, setLocationName] = useState('');
    const [locationLatitude, setlocationLatitude] = useState('');
    const [locationLongitude, setlocationLongitude] = useState('');

    function create () {
        const lat = parseFloat(locationLatitude);
        const lng = parseFloat(locationLongitude);

        // submit data
        setDoc(doc(db, "location", locationName), {
        name: locationName,
        coords: {latitude: lat,longitude: lng},
        }).then(() => {
            console.log('data submitted');
        }).catch((error) => {
            console.log(error);
        });
    }

    const checkValid = () => {
        if(Object.keys(locationName).length === 0){
            showError('Please enter name')
            return false
        }
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
            create();
            showSuccess('Complete');
            navigation.navigate('home');
        }
    };

    const onFind = () => {
        navigation.navigate('mapScreen',{getCordinates: fetchValues})
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
            <ScrollView
                keyboardShouldPersistTaps='handled'
                style={{backgroundColor: 'white', flex: 1, padding: 24}}
            >
                <TextInput 
                    value={locationName}
                    onChangeText={(locationName) => {setLocationName(locationName)}} 
                    placeholder='Location Name' 
                    style={styles.addLocationButton}
                ></TextInput>
                <CustomBtn 
                    btnText="Done"
                    btnStyle={{marginTop: 24}}
                    onPress={onDone}
                />
                <View style = {{marginBottom: 16}} />
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
                        >
                            <Image style={{height: 48,width:48}} source={require('./images/pin.png')} />
                        </Marker>
                    ) : null}
                </MapView>
                ) : null}
                <CustomBtn 
                    btnText="Find your location"
                    btnStyle={{marginTop: 24}}
                    onPress={onFind}
                />           
            </ScrollView>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    addLocationButton: {
        borderWidth:1, 
        padding: 10,
        borderRadius: 10,
        height: 50,
    },
    latlng: {
        opacity:.3
    },
});

//make this component available to the app
export default AddLocation;
