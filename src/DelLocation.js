//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { db } from './../firestore/config';

// create a component
const DelLocation = () => {
    return (
        <View style={styles.container}>
            <Text>DelLocation</Text>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

//make this component available to the app
export default DelLocation;
