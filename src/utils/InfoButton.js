import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const InfoButton = ({ onPress, children }) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.text}>{children}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#17a2b8',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        minWidth:100,
        // marginBottom: 10,
    },
    text: {
        color: '#ffffff',
        fontSize: 16,
    },
});

export default InfoButton;