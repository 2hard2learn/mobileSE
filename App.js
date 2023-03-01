import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { StackNav } from './Screens/navigators/StackNav'
import Constants from 'expo-constants';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import {store} from './redux/store'


SplashScreen.preventAutoHideAsync();


export default function App() {
  const [fontsLoaded] = useFonts({
    'Sound-Rounded': require('./assets/fonts/FC-Sound-Rounded.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider onLayout={onLayoutRootView}>
      <Provider store={store}>
        <NavigationContainer>
          <StackNav/>
        </NavigationContainer>
      </Provider>
    </SafeAreaProvider>
  );
}

