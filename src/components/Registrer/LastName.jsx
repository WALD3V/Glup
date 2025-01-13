import React from "react";
import { StyleSheet, Text, View} from 'react-native';
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from '@react-navigation/native';
import { useState } from "react";
//fonts
import { useFonts } from 'expo-font';
import { useEffect, useCallback } from "react";
import * as SplashScreen from 'expo-splash-screen'
import { Poppins_600SemiBold, Poppins_300Light, Poppins_400Regular } from '@expo-google-fonts/poppins'
import ImputNumber from "../ImputsButton/ImputInt";
import Datareg from "./model";

const ColorComponents = "#76ABAE";

export default function LastName() {
    const Navigation = useNavigation();

    const HandleSent = () => {
        // Navegar a la pantalla de destino
        Navigation.navigate('LastName');
    };


    const [fontsLoaded] = useFonts({
        Poppins_300Light,
        Poppins_600SemiBold,
        Poppins_400Regular,
    });
    useEffect(() => {
        async function prepare() {
            await SplashScreen.preventAutoHideAsync();
        }
        prepare();
    }, []);

    const onLayout = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, []);

    // Valorar el largo del input
    const [inputText, setInputText] = useState('');

    const handleInputChange = (text) => {
        // Filtrar cualquier carácter que no sea un número usando una expresión regular
        const formattedText = text.replace(/[^a-zA-Z\s]/g, '');
        setInputText(formattedText);
    };

    
    if (!fontsLoaded) return null;

    return (
        <Datareg
            onLayout={onLayout}
            textTitle="Cual es tu Apellido"
            inputComponent={
                <ImputNumber
                    onInputChange={handleInputChange}
                    value={inputText} maxLength={10}
                    placeholder="Tu apellido"
                    size={24}
                />
            }
            inputbutton={inputText.length > 4 && ( // Cambia 10 por la longitud máxima que deseas
                <OptionsAdd text={'sig'} navigate={'HomeNav'} />
            )}
        />
    );
};



const OptionsAdd = ({ text, navigate }) => {
    const Navigation = useNavigation();

    return (
        <TouchableOpacity onPress={() => Navigation.navigate(navigate)}>
            <View style={styles.botonSms}>
                    <Text style={{ color: "#FFFF", fontFamily: "Poppins_600SemiBold", fontSize: 14 }}>
                        {text}
                    </Text>
                </View>
        </TouchableOpacity>
    );
};



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFF',
        borderColor: "black",
    },
    TitleText: {
        fontFamily: 'Poppins_600SemiBold',
        fontSize: 23,
    },
    botonSms: {
        paddingHorizontal: "5%",
        borderRadius: 30,
        height: 60,
        width: 100,
        backgroundColor: ColorComponents,
        alignItems: "center",
        justifyContent: "center",
    }
});
