import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Login} from './src/login';
import { Register } from './src/register';
import { ForgetPassword } from './src/forgetpassword';
import { Policy } from './src/policy';
import { HomePage } from './src/homepage';
import { NavigationContainer } from '@react-navigation/native';
import { StackNav } from './navigators/StackNav';
import { Map } from './src/map';

import { createNativeStackNavigator } from '@react-navigation/native-stack';


export default function App() {

  return (
    <View style = {styles.container}>
      <Map/>
      {/* <LoginScreen/> */}
      {/* <HomePage/> */}
      {/* <Login /> */}
      {/* <Policy/> */}
      {/* <Register/> */}
      {/* <ForgetPassword/> */}
      {/* <NavigationContainer>
        <StackNav/>
      </NavigationContainer> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    borderWidth: 0,
    borderColor: "red",
    marginLeft: 0,
  },
});