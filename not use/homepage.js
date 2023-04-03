import * as React from 'react';
import { StyleSheet,
    Text, 
    View, 
    Button, 
    TextInput, 
    Dimensions, 
    ScrollView, 
    SafeAreaView,
    TouchableOpacity} from 'react-native';
import Svg, {Circle} from 'react-native-svg';
import { SvgUri } from 'react-native-svg';

export const HomePage=() => {
    return (
        
        <View style = {styles.appContainer}>
            <View style = {styles.topContainer}>
                <TouchableOpacity style = {styles.backButton}>
                    <SvgUri
                        width= {40}
                        height= {40}
                        uri="https://www.svgrepo.com/show/416120/arrow-back-basic.svg"
                    />
                </TouchableOpacity>
                <Text style = {{borderWidth: 1, fontSize: 24, top: 10, height: 40}}>
                    อู่รถที่อยู่ใกล้ๆ
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    appContainer: {
        flex: 1, 
        borderWidth: 1, 
        justifyContent: 'center',
        width: '98%', 
        top: 20,
    },

    topContainer: {
        borderWidth: 1,
        flex: 1,
        justifyContent: 'flex-start',
        textAlign: 'center',
        marginLeft: 3,
        flexDirection: 'row',
        marginBottom: 600,
        backgroundColor: '#05C3FF',
    },

    backButton: {
        borderWidth: 1,
        height: 40,
        width: 40,
        top:10, 
        backgroundColor: '#FF9900',
        borderRadius: 10, 
        borderColor: '#FF9900'
    }
});