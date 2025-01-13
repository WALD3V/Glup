import React from "react";
import { StyleSheet, Text, View, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform, SafeAreaView } from 'react-native';
const ColorComponents = "#76ABAE";


export default function Datareg ({ textTitle, textcoment, inputComponent, onLayout, inputbutton, navigator }){
    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : null}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <SafeAreaView style={styles.container}>
                    <View onLayout={onLayout} style={{ flex: 1, paddingHorizontal: 20, paddingTop: Platform.OS == "android" ? 30 : "5%" }}>
                        <Text style={styles.TitleText}>{textTitle}</Text>
                        <Text style={{ fontFamily: 'Poppins_300Light' }}>{textcoment}</Text>
                        <View style={{ flex: 0.75, justifyContent: 'center', alignItems: 'center' }}>
                            {inputComponent}
                            {inputbutton}
                        </View>
                    </View>
                </SafeAreaView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>

    );
};


const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#FFFF',
    },
    TitleText: {
        fontFamily: 'Poppins_600SemiBold',
        fontSize: 23,
    },
    botonSms: {
        paddingHorizontal: "5%",
        borderRadius: 30,
        height: 60,
        width: 1,
        backgroundColor: ColorComponents,
        alignItems: "center",
        justifyContent: "center",

    }

});