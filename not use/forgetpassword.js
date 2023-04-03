import { StatusBar } from 'expo-status-bar';
// import CheckBox from './../node_modules/@react-native-community/checkbox';
import React from 'react';
import { StyleSheet,
    Text, 
    View, 
    Button, 
    TextInput, 
    Dimensions, 
    ScrollView, 
    SafeAreaView,
    TouchableOpacity} from 'react-native';
// const [toggleCheckBox, setToggleCheckBox] = useState(false)

export const ForgetPassword= ({navigation}) => {
  return (
    <View style={styles.appContainer}>
        <Text style={styles.header}>Forget Password</Text>
        <View style={styles.inputContainer}>
            <Text style={{fontSize: 24, bottom: 40, fontWeight: '500'}}> Please enter your email below</Text>
            <Text style={{fontSize: 24, bottom: 40, fontWeight: '500'}}> and we will sent you the email</Text>
            <Text style={{fontSize: 24, bottom: 40, fontWeight: '500'}}> to verify.</Text>
            <Text style={styles.inputName}>Email</Text>
            <TextInput style={styles.inputText} placeholder='Username' />
            <Text style={styles.space}></Text>
            <View style={styles.buttonStyle}>
                <TouchableOpacity style={{height: '100%',backgroundColor:'#FF9900',borderRadius:20,justifyContent:'center',alignItems:'center'}}>
                    <Text style = {{fontSize: 16}}>Change Password</Text>
                </TouchableOpacity>
            </View>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    appContainer: {
        padding: 10,
        height: '100%',
        width: '100%',
        backgroundColor: '#EEE9DA',
        // borderTopWidth: 20,
        // borderTopColor: 'white',
        borderWidth: 0,
    },
    header: {
        fontSize: 40,
        fontWeight: 'bold',
        fontStyle: 'normal',
        textAlign: 'center',
        top: 50,
        borderRadius: 0,
        borderWidth: 20,
        borderBottomWidth: 10,
        borderBottomColor: 'black',
        borderColor: 'transparent',
    },
    inputContainer: {
        // justifyContent: 'space-between',
        textAlign: 'center',
        justifyContent: 'center',
        flex: 1,
        padding: 10,
        // backgroundColor: '#BDCDD6',
        marginVertical: 75,
        borderWidth: 1,
        borderRadius: 30,
    },
    inputName: {
        borderWidth: 0,
        fontSize: 24,
        textAlign: 'justify',
        marginLeft: 5,
        borderBottomWidth: 5,
        borderBottomColor: 'red',
    },
    inputText: {
        fontSize: 16,
        fontWeight: 'normal',
        textAlign: 'auto',
        borderWidth: 0,
        borderColor: 'black',
        borderRadius: '5%',
        width: '100%',
        padding: 5,
        borderBottomWidth: 1.5,
    },
    buttonStyle: {
        marginBottom: 20,
        padding: 10,
        justifyContent: 'center',
        textAlign: 'center',
        top: 20,
        borderRadius: 1,
        borderWidth: 0,
        height: '15%',
    },
    buttonStyle2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderWidth: 0,
        height: '15%',
        textAlign: 'center',
        display: 'flex',
    },
    space: {
        padding: 5,
    },
});