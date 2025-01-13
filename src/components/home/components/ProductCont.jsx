import { Poppins_400Regular, Poppins_600SemiBold } from "@expo-google-fonts/poppins";
import React from "react";
import { View, Text, Image, Platform } from "react-native";

export default function FrameProduct({ uri, nameProduct, descrip, price, add }) {
    return (
        <View style={{
            height: 250,
            width: 175,
            borderRadius: 20,
            marginTop: 5,
            marginLeft: 20,
            backgroundColor: '#fff',
            marginBottom: 15,


            ...Platform.select({
                android: {
                    elevation: 6,
                    // Sombra en Android
                },
                ios: {
                    shadowColor: '#CCC',
                    shadowOffset: { width: 2, height: 6 },
                    shadowOpacity: 0.6,
                    shadowRadius: 6,
                },
            }),

        }}>
            <View style={{ flex: 4, justifyContent: 'center', alignItems: 'center' }}>
                <Image
                    source={{ uri: uri }}
                    style={{ width: 150, height: 150, }}
                    resizeMode="contain"
                />

            </View>
            <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontFamily: "Poppins_500Medium", fontSize: 16 }}>
                    {nameProduct}
                </Text>
                <Text style={{ fontFamily: "Poppins_400Regular", fontSize: 14, color: "#7ED882"}}>
                    precio: $ {price}
                </Text>
                <View>
                    {add}
                </View>


            </View>
        </View>
    );
};


