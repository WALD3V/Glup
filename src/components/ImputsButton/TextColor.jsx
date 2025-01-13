
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import React from "react";






const ColorComponents = "#76ABAE";

export default function TextColor({  fontSize, font, text, onPress }) {



  return (
    <TouchableOpacity onPress={onPress} style={styles.buttonTouchable}>
      <Text style={[styles.buttonText, { fontFamily: font, fontSize: fontSize }]}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonTouchable: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: "#76ABAE",
  },
});
