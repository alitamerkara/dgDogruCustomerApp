import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from './src/pages/Home';
import Login from './src/pages/Login';
import Register from './src/pages/Register';
import Vertification from './src/pages/Vertification';
import { auth } from './firebaseConfig';
import { signOut } from 'firebase/auth';
import { Button, Alert, Image } from 'react-native';
import Offer from './src/pages/Offer';
import Form from './src/pages/Form';
import Slider from './src/pages/Slider';
import SecondSlider from './src/pages/SecondSlider';


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
            <Stack.Screen name="Home" component={Home}/>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Form" component={Form} />
            <Stack.Screen name="Slider" component={Slider} />
            <Stack.Screen name="SecondSlider" component={SecondSlider} />
            <Stack.Screen name="Offer" component={Offer} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Vertification" component={Vertification} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
