import React from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, Keyboard, Platform, SafeAreaView} from 'react-native';
import Location from './locations';


const ColorComponents = "#76ABAE";//color app


export default function PageLocation() {
   
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <SafeAreaView style={{flex: 1}}>
                <View style={{ backgroundColor: "#FFFF", flex: 1, paddingHorizontal: 30, paddingTop: Platform.OS == "android" ? 10 : "5%" }}>
                    <Location/>

                </View>

            </SafeAreaView>

        </TouchableWithoutFeedback>
    );
}

