import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { auth } from '../../firebaseConfig'; // Firebase config'den auth import ediyoruz
import { PhoneAuthProvider, signInWithCredential } from 'firebase/auth';

const Login = ({ route, navigation }) => {
    const [verificationCode, setVerificationCode] = useState('');
    const { verificationId } = route.params || {};

    const handleLogin = async () => {
        try {
            const credential = PhoneAuthProvider.credential(verificationId, verificationCode);
            await signInWithCredential(auth, credential);
            alert("Giriş başarılı!");
            // Başarılı giriş sonrası yönlendirme
        } catch (error) {
            console.log("Error:", error);
            alert("Doğrulama başarısız. Kodunuzu kontrol edin.");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <TextInput
                style={styles.input}
                placeholder="Doğrulama Kodunu Giriniz"
                onChangeText={setVerificationCode}
                keyboardType="number-pad"
                value={verificationCode}
            />
            <Button title="Login" onPress={handleLogin} />
            <Text>Do not you have an account?</Text>
            <Button title="Register" onPress={() => navigation.navigate("Register")} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 16 },
    title: { fontSize: 24, marginBottom: 16, textAlign: 'center' },
    input: { height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 12, paddingHorizontal: 8 },
});

export default Login;
