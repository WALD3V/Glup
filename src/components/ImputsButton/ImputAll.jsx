import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const ImputAll = ({ placeholder, maxLength, keyboardType, nextInputRef }) => {
  const [inputText, setInputText] = useState('');


  const handleInputChange = (text) => {
    const formattedText = text.replace(/[^a-zA-Z0-9\s]/g, '');
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
        onSubmitEditing={() => {
          nextInputRef.current?.focus();
        }}
        returnKeyType="next" // Cambia el botón de retorno del teclado a "Siguiente"
        blurOnSubmit={false} // Evita que el teclado se cierre automáticamente al presionar "Siguiente"
      // Asigna la referencia al campo de entrada
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: '4%',
  },
  input: {
    width: '100%',
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

export default ImputAll;
