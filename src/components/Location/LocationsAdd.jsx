import React, { useRef, useState } from "react";
import { SafeAreaView, StyleSheet, View, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform, Text, TextInput, Dimensions, Alert } from 'react-native';

import Header from "../user/header";
//fonts
import { useFonts } from 'expo-font';
import { useEffect, useCallback } from "react";
import * as SplashScreen from 'expo-splash-screen'
import { Poppins_600SemiBold, Poppins_300Light, Poppins_400Regular } from '@expo-google-fonts/poppins'
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import BkButton from "../ImputsButton/BackButton";
import { Skeleton } from "moti/skeleton";
import { MotiView } from "moti";
import MapView, { Marker } from "react-native-maps";
import { createAddressdata } from "../API/DirecionsSend";
import { getUserID } from "../Async/read";
const ColorComponents = "#76ABAE";//color app


export default function LocationAdd({ route }) {

    const navigation = useNavigation();


    const { latitude, longitude } = route.params || {};

    const coordinates = latitude && longitude ? `${latitude}, ${longitude}` : "Coordenadas no disponibles";

    const [region, setRegion] = useState(null); // Estado inicial del mapa
    const [isReady, setIsReady] = useState(false); // Controla la preparación del componente



    const tiperef = useRef();
    const numref = useRef();
    const referenceref = useRef();

    function retrasoHome() {
        setTimeout(() => {
            navigation.navigate("Home");
        }, 1000); // 2000 milisegundos = 2 segundos
    }



    const [addressData, setAddressData] = useState({
        user_id: '',
        name_address: '',
        type_address: '',
        address: '',
        block: '',
        references_add: '',
        villa: '',
        coordinates: coordinates,
    });


    const handleCrear = async () => {
        try {
            // Obtén el user_id
            const userId = await getUserID();

            // Actualiza el estado de addressData con el user_id
            const updatedAddressData = {
                ...addressData,
                user_id: userId,
            };

            // Envía los datos actualizados al backend
            const response = await createAddressdata(updatedAddressData);
            if (response) {
                Alert.alert('Éxito', 'La dirección se creó correctamente.');
                retrasoHome();// Navegar a la página principal

            } else {
                Alert.alert('Error', 'No se pudo crear la dirección. Inténtalo de nuevo.');
            }
        } catch (error) {
            console.error('Error al crear la dirección:', error);
            Alert.alert('Error', 'Ocurrió un error inesperado al crear la dirección. Inténtalo de nuevo.');
        }
    };



    const handleTypeAddress = (value) => {

        setAddressData((prevState) => ({ ...prevState, name_address: value })); // Actualizar el campo 'mail' en el estado

    };

    const handleBlock = (value) => {

        setAddressData((prevState) => ({ ...prevState, block: value })); // Actualizar el campo 'mail' en el estado

    };

    const handleReferences = (value) => {

        setAddressData((prevState) => ({ ...prevState, references_add: value })); // Actualizar el campo 'mail' en el estado

    };

    const Navigation = useNavigation();

    const [fontsLoaded] = useFonts({
        Poppins_300Light,
        Poppins_600SemiBold,
        Poppins_400Regular,
    });


    useEffect(() => {

        console.log(coordinates);
        if (latitude && longitude) {
            // Solo procede si las coordenadas están disponibles
            setRegion({
                latitude,
                longitude,
                latitudeDelta: 0.001,
                longitudeDelta: 0.001 * (Dimensions.get('window').width / Dimensions.get('window').height),
            });
            setIsReady(true); // Marca que el componente está listo
        } else {
            console.warn("Coordenadas no recibidas correctamente.");
        }



    }, [latitude, longitude]);

    if (!isReady) {
        // Muestra un estado de carga si los datos no están listos
        return (
            <View style={styles.loadingContainer}>
                <Text style={styles.loadingText}>
                    Cargando...
                </Text>
            </View>
        );
    }


    return (


        <View style={{
            flex: 1,
            backgroundColor: '#FFFF',
            paddingTop: Platform.OS == "android" ? 30 : "5%",
            paddingBottom: Platform.OS == "android" ? 15 : "5%"
        }}>

            <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : null}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                    <View style={{ flex: 1 }}>

                        <View style={{
                            paddingHorizontal: 15,
                            marginBottom: 20,

                        }}

                        >

                            <View
                                style={{
                                    marginBottom: 15
                                }}>
                                <BkButton />

                            </View>

                            <Header
                                text='Completa tu direccion'
                                fontFamily='Poppins_600SemiBold'
                                fontSize={24}

                            />

                        </View>

                        <MapView
                            style={styles.map}
                            region={region} // Usa `region` en lugar de `initialRegion`
                            showsUserLocation={false}
                            showsMyLocationButton={false}
                            scrollEnabled={false} // Deshabilitar desplazamiento
                            zoomEnabled={false}   // Deshabilitar zoom
                            pitchEnabled={false}  // Deshabilitar inclinación
                            rotateEnabled={false} // Deshabilitar rotación
                        >
                            <Marker
                                coordinate={{
                                    latitude: region.latitude,
                                    longitude: region.longitude,
                                }}
                            />
                        </MapView>

                        <View style={{
                            paddingHorizontal: 15,
                        }}>

                            <Option
                                placeholder={"etiqueta (ej: oficina, casa, trabajo)"}
                                onChangeText={handleTypeAddress}
                                value={addressData.name_address}
                                maxLength={200} // Longitud máxima según selección
                                keyboardType="default"
                                ref={tiperef}
                                onSubmitEditing={() => numref.current.focus()}
                                returnKeyType="next"
                            />

                            <Option
                                value={addressData.block}
                                onChangeText={handleBlock}
                                placeholder={"nº Dpto, Mz. & villa "}
                                maxLength={200} // Longitud máxima según selección
                                keyboardType="default"
                                ref={numref}
                                onSubmitEditing={() => referenceref.current.focus()}
                                returnKeyType="next"
                            />

                            <Option
                                value={addressData.references_add}
                                onChangeText={handleReferences}
                                placeholder={"referencias"}
                                maxLength={200} // Longitud máxima según selección
                                keyboardType="default"
                                ref={referenceref}

                            />

                            <TouchableOpacity
                                onPress={handleCrear}
                            >
                                <View
                                    style={{
                                        height: 45,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontFamily: 'Poppins_600SemiBold',
                                            fontSize: 20,
                                            color: ColorComponents,
                                        }}
                                    >
                                        Guardar
                                    </Text>
                                </View>
                            </TouchableOpacity>

                        </View>


                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </View>

    );
}



const Option = React.forwardRef(({ value, onChangeText, maxLength, keyboardType, onSubmitEditing, returnKeyType, placeholder }, ref) => {
    return (
        <View>
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder={placeholder}
                    value={value}
                    onChangeText={onChangeText}
                    maxLength={maxLength}
                    keyboardType={keyboardType}
                    style={styles.textInput}
                    onSubmitEditing={onSubmitEditing}
                    returnKeyType={returnKeyType}
                    ref={ref}
                />
            </View>
        </View>
    );
});


const styles = StyleSheet.create({
    inputContainer: {
        marginTop: 5,
        marginBottom: 10,
        borderRadius: 20,
        justifyContent: 'center',
        paddingHorizontal: 20,
        height: 40,
    },


    map: {
        height: 150,
        marginBottom: 20
    },
    container: {
        flex: 1,
        backgroundColor: "#FFFF",

    },
    containerSmall: {
        flex: 0.5,
        paddingHorizontal: 30,
        backgroundColor: "#CCC",
        borderRadius: 40,
        paddingVertical: 30,

    },



    ViewCenter: {

        alignItems: 'center',
        justifyContent: 'center',
    },
    Text: {
        paddingTop: '40%',
        paddingBottom: '10%',
        textAlign: "center",

    },

    Item: {
        flex: 1,

    },

    leftItem: {
        flex: 1,
        alignItems: 'flex-start',
    },
    rightItem: {
        flex: 1,
        alignItems: 'flex-end',
    },


});