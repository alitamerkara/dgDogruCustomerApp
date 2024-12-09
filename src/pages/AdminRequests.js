import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, Alert , Linking} from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import InfoButton from '../utils/InfoButton';
import { ScrollView } from 'react-native';

const AdminRequests = ({route}) => {
  const [data, setData] = useState([]);
  
  const fetchData = async () => {
    try {
      // Koleksiyon adı "dgg"
      const querySnapshot = await getDocs(collection(db, "request"));
    
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

  return (
    <ScrollView style={styles.scroll}>
    <View style={styles.container}>
      <Text style={styles.text}>Yağ Toplama Talepleri</Text>
      <InfoButton onPress={()=>{console.log(data)}}>Yenile</InfoButton>
      {data?.map((item, index) => (
        <View style={styles.item} key={index}>
          <Text style={styles.itemText}>{item.Tabela}</Text>
          <Text style={styles.itemText}>{item.Adres}</Text>
          <Text style={styles.itemText}>{item.AdresTarifi}</Text>
        </View>
      ))}
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scroll: {
   flex: 1,
   backgroundColor: '#E7F1FA',
  },
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
    width: '80%',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    marginVertical: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 3,

  },
  itemText: {
    fontSize: 15,
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

export default AdminRequests;
