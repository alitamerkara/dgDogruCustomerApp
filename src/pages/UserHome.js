import { View, Text, TextInput, StyleSheet, ScrollView, Alert, ActivityIndicator, Button, Image } from 'react-native';
import InfoButton from '../utils/InfoButton';
import SecondaryButton from '../utils/SecondaryButton';


const UserHome = ({ navigation }) => {

    return (
       <View style={styles.container}>
        <Image source={require("../../assets/profile.png")} style={styles.logo}/>
        <Text style={styles.title}>İncir Meyhane</Text>
        <View style={styles.line}>
        <Text style={styles.title}>Ad Soyad:</Text>
        <Text style={styles.title}>Ali Tamer Kara</Text>
        </View>
        <View style={styles.line}>
        <Text style={styles.title}>Müşteri No:</Text>
        <Text style={styles.title}>574832</Text>
        </View>
        <View style={styles.line}>
        <Text style={styles.title}>Telefon:</Text>
        <Text style={styles.title}>553 053 9952</Text>
        </View>
        <View style={styles.line}>
        <Text style={styles.title}>Adres:</Text>
        <Text style={styles.title}>Kızılırmak Mah. 1443.Cd.</Text>
        </View>
        
        <View style={styles.buttonContainer}>
      <InfoButton onPress={()=>{navigation.navigate("OilRequest")}}>Yağ Toplama Talebi Oluştur</InfoButton>
      </View>
        </View>
    );
}; 

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E7F1FA',
        paddingVertical: 20,
        gap:20
    },
    logo: {
        resizeMode: 'cover',
        width: 200,
        height: 200,
        borderWidth:1,
        borderRadius: 100,
       paddingHorizontal :30
    },
    line: {
        flexDirection: 'row',
        width:"100%",
        paddingHorizontal:10
    },
    title: {
        fontSize: 24,
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

export default UserHome;
