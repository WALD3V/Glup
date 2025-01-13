import React from "react";
import { View, Text, StyleSheet } from "react-native";



export default function Header({ text, fontSize, fontFamily }) {
  return (

    <Text style={{ 
      fontFamily: fontFamily,
      fontSize: fontSize,
      
    }}>
      {text}
    </Text>
    
  );
};

