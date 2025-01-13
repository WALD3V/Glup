import React, { useState, useRef } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const ImputTxt = ({ placeholder, maxLength, keyboardType,onSubmitEditing}) => {
  const [inputText, setInputText] = useState('');
  

  const handleInputChange = (text) => {
    const formattedText = text.replace(/[^a-zA-Z\s]/g, '');
    setInputText(formattedText);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={handleInputChange}
        value={inputText}
        maxLength={maxLength}
        keyboardType={keyboardType}
        placeholder={placeholder}
        textAlign="left"
        onSubmitEditing={onSubmitEditing}
        returnKeyType="next" // Cambia el botón de retorno del teclado a "Siguiente"
        blurOnSubmit={false} // Evita que el teclado se cierre automáticamente al presionar "Siguiente"
         // Asigna la referencia al campo de entrada
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'transparent',
    paddingHorizontal: 10,
    marginBottom: 10,
    fontWeight: 'bold',
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

export default ImputTxt;
