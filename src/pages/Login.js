import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { auth } from '../../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      // Firebase ile e-posta ve şifre doğrulama
      await signInWithEmailAndPassword(auth, email, password);
      Alert.alert('Başarılı', 'Giriş başarılı, yönlendiriliyorsunuz.');
      navigation.navigate('Home'); // Home sayfasına yönlendirme
    } catch (error) {
      console.error('Login Error:', error.message);
      Alert.alert('Hata', 'Giriş başarısız. Bilgilerinizi kontrol edin.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="E-posta"
        onChangeText={setEmail}
        value={email}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <TextInput
        style={styles.input}
        placeholder="Şifre"
        onChangeText={setPassword}
        value={password}
        secureTextEntry
      />
      <Button title="Giriş Yap" onPress={handleLogin} />
      <Text style={styles.footerText}>Henüz bir hesabınız yok mu?</Text>
      <Button
        title="Kayıt Ol"
        onPress={() => navigation.navigate('Register')} // Kayıt sayfasına yönlendirme
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  footerText: {
    textAlign: 'center',
    marginTop: 10,
  },
});

export default Login;
