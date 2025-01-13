import React, { useRef, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, Keyboard, Platform, SafeAreaView, KeyboardAvoidingView } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { Poppins_600SemiBold, Poppins_300Light, Poppins_400Regular } from '@expo-google-fonts/poppins';
import * as Location from 'expo-location';

import { GOOGLE_MAPS_KEY } from '@env';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';

//iconss
import { Ionicons } from '@expo/vector-icons';
import BkButton from '../ImputsButton/BackButton';

const ColorComponents = "#76ABAE"; // Color app

export default function LocSearch() {
    const Navigation = useNavigation();

    const [fontsLoaded] = useFonts({
        Poppins_300Light,
        Poppins_600SemiBold,
        Poppins_400Regular,
    });


    const googlePlacesRef = useRef(null);

    useEffect(() => {
        getLocationPermission();
 
        const timer = setTimeout(() => {
            if (googlePlacesRef.current) {
                googlePlacesRef.current.setAddressText(''); // To trigger focus on the input
                googlePlacesRef.current.focus();
            }
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    //location
    async function getLocationPermission() {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          alert('Permission denied');
          return;
        }
        let location = await Location.getCurrentPositionAsync({});
        const current = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude
        }
        setOrigin(current);
      }


      const [origin, setOrigin] = React.useState({
        latitude: '',
        longitude: '',
      });

    const onLayout = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) return null;

    






    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : null}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <SafeAreaView style={styles.container}>
                    <View style={{ flex: 1, paddingHorizontal: 15, paddingTop: Platform.OS == "android" ? 30 : 20 }} onLayout={onLayout}>
                        <View style={{ flex: 1 }}>
                            <BkButton/>
                            <View
                                style={{height: 20}}
                            />

                            <GooglePlacesAutocomplete
                                fetchDetails={true}
                                ref={googlePlacesRef}
                                placeholder='Busca una direccion despacho..'
                                onPress={(data, details = null) => {
                                    // 'details' is provided when fetchDetails = true
                                    console.log(data, details);

                                    if (details) {
                                        const location = details.geometry.location;
                                        Navigation.navigate('Maps', {
                                            latitude: location.lat,
                                            longitude: location.lng,
                                            Userlatitude: origin.latitude,
                                            Userlongitude: origin.longitude,
                                            
                                        });
                                    }
                                }}
                                query={{
                                    key: GOOGLE_MAPS_KEY,
                                    language: 'es',
                                    components: 'country:ec',
                                }}
                                styles={{
                                    textInputContainer: {},
                                    textInput: {
                                        height: 50,
                                        fontSize: 14,
                                        backgroundColor: '#EEEEEE',
                                        borderRadius: 10,
                                    },
                                    predefinedPlacesDescription: {
                                        color: '#1faadb',
                                    },
                                }}
                            />
                        </View>

                    </View>
                </SafeAreaView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}



const styles = StyleSheet.create({

    

    container: {
        flex: 1,
        backgroundColor: '#FFFF',
    },

    separator: {
        marginBottom: "10%"
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
