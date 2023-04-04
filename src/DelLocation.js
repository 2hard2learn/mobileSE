//import liraries
import React, { Component, useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Image, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomBtn from './components/CustomBtn';
import { showError, showSuccess } from './helper/helpFunction';
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore"; 
import { db } from './../firestore/config';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';

// create a component
const DelLocation = () => {
    const navigation = useNavigation()

    const [searchText, setSearchText] = useState('');
    const [showFilter, setShowFilter] = useState(false);
    const [show, setShow] = useState(false);
    const [onPressFilter, setOnPressFilter] = useState(false);
    const [selectedPlace, setSelectedPlace] = useState('');
    const [selectedLatitude, setSelectedLatitude] = useState('');
    const [selectedLongitude, setSelectedLongitude] = useState('');

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

    function deletee () {
        //delete data
        deleteDoc(doc(db,'location',selectedPlace))
        .then(() => {
            console.log('data deleted');
        }).catch((error) => {
            console.log(error);
        });
    }

    const checkValid = () => {
        if(Object.keys(selectedPlace).length === 0){
            showError('Please selected right location')
            return false
        }
        return true
    };

    const dataToDel = (dataID) => {
        setSelectedPlace(dataID);
        setShow(true)
    };

    const onDel = () => {
        const isValid = checkValid()
        console.log('is valid...?',isValid)
        if (isValid) {
            deletee();
            showSuccess('Deleted');
            setTimeout(() => navigation.navigate('home'),500);
        }
        // console.log(selectedPlace)
    };

    const filteredPlaces = namePlace.filter((place) =>
        place.toLowerCase().includes(searchText.toLowerCase())
    );

    const onTest = () => {
        console.log(selectedPlace)
        // console.log(selectedLatitude)
        // console.log(selectedLongitude)
    };

    const onAdd = () => {
        navigation.navigate('addLocation')
    }

    return (
        <View style={styles.container}>
            <ScrollView
                keyboardShouldPersistTaps='handled'
                style={{backgroundColor: 'white', flex: 1, padding: 24}}
            >
            <TouchableOpacity onPress={() => {setShowFilter(true)}}>
                <TextInput
                    placeholder={"Delete"}
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
                        dataToDel(item);
                        setSelectedLatitude(locateLatitude[index])
                        setSelectedLongitude(locateLongitude[index])
                    }}>
                        <Text style={{fontSize:14}}>{item}</Text>
                    </TouchableOpacity>
                )}
                />
            )}
            {show ? (
                    <MapView
                    style={{height:225, marginTop:24}}
                    provider={PROVIDER_GOOGLE}
                    region={{
                        latitude: parseFloat(selectedLatitude) || 13.121535126979689,
                        longitude: parseFloat(selectedLongitude) || 100.91912181391285,
                        latitudeDelta: 0.004,
                        longitudeDelta: 0.005,
                    }}
                    onRegionChangeComplete={dataToDel}
                    scrollEnabled={false}
                    zoomEnabled={false}>
                        <Marker 
                            coordinate={{
                                latitude: selectedLatitude,
                                longitude: selectedLongitude,
                            }}
                            pinColor={'green'}
                        />


                </MapView>
                ) : null}
            <View style = {{marginBottom: 16}} />
            <CustomBtn onPress={onDel} btnText="Delete this location"/>
            <View style = {{marginBottom: 16}} />
            <CustomBtn onPress={onTest} btnText="test"/>
            <CustomBtn onPress={onAdd} btnText="Add"/>
            </ScrollView>
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
export default DelLocation;
