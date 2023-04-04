//import liraries
import React, { Component, useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, VirtualizedList, Linking, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
//components
import AddressPickup from './components/AddressPickup';
import CustomBtn from './components/CustomBtn';
import { showError, showSuccess } from './helper/helpFunction';

// create a component
const ChooseLocation = (props) => {
    const navigation = useNavigation()

    const [navCur, setNavCur] = useState(true);
    const [state, setState] = useState({
        pickupCords: {},
        destinationCords: {}
    })
    const { pickupCords, destinationCords} = state

    const checkValid = () => {
        if(Object.keys(pickupCords).length === 0) {
            showError('Please enter your pickup location')
            return false
        }
        if(Object.keys(destinationCords).length === 0) {
            showError('Please enter your destination location')
            return false
        }
        return true
    }

    const checkValidDestination = () => {
        if(Object.keys(destinationCords).length === 0) {
            showError('Please enter your destination location')
            return false
        }
        return true
    }

    const onDone = () => {
        const isValid = checkValid()
        console.log('is valid...?',isValid)
        if(isValid){
            props.route.params.getCordinates({
                pickupCords,
                destinationCords
            })
            showSuccess("You can back now")
            navigation.goBack()
        }
    }

    const onAdd = () => {
        navigation.navigate('addLocation')
    }

    const onDel = () => {
        navigation.navigate('delLocation')
    }

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
        })
    }
    const fetchDestinationCords = (lat,lng) => {
        setState({
            ...state, destinationCords: {
                latitude: lat,
                longitude: lng
            }
        });
        
    }

    // console.log("props===>",props)
    // console.log("pickup cords==>",pickupCords)
    // console.log("destination cords==>",destinationCords)

    return (
        <View style={styles.container}>
            <ScrollView
                keyboardShouldPersistTaps='handled'
                style={{backgroundColor: 'white', flex: 1, padding: 24}}
            >
                {navCur ? (
                    <AddressPickup
                    placeholderText="Enter Pickup Location"
                    fetchAddress={fetchAddressCords}
                    />
                ) : <TouchableOpacity
                        style = {styles.btnStyle}
                        onPress={onCancel}
                    >
                        <Text>Cancel</Text>
                    </TouchableOpacity>}
                <View style = {{marginBottom: 16}} />
                <AddressPickup 
                    placeholderText="Enter Destination Location"
                    fetchAddress={fetchDestinationCords}
                />
                <CustomBtn 
                    btnText="Navigate from current position"
                    btnStyle={{marginTop: 24}}
                    onPress={navigateCur}
                />
                <CustomBtn 
                    btnText="Done"
                    btnStyle={{marginTop: 24}}
                    onPress={onDone}
                />
                <View style={{flexDirection:'row'}}>
                <CustomBtn 
                    btnText="Add"
                    btnStyle={{marginTop: 24,width:'49%'}}
                    onPress={onAdd}
                />
                <View style={{marginLeft:5}}></View>
                <CustomBtn 
                    btnText="Delete"
                    btnStyle={{marginTop: 24,width:'49%'}}
                    onPress={onDel}
                />
                </View>
            </ScrollView>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    btnStyle: {
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingHorizontal: 16,
        borderWidth: 1,
        borderRadius: 15,
        borderColor:'gray',
        opacity: .5
    }
});

//make this component available to the app
export default ChooseLocation;
