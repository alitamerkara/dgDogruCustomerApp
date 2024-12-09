import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';

const LinearButton = ({ onPress, children }) => {
    return (
        <LinearGradient colors={['#48c19f', '#eaebe4']}  
       style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.text}>{children}</Text>
        </TouchableOpacity>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 5,
        overflow: 'hidden',
        marginVertical: 10,
    },
    button: {
        // backgroundColor: '#17a2b8',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        minWidth:100,
       
    },
    text: {
        color: 'gray',
        fontSize: 16,
    },
});

export default LinearButton;