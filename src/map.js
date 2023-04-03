import react, {Component, useState, useRef} from "react";
import { View, Text, StyleSheet } from "react-native";
import MapView, { Marker} from 'react-native-maps';
import { GOOGLE_MAPS_APIKEY } from "./constants/googleMapKey";
import MapViewDirections from "react-native-maps-directions";

export const Map = () => {
    const [state, setState] = useState({
        pickupCords: {
            latitude: 13.361143,
            longitude: 100.984673,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        },
        droplocationCords: {
            latitude: 13.736717,
            longitude: 100.523186,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        }
    })

    const mapRef = useRef()

    const {pickupCords, droplocationCords} = state

    return (
        <View style = {styles.container}>
            <MapView
                ref={mapRef}
                style = {StyleSheet.absoluteFill}
                initialRegion={pickupCords}
            >
                <Marker 
                    coordinate = {pickupCords}
                />
                <Marker 
                    coordinate = {droplocationCords}
                />
                <MapViewDirections
                    origin={pickupCords}
                    destination={droplocationCords}
                    apikey={GOOGLE_MAPS_APIKEY}
                    strokeWidth={3}
                    strokeColor="orange"
                    optimizeWaypoints={true}
                    onReady={result => {
                        mapRef.current.fitToCoordinates(result.coordinates, {
                            edgePadding: {
                                right: 30,
                                bottom: 300,
                                left: 30,
                                top: 100,
                            }
                        })
                    }}
                />
            </MapView>
        </View>
    )

    // //test
    // return(
    // <MapView style = {StyleSheet.absoluteFill }
    //     initialRegion={{
    //     latitude: 37.78825,
    //     longitude: -122.4324,
    //     latitudeDelta: 0.0922,
    //     longitudeDelta: 0.0421,
    // }}
    // />
    // )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        borderWidth: 0,
    }
})