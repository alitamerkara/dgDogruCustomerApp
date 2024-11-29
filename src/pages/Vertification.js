import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { auth, PhoneAuthProvider, signInWithCredential } from 'firebase/auth';

const Vertification = ({ route, navigation }) => {
    const [verificationCode, setVerificationCode] = useState('');
    const { verificationId } = route.params || {};

    const handleLogin = async () => {
        try {
            const credential = PhoneAuthProvider.credential(verificationId, verificationCode);
            await signInWithCredential(auth, credential);
            alert("Giriş başarılı!");
            navigation.navigate("Home");
        } catch (error) {
            console.log("Error:", error);
            alert("Doğrulama başarısız. Kodunuzu kontrol edin.");
        }
    };

    return (
        <ScrollView>    
        <View style={styles.container}>
            <Text style={styles.title}>Doğrulama</Text>
            <TextInput
                style={styles.input}
                placeholder="Doğrulama Kodunu Giriniz"
                onChangeText={setVerificationCode}
                keyboardType="number-pad"
                value={verificationCode}
                />
            <Button title="Doğrula ve Giriş Yap" onPress={handleLogin} />
        </View>
                </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 16 },
    title: { fontSize: 24, marginBottom: 16, textAlign: 'center' },
    input: { height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 12, paddingHorizontal: 8 },
});

export default Vertification;
