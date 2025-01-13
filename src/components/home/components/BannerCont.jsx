import React from "react";
import { View, Image, Platform, StyleSheet, Dimensions } from "react-native";
const { width } = Dimensions.get('screen');


export default function FrameBanner({ uri, nameBanner, descrip }) {
    return (
        <View style={styles.Banner}>
            <Image
                source={{ uri: uri }}
                style={{ width: 350, height: 150, borderRadius: 20 }}
                resizeMode="cover" // Cambia a "cover" para que la imagen llene el área
            />
        </View>
    );
};


const styles = StyleSheet.create({

    Banner: {
        justifyContent: 'center',
        alignItems: 'center',
        width: width,
        height: 150,
        padding: 5,
        gap: 10,
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
    },


    ViewCenter: {
        alignItems: 'center',
        justifyContent: 'center',
    },

    progressContainer: {
        flexDirection: 'row',
        width: '80%',
        alignItems: 'center',
        paddingHorizontal: '5%',
    },
    animatedLine: {
        height: 4, // Altura de la línea de progreso
        backgroundColor: '#7ED882',
    },


    text: {
        fontFamily: 'Poppins_400Regular',
    },
    textt: {
        fontFamily: 'Poppins_600SemiBold',
    },
});
