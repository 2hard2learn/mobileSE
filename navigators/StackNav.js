import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text } from "react-native";
import { Login } from "../src/login";

const Stack = createNativeStackNavigator()

export const StackNav = () => {
    return (
        <Stack.Navigator
          initialRouteName='Login'
          screenOptions={

      { headerShown: false }
            }
        >
            <Stack.Screen name="Login" component={Login} />

        </Stack.Navigator>
    )
}