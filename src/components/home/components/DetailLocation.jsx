import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { Entypo } from '@expo/vector-icons';

const ColorComponents = "#76ABAE";//color app

export default function HeadDirrection({ fontTitle, font, navigate, text }) {

    return (
        <View style={{ height: 60 }}>
            <Text style={{ fontFamily: fontTitle, fontSize: 16, color: '#31363F' }}>Entregar en:</Text>

            <TouchableOpacity style={{ width: "100%", height: 40, justifyContent: 'center' }} onPress={navigate} >
                <View style={{ flexDirection: 'row', alignItems: 'center', width: "100%" }}>
                    <Text style={{ fontSize: 12, fontFamily: font, width: "75%" }}>
                        {text.length > 18 ? text.substring(0, 18) + "..." : text}
                    </Text>
                    <Entypo name="chevron-down" size={30} color={ColorComponents} />
                </View>
            </TouchableOpacity>
        </View>

    );

}