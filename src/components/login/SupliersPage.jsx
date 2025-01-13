import React, { useState } from 'react';
import { StyleSheet, Text, View, Platform, SafeAreaView, Button } from 'react-native';
//import for fonts
import { useFonts } from 'expo-font';
import { useEffect, useCallback } from "react";
import * as SplashScreen from 'expo-splash-screen'
import { Poppins_600SemiBold, Poppins_300Light, Poppins_400Regular } from '@expo-google-fonts/poppins'
import CcButton from '../ImputsButton/Cancelbutton';
import Suppliers from './SuppliersList';
import { useNavigation } from '@react-navigation/native';
import { saveDataUser } from '../Async/save';
const ColorComponents = "#76ABAE";//color app


export default function SuppliersPage() {


    const navigation = useNavigation();

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
    }, [fontsLoaded])

    if (!fontsLoaded) return null;

    return (


        <View style={styles.container} onLayout={onLayout}>
            <SafeAreaView style={{ flex: 1 }}>
                <CcButton />
                <View style={{ flex: 1, marginTop: 20, width: '100%' }}>
                    <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 30, width: '100%', marginBottom: 10 }}>
                        Selecciona tu Proveedor
                    </Text>

                    <Separator />

                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <Suppliers />
                    </View>


                    <Button
                        onPress={
                            saveDataUser
                        }
                        title='HomeTest'
                    >



                    </Button>

                </View>

            </SafeAreaView>
        </View>




    );
};
const Separator = () => {
    return <View style={styles.separator} />;
};


const styles = StyleSheet.create({
    container: {
        flex: 1,

        backgroundColor: '#FFFF',
        paddingHorizontal: 30,
        paddingTop: Platform.OS === "android" ? 30 : "5%"
    },
    separator: {
        marginBottom: "10%"
    },

});