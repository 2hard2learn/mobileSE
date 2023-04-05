//import liraries
import React, { Component, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { Marker } from 'react-native-maps';
// import { doc, setDoc, getDocs, collection, where, query, getDoc } from "firebase/firestore"; 
// import { db } from './../../firestore/config';
import FlashMessage from 'react-native-flash-message';
import * as WorkModel from '../../firebase/workModel'


// create a component
export const AddressPickup = ({placeholderText,fetchAddress}) => {
    const locationRef = 'location';

    const [searchText, setSearchText] = useState('');
    const [showFilter, setShowFilter] = useState(false);
    const [onPressFilter, setOnPressFilter] = useState(false);

    const [namePlace, setNamePlace] = useState([]);
    const [locateLatitude, setLocateLatitude] = useState([]);
    const [locateLongitude, setLocateLongitude] = useState([]);

    const get_name_success = (name) => {
        setNamePlace(name)
        // console.log(namePlace)
    }

    const get_lat_success = (lat) => {
        let intstr = []
        lat.forEach((data) => {
            intstr.push(parseFloat(data))
        });
        setLocateLatitude(intstr)
        // console.log(locateLatitude)
    }

    const get_lng_success = (lng) => {
        let intstr = []
        lng.forEach((data) => {
            intstr.push(parseFloat(data))
        });
        setLocateLongitude(intstr)
        // console.log(locateLongitude)
    }

    const get_unsuccess = () => {
        console.log('no')
    }

    useEffect(() => {
        WorkModel.getMap('getName',get_name_success,get_unsuccess)
        WorkModel.getMap('getLat',get_lat_success,get_unsuccess)
        WorkModel.getMap('getLng',get_lng_success,get_unsuccess)
    }, []);

    // const onTest = () => {
    //     console.log(fetchAddress())
    // };

    // const onDoneee = () => {
    //     console.log(namePlace)
    //     console.log(locateLatitude)
    //     console.log(locateLongitude)
    // };

    const filteredPlaces = namePlace.filter((place) =>
        place.toLowerCase().includes(searchText.toLowerCase())
    );


    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => {setShowFilter(true)}}>
                <TextInput
                    placeholder={placeholderText}
                    value={searchText}
                    onChangeText={setSearchText}
                    style={styles.textInputStyle}
                    onFocus={() => {setShowFilter(true)}}
                    onBlur={() => {
                        if (!onPressFilter) {
                            setTimeout(() => setShowFilter(false),2000);
                        }
                    }}
                />
            </TouchableOpacity>
            {showFilter && (
                <FlatList 
                style = {styles.filterBoxStyle}
                data={filteredPlaces}
                keyExtractor={(item,index) => index.toString()}
                renderItem={({item}) => (
                    <TouchableOpacity style = {styles.filterTextStyle} onPress={() => {
                        setOnPressFilter(true);
                        setSearchText(item)
                        setShowFilter(false)
                        const index = namePlace.indexOf(item);
                        fetchAddress(locateLatitude[index], locateLongitude[index]);
                    }}>
                        <Text style={{fontSize:14}}>{item}</Text>
                    </TouchableOpacity>
                )}
                />
            )}
            
            {/* { <GooglePlacesAutocomplete
                placeholder={placeholderText}
                onPress={onPressAddress}
                fetchDetails={true}
                query={{
                    key: GOOGLE_MAPS_APIKEY,
                    language: 'en',
                }}
                styles={{
                    textInputContainer: styles.containerStyle,
                    textInput: styles.textInputStyle
                }}
            /> } */}
            {/* <TouchableOpacity 
                onPress={onTest}
                style={styles.btnStyle2}
            >
                <Text style={styles.textStyle}>Test button</Text>
            </TouchableOpacity> */}
        </View>
    );
};


// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerStyle: {
        backgroundColor: 'white'
    },
    textInputStyle: {
        height: 48,
        color: 'black',
        fontSize: 16,
        paddingLeft: 8,
        backgroundColor: '#F3F3F3'
    },
    filterBoxStyle: {
        borderWidth:1, 
        padding: 10,
        borderRadius: 10,
    },
    filterTextStyle: {
        padding: 5,
        borderBottomWidth: 1,
    },
    addLocationButton: {
        borderWidth:1, 
        padding: 10,
        borderRadius: 10,
    },
    addLocationButtonText: {
        padding: 5,
        borderBottomWidth: 1,
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

//make this component available to the app

