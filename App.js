import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from './src/pages/Home';
import Login from './src/pages/Login';
import Register from './src/pages/Register';
import Vertification from './src/pages/Vertification';
import { auth } from './firebaseConfig';
import { signOut } from 'firebase/auth';
import { Button, Alert } from 'react-native';

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
      <Stack.Navigator>
        {/* {user ? (
          // Kullanıcı giriş yaptıysa, Home ekranı
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              headerRight: () => <Button title='Çıkış' onPress={handleSignOut} />,
            }}
          />
        ) : (
          // Kullanıcı giriş yapmadıysa, Login ekranı */}
          <>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              headerRight: () => <Button title='Çıkış' onPress={handleSignOut} />,
            }}
          />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Vertification" component={Vertification} />
          </>
        {/* )} */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
