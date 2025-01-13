import React from 'react';
import { StyleSheet, Text, View, Platform, SafeAreaView } from 'react-native';
//import for fonts
import { useFonts } from 'expo-font';
import { useEffect, useCallback } from "react";
import * as SplashScreen from 'expo-splash-screen'
import { Poppins_600SemiBold, Poppins_300Light, Poppins_400Regular } from '@expo-google-fonts/poppins'

import Orders from '../../API/OrdersList';
import BkButton from '../../ImputsButton/BackButton';

const ColorComponents = "#76ABAE";//color app


export default function OrderHistorial() {
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
        <SafeAreaView style={styles.container}>

            <View style={{
                flex: 1,
                paddingHorizontal: 15,
                backgroundColor: '#FFFF',
                paddingTop: Platform.OS == "android" ? 30 : 10,
            }}
                onLayout={onLayout}

            >


                <View
                    style={{
                        marginBottom: 15
                    }}>
                    <BkButton />

                </View>
                <View style={{ width: '100%', }}>

                    <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 30, width: '75%' }}>
                        Mis pedidos:
                    </Text>
                    <View style={{ width: '25%', alignItems: 'flex-end' }}>
                    </View>
                </View>
                <Separator />
                <Orders />


            </View>



        </SafeAreaView>

    );
}

const Separator = () => {
    return <View style={styles.separator} />;
};





const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#FFFF',
    },

    separator: {
        marginBottom: "10%"
    },

    Product: {
        flex: 0.3,
        width: '50%',
        borderRadius: 20,
        backgroundColor: '#fff',
        padding: '5%',
    },

    Line: {
        flex: 1,
        height: '20%',
        backgroundColor: '#7ED882',
        borderRadius: 10,

    },

    SearchBar: {
        height: 40,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "#ccc",
        borderRadius: 40,
        paddingHorizontal: 15,
    },
    StateOrder: {
        height: '20%',
        borderRadius: 20,
        backgroundColor: "#fff",
        padding: "5%"
    },

    Information: {
        height: '15%',
        borderRadius: 20,
        borderBlockColor: 'black',
        backgroundColor: "#fff",
        padding: "5%",
        justifyContent: 'center',
        alignItems: 'center',
    },


    ViewCenter: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    leftItem: {
        alignItems: 'flex-start',
        width: '75%',
    },
    CartItem: {
        justifyContent: "flex-start",
        width: '25%',
    },

    text: {
        fontWeight: 'bold',
    },

});
