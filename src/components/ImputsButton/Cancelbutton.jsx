import React from "react";
import { View, StyleSheet,Platform } from "react-native";
import Feather from '@expo/vector-icons/Feather';
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";



export default function CcButton() {
    const Navigation = useNavigation();

    return (
        <View style={styles.backButton}>
            <TouchableOpacity
                onPress={() => Navigation.goBack()}>
                <Feather name="x" size={24} color="black" />
            </TouchableOpacity>
        </View>
    );
};


const styles = StyleSheet.create({


    backButton: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 45,
        height: 45,

        padding: 10,
        backgroundColor: '#FFFF',
        borderRadius: 50,


        ...Platform.select({
            android: {
                elevation: 10,
                // Sombra en Android
            },
            ios: {
                shadowColor: '#CCC',
                shadowOffset: { width: 2, height: 4 },
                shadowOpacity: 0.6,
                shadowRadius: 5,
                elevation: 10,
            },
        }),
    },

});