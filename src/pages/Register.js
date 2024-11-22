import React, { useState, useRef } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { auth } from '../../firebaseConfig';
import { signInWithPhoneNumber } from 'firebase/auth';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';

const Register = ({ navigation
 }) => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const recaptchaVerifier = useRef(null);

    const handleRegister = async () => {
        try {
            const fullPhoneNumber = "+90" + phoneNumber;

            if (recaptchaVerifier.current) {
                // signInWithPhoneNumber çağrısından önce reCAPTCHA'nın hazır olduğundan emin ol
                const confirmation = await signInWithPhoneNumber(auth, fullPhoneNumber, recaptchaVerifier.current);
                alert("Doğrulama kodu gönderildi.");
                setLogin(true);
                navigation.navigate("Login", { verificationId: confirmation.verificationId });
            } else {
                alert("reCAPTCHA doğrulayıcı yüklenemedi. Lütfen tekrar deneyin.");
            }
        } catch (error) {
            console.log("Error:", error);
            alert("Bir hata oluştu. Lütfen tekrar deneyin.");
        }
    };

    return (
        <View style={styles.container}>
            {/* Firebase reCAPTCHA Modal */}
            <FirebaseRecaptchaVerifierModal
                ref={recaptchaVerifier}
                firebaseConfig={auth.app.options}
            />

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
        padding: 16 
    },
    title: { 
        fontSize: 24, 
        marginBottom: 16, 
        textAlign: 'center' 
    },
    phoneNumberContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
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
    },
    footerText: {
        textAlign: 'center',
        marginTop: 12,
    }
});

export default Register;
