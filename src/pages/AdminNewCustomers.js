import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, Linking } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import InfoButton from '../utils/InfoButton';

const AdminNewCustomers = ({ route }) => {
  const [data, setData] = useState([]);

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
      console.error("Error fetching data:", error);
      Alert.alert("Hata", "Veri çekme sırasında bir hata oluştu.");
    }
  };

  useEffect(() => {
    fetchData(); // Bileşen mount olduğunda veri çekme işlemi başlat
  }, []);

  const handlePress = useCallback((tel) => {
    const phone = `tel:+90${Number(tel)}`;
    Linking.openURL(phone).catch((err) => {
      console.error("Failed to open URL:", err);
      Alert.alert("Hata", "Telefon numarasını ararken bir hata oluştu.");
    });
  }, []);

  return (
    <ScrollView style={styles.scroll}>
      <View style={styles.container}>
        <Text style={styles.text}>Yeni Arama Talepleri</Text>
        <InfoButton onPress={fetchData}>Yenile</InfoButton>
        {data?.map((item, index) => (
          <View style={styles.item} key={index}>
            <Text style={styles.itemText}><Text style={styles.title}>Müşteri No: </Text> {item.MüşteriNo}</Text>
            <Text style={styles.itemText}><Text style={styles.title}>Ad-Soyad: </Text> {item.Ad} {item.Soyad}</Text>
            <Text style={styles.itemText}><Text style={styles.title}>Sıklık: </Text> {item.Sıklık} {item.BiriktirilenYağ} KG Atık Yağ</Text>
            <Text style={styles.itemText}><Text style={styles.title}>Telefon: </Text> {item.Telefon}</Text>
            <Text style={styles.itemText}><Text style={styles.title}>Tabela Adı: </Text> {item.Tabela}</Text>
            <Text style={styles.itemText}><Text style={styles.title}>Adres: </Text> {item.Adres}</Text>
            <Text style={styles.itemText}><Text style={styles.title}>Adres Tarifi: </Text> {item.AdresTarifi}</Text>
            <InfoButton onPress={() => handlePress(item.Telefon)}>Ara</InfoButton>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  container: {
    padding: 16,
    backgroundColor: '#f8f8f8',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  item: {
    width: '90%',
    marginVertical: 16,
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    padding:20
  },
  itemText: {
    fontSize: 16,
    marginBottom: 8,
  },
  title: {
    fontWeight: 'bold',
    color: "green"
  },
});

export default AdminNewCustomers;
