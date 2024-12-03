import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Alert, ActivityIndicator } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import Checkbox from 'expo-checkbox';
import InfoButton from '../utils/InfoButton';
import { Dropdown } from 'react-native-element-dropdown';   

const Home = ({ navigation }) => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [labelName, setLabelName] = useState('');
    const [address, setAddress] = useState('');
    const [secondAddress, setSecondAddress] = useState('');
    const [location, setLocation] = useState(null);
    const [isChecked, setChecked] = useState(false);
    const [checkBox, setCheckBox] = useState(false);
    const [conditions, setConditions] = useState(false);
    const [isMapLoading, setIsMapLoading] = useState(true); 
    const [isFocus, setIsFocus] = useState(false);
    const [type, setType] = useState('');
    const [date, setDate] = useState('');
    const [wasteOil, setWasteOil] = useState('');
    const [customerNumber, setCustomerNumber] = useState(Math.floor(Math.random() * 1000000));

    const save = async () => {
        if (name && surname && phone && labelName && address && secondAddress && type && date && wasteOil) {
            try {
                await addDoc(collection(db, "dgg"), {
                    Ad: name,
                    Soyad: surname,
                    Telefon: phone,
                    Tabela: labelName,
                    Adres: address,
                    AdresTarifi: secondAddress,
                    RestoranTipi: type,
                    BiriktirilenYağ: wasteOil,
                    Sıklık: date, 
                    MüşteriNo: customerNumber,
                });
                alert('Bilgileriniz Kaydedildi!!');
                navigation.replace('Offer',{no: customerNumber});
                setName('');
                setSurname('');
                setEmail('');
                setPhone('');
                setLabelName('');
                setAddress('');
                setSecondAddress('');
                setType('');
                setDate('');
                setWasteOil('');
                setCheckBox(false);
                setConditions(false);
            } catch (error) {
                console.error("Hata: ", error);
                alert('Veri kaydetme sırasında hata oluştu');
            }
        } else {
            alert('Lütfen tüm alanları doldurunuz');
        }
    };
    const types= [
        { label: 'Günlük Yemek', value: 'Günlük Yemek' },
        { label: 'Fast-Food', value: 'Fast-Food' },
        { label: 'Cafe', value: 'Cafe' },
        { label: 'Sokak Yemekleri', value: 'Sokak Yemekleri' },
        { label: 'Meyhane', value: 'Meyhane' },
        { label: 'Bar/Pub', value: 'Bar/Pub'},
        { label: 'Balık Restoran', value: 'Balık Restoran' },
        { label: 'Kebap', value: 'Kebap' },
        { label: 'Steakhouse', value: 'Steakhouse' },
        { label: 'Vejeteryan ', value: 'Vejeteryan ' },
        { label: 'Fırın', value: 'Fırın' },
        { label: 'Esnaf', value: 'Esnaf' },
        { label: 'Diğer', value: 'Diğer' },
      ];
      const dates= [
        { label: 'Günde', value: 'Günde' },
        { label: 'Haftada', value: 'Haftada' },
        { label: 'Ayda', value: 'Ayda' },
        { label: 'Yılda', value: 'Yılda' },
      ];
    // Lokasyon izni isteme ve adres bilgisi alma
    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('İzin Gerekli', 'Lokasyon izinlerine erişim verilmedi.');
                return;
            }
            let currentLocation = await Location.getCurrentPositionAsync({});
            const { latitude, longitude } = currentLocation.coords;
            setLocation({
                latitude,
                longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            });

            // Adresi tersine geokodlama
            let reverseGeocodedAddress = await Location.reverseGeocodeAsync({
                latitude,
                longitude,
            });
            if (reverseGeocodedAddress.length > 0) {
                const { street, city, region, postalCode, } = reverseGeocodedAddress[0];
                setAddress(`${street}, ${city}, ${region}, ${postalCode},`);
            }
        })();
    }, []);
    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.title}>Sistem Kayıt Bilgileri</Text>
                <View style={styles.formItem}>
                    <Text style={styles.no}>Müşteri No: {customerNumber}</Text>
                    <Text style={styles.label}>Ad*</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Adınızı girin"
                        value={name}
                        onChangeText={setName}
                    />
                </View>
                <View style={styles.formItem}>
                    <Text style={styles.label}>Soyad*</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Soyadınızı girin"
                        value={surname}
                        onChangeText={setSurname}
                    />
                </View>
                <View style={styles.formItem}>
                    <Text style={styles.label}>Telefon No*</Text>
                    <View style={styles.phoneContainer}>
                        <TextInput
                            style={styles.phoneCode}
                            keyboardType="phone-pad"
                            value="+90"
                            editable={false}
                        />
                        <TextInput
                            style={styles.phone}
                            placeholder="Telefon numaranızı girin"
                            keyboardType="phone-pad"
                            value={phone}
                            onChangeText={setPhone}
                            maxLength={10}
                        />
                    </View>
                </View>
                <View style={styles.formItem}>
                    <Text style={styles.label}>E-posta</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="E-postanızı girin (isteğe bağlı)"
                        value={email}
                        onChangeText={setEmail}
                    />
                </View>
                <View style={styles.formItem}>
                <Text style={styles.label}>Restoran Tipi</Text>
                <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={types}
                search={false}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder='Restoran Tipi Seçin'
                placeholderStyle={{ color: 'gray' }}
                value={type}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                    setType(item.value);
                    setIsFocus(false);
                }}
                />
                </View>
                <View style={styles.formItem}>
                <Text style={styles.label}>Ortalama Biriktirlen Yağ Sıklığı</Text>
                <View style={styles.date}>
                <Dropdown
                style={[styles.dateDropdown, isFocus && { borderColor: 'blue' }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                data={dates}
                search={false}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder='Sıklık Seçin'
                placeholderStyle={{ color: 'gray' }}
                value={date}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                    setDate(item.value);
                    setIsFocus(false);
                }}
                />
                <TextInput
                        style={styles.wasteOil}
                        placeholder="Miktar (KG)"
                        value={wasteOil}
                        onChangeText={setWasteOil}
                        keyboardType='numeric'
                    />
                </View>
                </View>
                <View style={styles.formItem}>
                    <Text style={styles.label}>Tabela İsmi*</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Tabela ismini girin"
                        value={labelName}
                        onChangeText={setLabelName}
                    />
                </View>
                <View style={styles.formItem}>
                    <Text style={styles.label}>Adres*</Text>
                    <TextInput
                        style={styles.address}
                        placeholder="Adresiniz otomatik doldurulacak"
                        multiline
                        value={address}
                        onChangeText={setAddress}
                    />
                    <InfoButton onPress={() => setChecked((checked) => !checked)}>
                        Konumdan Bul
                    </InfoButton>
                </View>
                <View style={styles.formItem}>
                    <Text style={styles.label}>Adres Tarifi*</Text>
                    <TextInput
                        style={styles.address}
                        placeholder="Bina No, Çevre Tarifi vb."
                        multiline
                        value={secondAddress}
                        onChangeText={setSecondAddress}
                    />
                </View>
                <View>
                </View>
                {isChecked && (
                    <View style={styles.mapContainer}>
                        {isMapLoading && (
                            <View style={styles.loadingContainer}>
                                <ActivityIndicator size="large" color="#0000ff" />
                                <Text style={styles.loadingText}>Harita yükleniyor...</Text>
                            </View>
                        )}
                        {location && (
                            <>
                            <MapView
                                style={styles.map}
                                initialRegion={location}
                                showsUserLocation
                                onMapReady={() => setIsMapLoading(false)} // Harita yüklenince loading kaldırılır
                            >
                                <Marker
                                    coordinate={location}
                                    title="Şu Anki Konum"
                                    description={address}
                                />
                            </MapView>
                            <Text style={styles.warning}>Konumun doğruluğundan emin değilseniz, yukarıda "Adres" kısmında açık adres belirtebilirsiniz.</Text>
                            </>
                            
                        )}
                        
                    </View>
                )}
                <View style={styles.checkBoxContainer}>
                <View style={styles.checkBox}>
                        <Checkbox
                    style={styles.checkbox}
                    value={checkBox}
                    onValueChange={setCheckBox}
                    color={checkBox ? '#17a2b8' : undefined}
                    /> 
                    <Text style={styles.checkboxText}>Yukarıdaki bilgilerin doğruluğunu kabul ediyorum.</Text>
                        </View>
                        <View style={styles.checkBox}>
                        <Checkbox
                    style={styles.checkbox}
                    value={conditions}
                    onValueChange={setConditions}
                    color={checkBox ? '#17a2b8' : undefined}
                    /> 
                    <Text style={styles.checkboxText}>Aydınlatma Metni'ni okudum, kabul ediyorum.</Text>
                        </View>
                        </View>
                <View style={styles.buttonContainer}>
                    <InfoButton onPress={save}>Bilgileri Kaydet</InfoButton>
                </View>
            </View>
        </ScrollView>
    );
}; 

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E7F1FA',
        paddingVertical: 30,
    },
    title: {
        fontSize: 30,
        marginBottom: 20,
        color: 'gray',
    },
    formItem: {
        marginBottom: 20,
        width: '80%',
        gap: 4,
    },
    label: {
        marginBottom: 10,
        color: 'gray',
    },
    no: {
        width: '100%',
        textAlign: 'right',
        marginBottom: 10,
        color: 'gray',
        fontSize: 16,
    },
    warning:{
        color: 'red',
        fontSize: 12,
        textAlign: 'center',
    },
    input: {
        padding: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
    },
    buttonContainer: {
        width: '80%',
        alignItems: 'flex-end',
    },
    phoneContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    phone: {
        width: '81%',
        padding: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
    },
    phoneCode: {
        padding: 10,
        width: '15%',
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        marginRight: 10,
    },
    address: {
        padding: 10,
        height: 50,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
    },
    mapContainer: {
        width: '80%',
        height: 200,
        marginBottom: 30,
    },
    map: {
        width: '100%',
        height: '100%',
        borderWidth: 0.4,
        borderColor: 'gray',
        borderRadius: 10,
    },
    loadingContainer: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{ translateX: -50 }, { translateY: -50 }],
        alignItems: 'center',
        zIndex: 1,
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: 'gray',
    },
    checkBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginVertical: 10,
        gap: 10,
    },
    checkboxText:{
        color: 'gray',
    },
    dropdown: {
        padding: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
    },
    dateDropdown: {
        padding: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        width: "38%",
    },
    wasteOil:{
        padding: 12,
        fontSize: 16,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        width: "35%",
    },
    date:{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    
});

export default Home;
