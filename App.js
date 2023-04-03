import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/Home';
import ChooseLocation from './src/ChooseLocation';
import AddLocation from './src/AddLocation';
import MapScreen from './src/MapScreen';

import FlashMessage from 'react-native-flash-message';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="home" component = {Home} />
        <Stack.Screen name="chooseLocation" component={ChooseLocation} />
        <Stack.Screen name="addLocation" component={AddLocation} />
        <Stack.Screen name="mapScreen" component={MapScreen} />
      </Stack.Navigator>
      <FlashMessage
        position='top'
      />
    </NavigationContainer>
  )
}

export default App;