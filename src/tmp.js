//import liraries
import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';

// create a component
const tmp = () => {
    return (
        <View style={styles.container}>
            <Text>tmp</Text>
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
export default tmp;
