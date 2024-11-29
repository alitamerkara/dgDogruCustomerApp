import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { auth } from '../../firebaseConfig';
import WarningButton from '../utils/WarningButton';
import SuccessButton from '../utils/SuccessButton';

const Home = ({ navigation }) => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [phone, setPhone] = useState('');
    const [labelName, setLabelName] = useState('');
    const [address, setAddress] = useState('');
    const [location, setLocation] = useState(null);

    const save = async () => {
        // Alert.alert('Kaydedildi', 'Tebrikler, bilgileriniz kaydedildi.');
        console.log(location)
    };

    // Lokasyon izni isteme ve konumu alma
    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('İzin Gerekli', 'Lokasyon izinlerine erişim verilmedi.');
                return;
            }
            let currentLocation = await Location.getCurrentPositionAsync({});
            setLocation({
                latitude: currentLocation.coords.latitude,
                longitude: currentLocation.coords.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            });
        })();
    }, []);

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.title}>Sistem Kayıt Bilgileri</Text>
                <View style={styles.formItem}>
                    <Text style={styles.label}>Ad</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Adınızı girin"
                        value={name}
                        onChangeText={setName}
                    />
                </View>
                <View style={styles.formItem}>
                    <Text style={styles.label}>Soyad</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Soyadınızı girin"
                        value={surname}
                        onChangeText={setSurname}
                    />
                </View>
                <View style={styles.formItem}>
                    <Text style={styles.label}>Telefon No</Text>
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
                    <Text style={styles.label}>Tabela İsmi</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Tabela ismini girin"
                        value={labelName}
                        onChangeText={setLabelName}
                    />
                </View>
                <View style={styles.formItem}>
                    <Text style={styles.label}>Adres</Text>
                    <TextInput
                        style={styles.address}
                        placeholder="Adresinizi girin"
                        multiline
                        value={address}
                        onChangeText={setAddress}
                    />
                </View>
                {/* Harita bileşeni */}
                {location && (
                    <View style={styles.mapContainer}>
                        <Text style={styles.label}>Konumunuz</Text>
                        <MapView
                            style={styles.map}
                            initialRegion={location}
                            showsUserLocation
                        >
                            <Marker
                                coordinate={location}
                                title="Şu Anki Konum"
                                description="Buradasınız"
                            />
                        </MapView>
                    </View>
                )}
                <View style={styles.buttonContainer}>
                    <SuccessButton onPress={save}>Sonraki Adım</SuccessButton>
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
        backgroundColor: 'E7F1FA',
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
    },
    label: {
        marginBottom: 10,
        color: 'gray',
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
        height: 80,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
    },
    mapContainer: {
        width: '80%',
        height: 200,
        marginBottom: 20,
        borderRadius: 10,
        overflow: 'hidden',
    },
    map: {
        width: '100%',
        height: '100%',
    },
});

export default Home;
