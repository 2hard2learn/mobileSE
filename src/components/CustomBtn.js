//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

// create a component
const CustomBtn = ({
    onPress = () => { },
    btnStyle = {},
    btnText
}) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{...styles.btnStyle, ...btnStyle}}
        >
            <Text>{btnText}</Text>
        </TouchableOpacity>
    );
};

// define your styles
const styles = StyleSheet.create({
    btnStyle: {
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingHorizontal: 16,
        borderWidth: 1,
        borderRadius: 15,
    }
});

//make this component available to the app
export default CustomBtn;
