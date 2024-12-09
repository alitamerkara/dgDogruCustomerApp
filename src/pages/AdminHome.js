import { View, Text, TextInput, StyleSheet, ScrollView, Alert, ActivityIndicator, Button, Image } from 'react-native';
import InfoButton from '../utils/InfoButton';
import SecondaryButton from '../utils/SecondaryButton';


const AdminHome = ({ navigation }) => {

    return (
       <View style={styles.container}>
        <Image source={require("../../assets/dggeri.png")} style={styles.logo}/>
        <Text style={styles.title}>Admin Paneli</Text>
        <View style={styles.buttonContainer}>
      <InfoButton onPress={()=>{navigation.navigate("AdminRequests")}}>Yağ Toplama Talepleri </InfoButton>
      <SecondaryButton onPress={() =>{navigation.navigate("AdminNewCustomers")}}>Yeni Müşteriler</SecondaryButton>
      </View>
        </View>
    );
}; 

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E7F1FA',
        paddingVertical: 30,
        gap:50
    },
    logo: {
        resizeMode: 'contain',
        width: "100%",
        height: 200,
       paddingHorizontal :30
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'green', 
        paddingHorizontal: 10,
        lineHeight: 40,
        textShadowColor: 'gray',
        textShadowOffset: { width: 0, height: 0},
        textShadowRadius: 2,
      },
    buttonContainer: {
        gap: 10,
    }

});

export default AdminHome;
