import React, { useState, useRef } from 'react';
import { TextInput, StyleSheet } from 'react-native';

const ImputSearch = ({ placeholder, maxLength, keyboardType, nextInputRef, font, ref }) => {
  const [inputText, setInputText] = useState('');


  const handleInputChange = (text) => {
    const formattedText = text.replace(/[^a-zA-Z0-9\s]/g, '');
    setInputText(formattedText);
  };

  return (
    <TextInput
      ref={ref}
      style={{
        paddingHorizontal: 10,
        fontFamily: font,
      }}
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

  );
};


export default ImputSearch;
