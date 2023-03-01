import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet,Text,View,Image,TouchableOpacity } from 'react-native';
import App from '../App';

const Tab = createBottomTabNavigator();

const CustomTabBarButton = ({children,onPress}) => {
    <TouchableOpacity
        style={{
            top:-30,
            justifyContent:'center',
            alignItems:'center',
            ...styles.shadow
        }}
        onPress={onPress}
    >
        <View style={{
            width:70,
            height:70,
            borderRadius:35,
            backgroundColor:'#e32f45'
        }}>
            {children}
        </View>

    </TouchableOpacity>
}

const Tabs = () => {
    return(
        <Tab.Navigator
            tabBarOptions={{
                showLabel: false,
                style:{
                    position:'absolute',
                    bottom:25,
                    left:20,
                    right:20,
                    elevation:0,
                    backgroundColor:'#ffffff',
                    borderRadius:15,
                    height:90,
                    ...styles.shadow
                }
            }}
        >
            <Tab.Screen name='Home' component={App} 
                options={{
                    tabBarButton: (props) => (
                        <CustomTabBarButton {...props} />
                    )
                }}
            />
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    shadow:{
        shadowColor:'#7F5DF0',
        shadowOffset:{
            width:0,
            height:10,
        },
        shadowOpacity:0.25,
        shadowRadius:3.5,
        elevation:5
    }
})

export default Tabs;