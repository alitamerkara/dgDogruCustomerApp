import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Entry from './src/pages/Entry';
import Login from './src/pages/Login';
import Register from './src/pages/Register';
import Vertification from './src/pages/Vertification';
import { auth } from './firebaseConfig';
import { signOut } from 'firebase/auth';
import { Alert, Image } from 'react-native';
import Offer from './src/pages/Offer';
import Form from './src/pages/Form';
import Request from './src/pages/Request';
import Slider from './src/pages/Slider';
import SecondSlider from './src/pages/SecondSlider';
import AdminLogin from './src/pages/AdminLogin'; 
import AdminHome from './src/pages/AdminHome';
import AdminRequests from './src/pages/AdminRequests';
import AdminNewCustomers from './src/pages/AdminNewCustomers';
import UserHome from './src/pages/UserHome';
import OilRequest from './src/pages/OilRequest';

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return () => unsubscribe(); // Component unmount olduğunda dinleyiciyi temizle
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      Alert.alert('Çıkış Yapıldı', 'Başarıyla çıkış yaptınız.');
    } catch (error) {
      Alert.alert('Çıkış Hatası', error.message);
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerTitle: () => (
          <Image
            source={require("./assets/dggeri.png")}
            style={{ width: 85, height: 85, marginTop:-27 }}
            resizeMode="contain"
          />
        ),
      }}>
            <Stack.Screen name="Entry" component={Entry} options={{headerShown:false}}/>
            <Stack.Screen name="Login" component={Login}  options={{headerShown:false}}/>
            <Stack.Screen name="AdminLogin" component={AdminLogin} options={{headerShown:false}} />
            <Stack.Screen name="AdminHome" component={AdminHome} />
            <Stack.Screen name="AdminRequests" component={AdminRequests} />
            <Stack.Screen name="AdminNewCustomers" component={AdminNewCustomers}/>
            <Stack.Screen name="UserHome" component={UserHome} />
            <Stack.Screen name="Form" component={Form} />
            <Stack.Screen name="Request" component={Request} />
            <Stack.Screen name="OilRequest" component={OilRequest} />
            <Stack.Screen name="Slider" component={Slider} options={{headerShown:false}} />
            <Stack.Screen name="SecondSlider" component={SecondSlider} options={{headerShown:false}} />
            <Stack.Screen name="Offer" component={Offer} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Vertification" component={Vertification} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
