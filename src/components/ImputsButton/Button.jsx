import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

const ColorComponents = "#76ABAE";

export default function ButtonClasic({ text, onPress }) {
  

  return (
    <View style={styles.Button_1}>
      <TouchableOpacity onPress={onPress} style={styles.buttonTouchable}>
        <Text style={styles.buttonText}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  Button_1: {
    backgroundColor: ColorComponents,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40,
    padding: 10,
    

    
  },
  buttonTouchable: {
    width: "100%",
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
