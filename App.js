import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from "@react-navigation/native-stack"
import Home from './src/pages/Home';
import Login from './src/pages/Login';
import Register from './src/pages/Register';
import { useState } from 'react';
import { AppRegistry } from 'react-native';


const Stack = createNativeStackNavigator();
export default function App() {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const EnteranceStack = () => {
  //   return (
  //     <Stack.Navigator>
  //         <Stack.Screen name="Login" component={Login} />
  //         <Stack.Screen name="Register" component={Register} />
  //       </Stack.Navigator>
  //   )
  // }
  // const HomeStack = () => {
  //   return (
  //     <Stack.Navigator>
  //         <Stack.Screen name="Home" component={Home} />
  //       </Stack.Navigator>
  //   )
  // }
  return (
    <NavigationContainer>
      <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}


