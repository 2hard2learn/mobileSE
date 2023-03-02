import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { LoginScreen } from '../screens/login_screen'

import { Home } from '../screens/home'

import { Mechanic_Check_1 } from '../screens/mechanic_check_1'
import { Mechanic_Check_2 } from '../screens/mechanic_check_2'
import { Mechanic_Fix_1 } from '../screens/mechanic_fix_1'
import { Mechanic_Fix_2 } from '../screens/mechanic_fix_2'

import { Head_Mechanic_Assign_1 } from '../screens/head_mechanic_assign_1'

import { Head_Mechanic_Confirm_1 } from '../screens/head_mechanic_confirm_1'

import { Cashier_Checkbill_1 } from '../screens/cashier_checkbill_1'

import { Customer_Edit  } from '../screens/customer_edit'
import { Customer_Home } from '../screens/customer_home'
import { Customer_Map } from '../screens/customer_map'

import { Head_Mechanic_Home } from '../screens/head_mechanic_home'

 
const Stack = createNativeStackNavigator()

export const StackNav = () => {
    return (
        <Stack.Navigator
          initialRouteName='Login_Screen'
          screenOptions={
                 
      { headerShown: false }
            }
        >
            <Stack.Screen name='Login_Screen' component={LoginScreen} />

            <Stack.Screen name='Home' component={Home} />

            <Stack.Screen name="Customer_Edit" component={Customer_Edit} />
            <Stack.Screen name="Customer_Home" component={Customer_Home} />
            <Stack.Screen name="Customer_Map" component={Customer_Map} />

            <Stack.Screen name="Mechanic_Check_1" component={Mechanic_Check_1} />
            <Stack.Screen name="Mechanic_Check_2" component={Mechanic_Check_2} />
            <Stack.Screen name="Mechanic_Fix_1" component={Mechanic_Fix_1} />
            <Stack.Screen name="Mechanic_Fix_2" component={Mechanic_Fix_2} />

            <Stack.Screen name="Head_Mechanic_Assign_1" component={Head_Mechanic_Assign_1} />
            <Stack.Screen name="Head_Mechanic_Confirm_1" component={Head_Mechanic_Confirm_1} />

            <Stack.Screen name="Cashier_Checkbill_1" component={Cashier_Checkbill_1} />
        </Stack.Navigator>
    )
}
