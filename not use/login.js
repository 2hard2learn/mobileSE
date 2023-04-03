import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
// import CheckBox from './../node_modules/@react-native-community/checkbox';
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

export const Login= ({navigation}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const handleLogin = () => {
        if (!username) {
          setUsernameError('Username is required');
        } else {
          setUsernameError('');
        }
        if (!password) {
          setPasswordError('Password is required');
        } else {
          setPasswordError('');
        }
      };

  return (
    <View style={styles.appContainer}>
        <Text style={styles.header}>Login</Text>
        <View style={styles.inputContainer}>
            <Text style={styles.inputName}>Username</Text>
            <TextInput 
            style={styles.inputText} 
            placeholder='Username' 
            onChangeText={(text) => setUsername(text)} 
            value={username}/>
            {usernameError ? <Text style={styles.error}>{usernameError}</Text> : null}
            <Text style={styles.space}></Text>

            <Text style={styles.inputName}>Password</Text>
            <TextInput style={styles.inputText} 
            placeholder='Password' 
            secureTextEntry 
            onChangeText={(text) => setPassword(text)} 
            value={password}/>
            {passwordError ? <Text style={styles.error}>{passwordError}</Text> : null}

            {/* <CheckBox disabled={false} value={toggleCheckBox} onValueChange={(newValue) => setToggleCheckBox(newValue)} /> */}
            <View style={styles.buttonStyle}>
                <TouchableOpacity style={styles.button1} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.buttonStyle2}>
                <TouchableOpacity style={styles.button2} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Forget password?</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button2} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Register</Text>
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
        fontSize: 70,
        fontWeight: 'bold',
        fontStyle: 'normal',
        fontFamily: 'Helvetica',
        color: 'black',
        textAlign: 'center',
        top: 20,
        borderRadius: 0,
        borderWidth: 20,
        borderColor: 'transparent',
    },
    inputContainer: {
        // justifyContent: 'space-between',
        textAlign: 'center',
        justifyContent: 'center',
        flex: 1,
        padding: 10,
        // backgroundColor: '#BDCDD6',
        marginVertical: 10,
        borderWidth: 1,
        borderRadius: 30,
    },
    inputName: {
        borderWidth: 0,
        fontSize: 26,
        textAlign: 'justify',
        marginLeft: 5,
        borderBottomWidth: 5,
        borderBottomColor: 'red',
        fontFamily: 'Helvetica',
    },
    inputText: {
        fontSize: 18,
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
    buttonText: {
        color: '#090909',
        fontWeight: 'bold',
        fontSize: 16,
      },
    button1: {
        height: '100%',
        backgroundColor:'#FF9900',
        borderRadius:20,
        justifyContent:'center',
        alignItems:'center',
    },
    button2: {
        height: '60%',
        width: '50%',
        backgroundColor:'#FF9900',
        borderRadius:20,
        justifyContent:'center',
        alignItems:'center',
    },
    error: {
        color: 'red',
        marginBottom: 10,
    },
    space: {
        padding: 5,
    },
});
