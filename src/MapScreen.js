//import liraries
import React, { Component,useState } from 'react';
import { View, Text, StyleSheet,Image, Touchable, TouchableOpacity, TextInput } from 'react-native';
import MapView, { Marker,PROVIDER_GOOGLE } from 'react-native-maps';
import CustomBtn from './components/CustomBtn';
import { useNavigation } from '@react-navigation/native';

// create a component
const MapScreen = (props) => {
    const navigation = useNavigation()
    const latitudeDelta = 0.025
    const longitudeDelta = 0.025

    const [region, setRegion] = useState({
            latitudeDelta,
            longitudeDelta,
            latitude: 13.361143,
            longitude: 100.984673,
    });

    const onChangeValue = (newRegion) => {
        setRegion(newRegion);
    }

    const onDone = () => {
        props.route.params.getCordinates(region)
        navigation.goBack()
    }

    return (
        <View style={styles.container}>
            <MapView
                style={{flex:1}}
                initialRegion = {region}
                provider={PROVIDER_GOOGLE}
                onRegionChangeComplete = {onChangeValue}
            >
                <Marker coordinate={region}>
                    <Image style={{height: 48,width:48}} source={require('./images/pin.png')} />
                </Marker>
            </MapView>
        <View style={styles.bottomCard}>
            <CustomBtn 
                btnText="Done"
                btnStyle={{marginTop: 24}}
                onPress={onDone}
            />
        </View>
        
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width:'100%'
    },
    bottomCard: {
        backgroundColor: 'white',
        width: '100%',
        padding: 30,
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
    }
});

//make this component available to the app
export default MapScreen;
