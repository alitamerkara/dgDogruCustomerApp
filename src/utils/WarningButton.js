import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const WarningButton = ({ onPress, children }) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.text}>{children}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#ffc107',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        width:120,
    },
    text: {
        color: 'black',
        fontSize: 16,
    },
});

export default WarningButton;