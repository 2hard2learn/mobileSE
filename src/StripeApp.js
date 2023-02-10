import React, { useState } from 'react'
import {StripeProvider} from '@stripe/stripe-react-native'
import {View,Text,StyleSheet,TextInput} from 'react-native'

export const StripeApp=()=>{
    const [email,setEmail]=useState()
    return(
        <View style={styles.container}>
            <TextInput
                autoCapitalize='none'
                placeholder='E-mail'
                keyboardType='email-address'
                onChange={value=>setEmail(value.nativeEvent.text)}
                style={styles.input}
            />
        </View>
    )
};

const styles=StyleSheet.create({
    container:{
        flex:1,
        
        justifyContent:'center',
        margin:20,
    },
    input:{
        backgroundColor:"#ffaf",
        borderColor:'#000',
        borderRadius:8,
        fontSize:20,
        height:50,
        width:'80%',
        padding:10,
    
        alignItems:'center',
        justifyContent:'center',

    }
});