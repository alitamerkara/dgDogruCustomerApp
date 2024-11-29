import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { auth } from '../../firebaseConfig';
import { signInWithPhoneNumber } from 'firebase/auth';

const Register = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationId, setVerificationId] = useState('');

  const handleRegister = async () => {
    try {
      const fullPhoneNumber = "+90" + phoneNumber; // Türkiye için +90 prefixi

      const confirmation = await signInWithPhoneNumber(auth, fullPhoneNumber);
      setVerificationId(confirmation.verificationId); // Doğrulama ID'si
      alert("Doğrulama kodu gönderildi.");
      navigation.navigate("Verification", { verificationId: confirmation.verificationId });
    } catch (error) {
      console.log("Error:", error);
      alert("Bir hata oluştu. Lütfen tekrar deneyin.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
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
      <Button title="Register" onPress={handleRegister} />
      <Text style={styles.footerText}>Do you have an account?</Text>
      <Button title="Login" onPress={() => navigation.navigate("Login")} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    padding: 16,
    backgroundColor: '#f8f8f8', // Arka plan rengi
  },
  title: { 
    fontSize: 24, 
    marginBottom: 16, 
    textAlign: 'center',
    color: '#333', // Başlık rengi
    fontWeight: 'bold',
  },
  phoneNumberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#fff', // Giriş alanı arka plan rengi
  },
  prefix: { 
    fontSize: 18, 
    paddingHorizontal: 10,
    color: '#000'
  },
  input: { 
    flex: 1,
    height: 40, 
    paddingHorizontal: 10,
    color: '#333',
  },
  footerText: {
    textAlign: 'center',
    marginTop: 12,
  }
});

export default Register;
