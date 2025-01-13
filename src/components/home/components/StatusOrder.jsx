import React from "react";
import { View, Text, StyleSheet, Platform, Animated, Easing, Dimensions } from "react-native";
import { useState, useRef, useEffect } from "react";
import { Octicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import getDisplayDate from "./formatHour";
import { Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold } from "@expo-google-fonts/poppins";
import * as Progress from 'react-native-progress';
import { decay, timing } from "react-native-reanimated";

const { width } = Dimensions.get('screen');

export default function StateOrder({ delivery_date, statusDelivery, addres, idOrder }) {
    const Navigation = useNavigation();

    const newHour = getDisplayDate(delivery_date);

    return (
        <View style={styles.ContainerOrder}>
            <View style={styles.StateOrder}>
                <TouchableOpacity onPress={() => Navigation.navigate('DetailOrder', { orderid: idOrder })}>
                    <ViewOrder
                        delivery_date={newHour}
                        addres={addres}
                    />

                </TouchableOpacity>
            </View >
        </View>


    );


};

export const ViewOrder = ({ delivery_date, addres }) => (
    <View>
        <View style={[{ alignItems: "center" }]}>
            <Text style={{ fontSize: 12, fontFamily: "Poppins_500Medium" }}>

                {addres.length > 30 ? addres.substring(0, 30) + "..." : addres}

            </Text>
        </View>

        <LineStatus />
        <View style={[styles.ViewCenter, { paddingBottom: 5 }]}>
            <Text style={styles.textt}>
                Entrega estimada:
            </Text>


        </View>
        <View style={[styles.ViewCenter]}>
            <Text style={styles.text}>
                {delivery_date}
            </Text>
        </View>
    </View>

);



export const LineStatus = () => {

    return (
        <View style={{ flexDirection: "row", paddingBottom: 10, justifyContent: 'center' }}>
            <MaterialCommunityIcons name="truck-fast-outline" size={24} color="black" />

            <View style={styles.progressContainer}>
                <View style={{ width: '5%' }} />

                <Progress.Bar color={"#7ED882"} animationType={timing} progress={0.5} width={200} />


                <View style={{ width: '5%' }} />
            </View>

            <Octicons name="location" size={24} color="black" />
        </View>
    );
};



const styles = StyleSheet.create({


    ContainerOrder: {
        justifyContent: 'center',
        alignItems: 'center',
        width: width,
        height: 170,
    },
    
    StateOrder: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        height: 150,
        width: 350,
        borderRadius: 40,
        backgroundColor: "#fff",

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


