import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const ImputNumber = ({ placeholder, maxLength, keyboardType, size, value, onInputChange }) => {
    

    return (
        <View style={styles.container}>
            <TextInput
                style={[styles.input, { fontSize: size }]}
                onChangeText={onInputChange}
                value={value}
                maxLength={maxLength}
                keyboardType={keyboardType}
                placeholder={placeholder}
                textAlign='left'
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: "'center'",
        alignItems: 'center',
        paddingVertical: '4%',
    },
    input: {
        width: '100%',
        borderWidth: 1,
        borderBottomWidth: 1,
        borderColor: 'transparent',
        paddingHorizontal: 10,
        fontWeight: "bold",
    },
    underline: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        borderBottomWidth: 1,
        borderColor: '#ccc', // Puedes cambiar el color del subrayado aquí
        marginBottom: 10,

    },
});

export default ImputNumber;
