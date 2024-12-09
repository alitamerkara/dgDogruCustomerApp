import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { auth } from '../../firebaseConfig';
import { signInWithPhoneNumber, PhoneAuthProvider, signInWithCredential } from 'firebase/auth';

const Login = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationId, setVerificationId] = useState(null);

  const sendVerification = async () => {
    try {
      const fullPhoneNumber = "+90" + phoneNumber; // Türkiye için +90 prefixi
      const confirmation = await signInWithPhoneNumber(auth, fullPhoneNumber);
      setVerificationId(confirmation.verificationId);
      Alert.alert("Başarılı", "Doğrulama kodu gönderildi.");
    } catch (error) {
      console.error("Error:", error);
      Alert.alert("Hata", "Bir hata oluştu. Lütfen tekrar deneyin.");
    }
  };

  const handleLogin = async () => {
    try {
      const credential = PhoneAuthProvider.credential(verificationId, verificationCode);
      await signInWithCredential(auth, credential);
      Alert.alert("Başarılı", "Giriş başarılı, yönlendiriliyorsunuz.");
      navigation.navigate("Home");
    } catch (error) {
      console.error("Error:", error);
      Alert.alert("Hata", "Doğrulama kodu yanlış. Lütfen tekrar deneyin.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <View style={styles.phoneNumberContainer}>
        <Text style={styles.prefix}>+90</Text>
        <TextInput
          style={styles.input}
          placeholder="Telefon Numarası"
          onChangeText={(text) => setPhoneNumber(text.replace(/[^0-9]/g, '').slice(0, 10))}
          keyboardType="phone-pad"
          value={phoneNumber}
          maxLength={10}
        />
      </View>
      <Button title="Onay Kodu Gönder" onPress={sendVerification} />
      {verificationId && (
        <>
          <TextInput
            style={styles.input}
            placeholder="Doğrulama Kodu"
            onChangeText={setVerificationCode}
            keyboardType="number-pad"
            value={verificationCode}
            maxLength={6}
          />
          <Button title="Giriş Yap" onPress={handleLogin} />
        </>
      )}
      <Text style={styles.footerText}>Hesabınız yok mu? Kayıt olun.</Text>
      <Button title="Kayıt Ol" onPress={() => navigation.navigate("Register")} />
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
    marginBottom: 16,
    textAlign: 'center',
    color: '#333',
    fontWeight: 'bold',
  },
  phoneNumberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  prefix: {
    fontSize: 18,
    paddingHorizontal: 10,
    color: '#000',
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
    color: '#333',
  },
  footerText: {
    textAlign: 'center',
    marginTop: 10,
  },
});

export default Login;
