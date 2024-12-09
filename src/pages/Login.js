import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, ImageBackground, Image, Button } from 'react-native';
import { auth } from '../../firebaseConfig';
import { signInWithPhoneNumber } from 'firebase/auth';
import LinearButton from '../utils/LinearButton';
import RoundButton from '../utils/RoundButton';
import Feather from '@expo/vector-icons/Feather';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig';


const Login = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationId, setVerificationId] = useState(null);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "dgg"));
      const fetchedData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setData(fetchedData);
    } catch (error) {
      console.error("Error fetching data:", error);
      Alert.alert("Hata", "Veri çekme sırasında bir hata oluştu.");
    }
  };
  
  useEffect(() => {
    fetchData();
  }, []);
  
  const confirmCode = () => {
    console.log(data)
    const isMatch = data.some(item =>
      String(item.Telefon) === String(phoneNumber) &&
      String(item.MüşteriNo) === String(verificationCode)
    );
  
    if (isMatch) {
      navigation.replace('UserHome');
    } else {
      Alert.alert('Hata', 'Doğrulama kodu yanlış.');
    }
  };
  
  // const sendVerification = async () => {
  //   if (!phoneNumber) {
  //     Alert.alert('Hata', 'Lütfen telefon numaranızı girin.');
  //     return;
  //   }
  //   try {
  //     const confirmation = await signInWithPhoneNumber(auth, phoneNumber);
  //     setVerificationId(confirmation.verificationId);
  //     Alert.alert('Başarılı', 'Doğrulama kodu gönderildi.');
  //   } catch (error) {
  //     Alert.alert('Hata', error.message);
  //   }
  // };


   // if (!verificationCode || !verificationId) {
    //   Alert.alert('Hata', 'Lütfen doğrulama kodunu girin.');
    //   return;
    // }
    // try {
    //   const credential = firebase.auth.PhoneAuthProvider.credential(
    //     verificationId,
    //     verificationCode
    //   );
    //   await auth.signInWithCredential(credential);
    //   Alert.alert('Başarılı', 'Telefon numarası doğrulandı.');
    //   navigation.navigate('Home'); // Başarılı girişten sonra yönlendirme
    // } catch (error) {
    //   Alert.alert('Hata', 'Doğrulama kodu yanlış.');
    // }

  return (
    <ImageBackground source={require('../../assets/loginBg.jpg')} style={styles.background}>
      <View style={styles.goBack}>
        <RoundButton onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={30} color="white" />
        </RoundButton>
      </View>
      <View style={styles.container}>
        <Image source={require("../../assets/dggeri.png")} style={styles.logo} />
        <Text style={styles.title}>Telefon ile Giriş Yapın</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Telefon Numarası (+90...)"
            onChangeText={setPhoneNumber}
            value={phoneNumber}
            keyboardType="phone-pad"
          />
          {/* <Button title="Gönder" onPress={sendVerification} /> */}
        </View>

        <TextInput
          style={styles.secondInput}
          placeholder="Müşteri No"
          onChangeText={setVerificationCode}
          value={verificationCode}
          keyboardType="number-pad"
        />

        <LinearButton onPress={confirmCode}>
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
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 16,
    marginTop: "25%",
    gap: 16,
    position: "relative",
  },
  goBack: {
    position: 'absolute',
    top: "5%",
    left: 10,
    zIndex: 1,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'green',
    lineHeight: 40,
    marginBottom: 20,
    textShadowColor: 'black',
    textShadowRadius: 3,
  },
  inputContainer: {
    height: 40,
    width: "90%",
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#C6D2DF',
    flexDirection: 'row',
  },
  input: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: '#C6D2DF',
  },
  secondInput: {
    height: 40,
    width: "90%",
    borderRadius: 12,
    borderColor: '#ddd',
    paddingHorizontal: 15,
    backgroundColor: '#C6D2DF',
  },
  logo: {
    resizeMode: 'contain',
    width: "90%",
    height: 200,
  },
});

export default Login;
