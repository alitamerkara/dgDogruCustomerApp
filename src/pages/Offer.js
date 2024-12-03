import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, Alert , Linking} from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import InfoButton from '../utils/InfoButton';
import SecondaryButton from '../utils/SecondaryButton';

const Offer = ({route}) => {
  const [data, setData] = useState([]);
  const id= route.params?.no;  
  const tekliff = (item) => {
    let teklif = 0;
    let deger = 0;
    
    if(item.Sıklık === "Günde"){
      deger = 30 * Number(item.BiriktirilenYağ);
    } else if(item.Sıklık === "Haftada"){
      deger = 4 * Number(item.BiriktirilenYağ);
    } else {
      deger = Number(item.BiriktirilenYağ);
    }
    
    if(deger < 1000){
      teklif = 15;
    } else if (deger >= 1000 && deger < 2000){
      teklif = 20;
    } else if (deger >= 2000){
      teklif = 25;
    }
    console.log(deger, teklif)
    return teklif;
  };

  const fetchData = async () => {
    try {
      // Koleksiyon adı "dgg"
      const querySnapshot = await getDocs(collection(db, "dgg"));
    
      // Verileri işleme
      const fetchedData = querySnapshot.docs.map(doc => ({
        id: doc.id, 
        ...doc.data()
      }));
    
      setData(fetchedData); // Veriyi state'e kaydet
    } catch (error) {
      console.error("Veri çekme hatası: ", error);
    }
  };
  
  useEffect(() => {
    fetchData(); // Bileşen mount olduğunda veri çekme işlemi başlat
  }, []);

const handlePress = () => {
    Linking.openURL(`tel:+905530539952`);
}
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Teklifimiz Hazır</Text>
      <Image source={require("../../assets/agreement.gif")} style={styles.gif} />
      {/* FlatList ile çekilen verileri listele */}
      {data.map((item) => {
        if(item.MüşteriNo==id){
          return (
            <View style={styles.item}>
            <Text style={styles.itemText}>Teklifimiz</Text>
            <Text style={styles.secondText}>{tekliff(item)} ₺ <Text style={styles.subText}>/ lt</Text></Text> 
            <Text style={styles.warning}>! Teklifimiz birçok duruma göre değişkenlik gösterebilir, net bilgi için lütfen iletişime geçin.</Text>
          </View>
          )
        }
      })}
      <View style={styles.buttonContainer}>
      <InfoButton onPress={handlePress}>Ara</InfoButton>
      <SecondaryButton onPress={() => Alert.alert("Talebiniz alındı.")}>Beni Arayın</SecondaryButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#E7F1FA',
    paddingVertical: 30,
    
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#33cccc',
    marginBottom: 20,
  },
  item: {
    width: '90%',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    marginVertical: 20,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 3,

  },
  itemText: {
    fontSize: 24,
    color: 'gray',
    textAlign: 'center',
    padding: 5,
  },
  secondText: {
    fontSize: 50,
    fontWeight: 'bold',
    color: 'gray',
    textAlign: 'center',
    padding: 5,
  },
    subText: {
        fontSize: 24,
        color: 'gray',
        textAlign: 'center',
        padding: 5,
    },
    gif: {
        width: "80%", 
        height: 320,
        borderRadius: 10,
    },
    warning:{
        marginTop:10,
        color: 'green',
        fontSize: 10,
        textAlign: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 20,
        width: '70%',
    },
});

export default Offer;
