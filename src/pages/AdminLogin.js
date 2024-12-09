import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ImageBackground, Image } from 'react-native';
import { auth } from '../../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import RoundButton from '../utils/RoundButton';
import Feather from '@expo/vector-icons/Feather';
import LinearButton from '../utils/LinearButton';

const AdminLogin = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      Alert.alert("Başarılı", "Giriş başarılı, yönlendiriliyorsunuz.");
      navigation.replace("AdminHome");
    } catch (error) {
      console.error("Error:", error);
      Alert.alert("Hata", "Giriş yapılamadı. Lütfen bilgilerinizi kontrol edin ve tekrar deneyin.");
    }
  };

  return (
    <ImageBackground source={require('../../assets/loginBg.jpg')} style={styles.background}>
    <View style={styles.container}>
      <Image source={require("../../assets/dggeri.png")} style={styles.logo} />
      <Text style={styles.title}>Admin Girişi</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={setEmail}
        keyboardType="email-address"
        value={email}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={setPassword}
        secureTextEntry
        value={password}
      />
      <LinearButton onPress={()=>{navigation.replace("AdminHome")}}>
          Giriş Yap
        </LinearButton>
    </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  logo: {
    resizeMode: 'contain',
    width: "90%",
    height: 200,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 16,
    marginTop: "20%",
    gap: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
    color: '#333',
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    width: "90%",
    borderRadius: 12,
    borderColor: '#ddd',
    paddingHorizontal: 15,
    backgroundColor: '#C6D2DF',
  },
  footerText: {
    textAlign: 'center',
    marginTop: 10,
  },
});

export default AdminLogin;