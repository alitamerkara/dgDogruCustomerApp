import React, { useRef, useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import { firebase } from './firebaseConfig';

export default function PhoneAuthScreen() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationId, setVerificationId] = useState(null);
  const recaptchaVerifier = useRef(null);

  const sendVerification = async () => {
    try {
      const phoneProvider = new firebase.auth.PhoneAuthProvider();
      const verificationId = await phoneProvider.verifyPhoneNumber(
        phoneNumber,
        recaptchaVerifier.current
      );
      setVerificationId(verificationId);
      alert("Verification code has been sent to your phone.");
    } catch (error) {
      console.error(error);
    }
  };

  const confirmCode = async () => {
    try {
      const credential = firebase.auth.PhoneAuthProvider.credential(
        verificationId,
        verificationCode
      );
      await firebase.auth().signInWithCredential(credential);
      alert("Phone authentication successful!");
    } catch (error) {
      console.error("Error verifying code:", error);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebase.app().options}
      />

      <TextInput
        placeholder="Phone Number"
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
        style={{ marginVertical: 10, fontSize: 17 }}
      />
      <Button title="Send Verification Code" onPress={sendVerification} />

      <TextInput
        placeholder="Verification Code"
        onChangeText={setVerificationCode}
        keyboardType="number-pad"
        style={{ marginVertical: 10, fontSize: 17 }}
      />
      <Button title="Confirm Verification Code" onPress={confirmCode} />
    </View>
  );
}
