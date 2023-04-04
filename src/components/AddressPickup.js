//import liraries
import React, { Component, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { Marker } from 'react-native-maps';
import CustomBtn from './CustomBtn';
import { doc, setDoc, getDocs, collection, where, query, getDoc } from "firebase/firestore"; 
import { db } from './../../firestore/config';
import FlashMessage from 'react-native-flash-message';


// create a component
const AddressPickup = ({placeholderText,fetchAddress}) => {
    const locationRef = 'location';

    const [searchText, setSearchText] = useState('');
    const [showFilter, setShowFilter] = useState(false);
    const [onPressFilter, setOnPressFilter] = useState(false);

    const [namePlace, setNamePlace] = useState([]);
    const [locateLatitude, setLocateLatitude] = useState([]);
    const [locateLongitude, setLocateLongitude] = useState([]);

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

    const onTest = () => {
        // Places()
        // getCoordinate()
        console.log(filteredPlaces)
    };

    const onDoneee = () => {
        console.log(namePlace)
        console.log(locateLatitude)
        console.log(locateLongitude)
    };

    // const AddLocation = () => {
    //     // submit data
    //     setDoc(doc(db, "location", Places.name),Places ).then(() => {
    //         console.log('data submitted');
    //     }).catch((error) => {
    //         console.log(error);
    //     });
    // };

    const onPressAddress = (index) => {
        // console.log("details====>",details)
        // const lat = details.geometry.location.lat
        // const lng = details.geometry.location.lng
        fetchAddress(locateLatitude[index], locateLongitude[index]);
    };

    // const onSuggestionPress = (place) => {
    //     setSearchText(place);
    //     setShowFilter(false);
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
            {/* {namePlace.map((place, index) => (
                console.log(index),
                <Marker 
                key = {index} 
                coordinate={{latitude: locateLatitude[index],longitude: locateLongitude[index]}} 
                onPress = {() => onPressAddress(index)} 
                />
            ))} */}
            
            {/* <CustomBtn onPress={onTest} btnText="test button"/>
            <CustomBtn onPress={onDoneee} btnText="output"/> */}
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
});

//make this component available to the app
export default AddressPickup;
