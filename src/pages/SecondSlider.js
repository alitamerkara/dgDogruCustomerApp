import { View, Text, TextInput, StyleSheet, ScrollView, Alert, ActivityIndicator, Button, Image } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import Feather from '@expo/vector-icons/Feather';
import RoundButton from '../utils/RoundButton';


const SecondSlider = ({ navigation }) => {

    return (
       <LinearGradient colors={['#48c19f', '#eaebe4']}  
       style={styles.container}>
        <Text style={styles.title}>Kolay Kayıt,  Hızlı Teklif,  Kazançlı Dönüşüm</Text>
        <Image source={require("../../assets/slider2.gif")} style={styles.logo}/>
        <Text style={styles.subtitle}>
        Kolayca kaydolun, ihtiyaçlarınıza özel teklifinizi anında alın. Atık yağlarınız değer kazansın, siz de geleceğe katkı sağlayın.
        </Text>
        <View style={styles.buttonContainer}>
        <RoundButton onPress={()=>{navigation.replace("Form")}}><Feather name="arrow-right" size={30} color="white" /></RoundButton>
        </View>
        </LinearGradient>
    );
}; 

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 30,
        paddingHorizontal: 10,
        gap:15
    },
    logo: {
        resizeMode: 'contain',
        width: "100%",
        paddingHorizontal:10
    },
    title: {
        fontSize: 32,
        // marginTop: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'white', 
        paddingHorizontal: 10,
        lineHeight: 40,
        textShadowColor: 'black',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
      },
      subtitle: {
        width:"90%",
        fontSize: 15,
        color: 'white',
        textAlign: 'center',
        marginHorizontal: 20,
        marginBottom: 20,
        lineHeight: 24,
        textShadowColor: 'black',
        textShadowOffset: { width: 0.5, height: 0.5 },
        textShadowRadius: 2,
      },
    buttonContainer: {
        width:"100%",
        marginRight:20,
        marginBottom: 20,
        alignItems: 'flex-end',
    }
});

export default SecondSlider;
