import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const SuccessButton = ({ onPress, children }) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.text}>{children}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#28a745',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    text: {
        color: '#ffffff',
        fontSize: 16,
    },
});

export default SuccessButton;