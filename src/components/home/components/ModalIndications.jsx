import React, { useState } from 'react';
import { View, Modal, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const TextInputModal = ({ visible, onClose, onSubmit }) => {
    const [inputValue, setInputValue] = useState('');

    const handleSubmit = () => {
        onSubmit(inputValue);
        setInputValue('');
        onClose(); // Cerrar el modal después de enviar
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Escribe aquí..."
                        value={inputValue}
                        onChangeText={setInputValue}
                    />
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={onClose}>
                            <Text style={styles.buttonText}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                            <Text style={styles.buttonText}>Enviar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo semi-transparente
    },
    modalContent: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 10,
    },
    textInput: {
        width: '100%',
        borderColor: '#EEEEEE',
        borderWidth: 1,
        borderRadius: 20,
        padding: 10,
        marginBottom: 15,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    button: {
        flex: 1,
        backgroundColor: '#76ABAE',
        padding: 10,
        borderRadius: 20,
        marginHorizontal: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: '600',
    },
});

export default TextInputModal;
