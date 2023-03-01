import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { Mechanic_Home } from '../screens/mechanic_home'
import { Mechanic_Select } from '../screens/mechanic_select'
import { Mechanic_Work } from '../screens/mechanic_work'

import { Customer_Edit  } from '../screens/customer_edit'
import { Customer_Home } from '../screens/customer_home'
import { Customer_Map } from '../screens/customer_map'

import { LoginScreen } from '../screens/login_screen'

import { Head_Mechanic_Home } from '../screens/head_mechanic_home'

import { Home } from '../screens/home'
 
const Stack = createNativeStackNavigator()

export const StackNav = () => {
    return (
        <Stack.Navigator
          initialRouteName='Login_Screen'
          screenOptions={
                 
      { headerShown: false }
            }
        >
            <Stack.Screen name="Customer_Edit" component={Customer_Edit} />
            <Stack.Screen name="Customer_Home" component={Customer_Home} />
            <Stack.Screen name="Customer_Map" component={Customer_Map} />

            <Stack.Screen name="Mechanic_Home" component={Mechanic_Home} />
            <Stack.Screen name="Mechanic_Select" component={Mechanic_Select} />
            <Stack.Screen name="Mechanic_Work" component={Mechanic_Work} />

            <Stack.Screen name='Login_Screen' component={LoginScreen} />

            <Stack.Screen name="Head_Mechanic_Home" component={Head_Mechanic_Home} />

            <Stack.Screen name='Home' component={Home} />
        </Stack.Navigator>
    )
}
