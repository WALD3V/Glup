import React from 'react';
import { StatusBar, StyleSheet, Text, View, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform, SafeAreaView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { useEffect, useCallback } from "react";
import * as SplashScreen from 'expo-splash-screen'
import { Poppins_600SemiBold, Poppins_400Regular, Poppins_200ExtraLight } from '@expo-google-fonts/poppins'
//icons
import { SimpleLineIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';


const ColorComponents = "#76ABAE";


export default function Login() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_200ExtraLight,
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
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : null}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <SafeAreaView style={styles.container}>
          <View style={{ flex: 1, paddingHorizontal: 15, paddingTop: Platform.OS == "android" && 10 }} onLayout={onLayout} >
            <View style={{ flexDirection: "row", paddingVertical: 10, }}>
              <View style={styles.leftItem}>
              </View>
              <View style={styles.rightItem}>
                <SimpleLineIcons name="options" size={24} color="black" />
              </View>

            </View>
            <View style={styles.logo}>
              <Text style={{ fontSize: 30 }} >Glup</Text>
            </View>
            <StatusBar style="auto" />
            <View style={styles.ViewCenter}>
              <Text style={styles.text}>inicia:</Text>
            </View>
            <SignA />
            <Text style={{ fontSize: 12, textAlign: 'center', justifyContent: 'center', width: "100%", fontFamily: "Poppins_400Regular" }}>Version 0.0.1</Text>
          </View>

        </SafeAreaView>

      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}





const SignA = () => {
  const navigation = useNavigation();

  const renderContent = () => {

    if (Platform.OS === 'ios') {
      return (
        <OptionnSign
          onPress={() => navigation.navigate("SelectSupplier")}
          iconSign={<AntDesign name="apple1" size={24} color="#FFFF" />}
          text={'Continua con Apple'}
          colorbk={'black'}
        />
      );
    } else if (Platform.OS === 'android') {
      return (
        <OptionnSign
          onPress={() => navigation.navigate("SelectSupplier")}
          iconSign={<FontAwesome5 name="google" size={24} color="#FFFF" />}
          text={'Continua con Google'}
          colorbk={'black'}
        />
      );
    }
  }; 


  return (
    <View style={{ paddingVertical: 20, paddingHorizontal: 15 }}>

       {renderContent()} 

      <OptionnSign
        onPress={() => navigation.navigate("Register")}
        iconSign={<Ionicons name="call-sharp" size={24} color="#FFFF" />}
        text={'Continua con tu Número'}
        colorbk={'#7ED882'}
      />
    </View>
  );
};

const OptionnSign = ({ iconSign, onPress, colorbk, text }) => {
  return (
    <TouchableOpacity onPress={onPress} >
      <View style={{
        flexDirection: 'row',
        height: 60,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        backgroundColor: colorbk,
        marginTop: 20

      }}>
        <View style={{ paddingEnd: 10 }}>
          {iconSign}
        </View>
        <View>
          <Text style={{ color: '#FFFF', fontFamily: 'Poppins_600SemiBold' }}>{text}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};



const NewSing = () => {
  const Navigation = useNavigation();

  return (
    <View style={{ flexDirection: "row", paddingVertical: 20, height: 100, }}>
      <OptionSign onPress={() => Navigation.navigate("SelectSupplier")}
        iconSign={<AntDesign name="apple1" size={24} color="black" />}
      />
      <OptionSign onPress={() => Navigation.navigate("SelectSupplier")}
        iconSign={<FontAwesome5 name="facebook" size={24} color="#3b5998" />}
      />
      <OptionSign onPress={() => Navigation.navigate("Register")}
        iconSign={<Ionicons name="call-sharp" size={24} color="#7ED882" />}
      />
      <OptionSign onPress={() => Navigation.navigate("SelectSupplier")}
        iconSign={<AntDesign name="pluscircle" size={24} color={ColorComponents} />}
      />


    </View>
  );
};


const OptionSign = ({ iconSign, onPress }) => {
  return (
    <View style={styles.IconSign}>
      <TouchableOpacity onPress={onPress} >
        <View style={{ height: 60, width: 60, alignItems: 'center', justifyContent: 'center', borderRadius: 50, backgroundColor: '#FFFF' }}>
          {iconSign}
        </View>
      </TouchableOpacity>
    </View>
  );
};



const styles = StyleSheet.create({
  logo: {

    flex: 1,
    alignItems: "center",
    justifyContent: "center",

  },
  container: {
    flex: 1,
    backgroundColor: '#F5F5F8',
    padding: 1,
  },

  IconSign: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'

  },


  ViewCenter: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftItem: {
    flex: 1,
    alignItems: 'flex-start',
  },
  rightItem: {
    flex: 1,
    alignItems: 'flex-end',
  },

  text: {
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Poppins_400Regular',
  },

});
