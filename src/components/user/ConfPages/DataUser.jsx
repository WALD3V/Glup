import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, Keyboard, Platform, SafeAreaView, Modal, TouchableOpacity, FlatList, KeyboardAvoidingView, Alert } from 'react-native';
import { useFonts } from 'expo-font';
import { useEffect, useCallback } from "react";
import * as SplashScreen from 'expo-splash-screen';
import { Poppins_600SemiBold, Poppins_300Light, Poppins_400Regular } from '@expo-google-fonts/poppins';
import { TextInput } from 'react-native-gesture-handler';
import { getUserID } from '../../Async/read';
import { getUserData, updateUserData } from '../../API/UserData';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import BkButton from '../../ImputsButton/BackButton';

const ColorComponents = "#76ABAE"; // Color de la app


export default function DataUser() {



    const [userData, setUserData] = useState({
        name: '',
        lastname: '',
        cellphone_number: '',
        email: ''
    });

    const loadUserData = async () => {
        const userId = await getUserID();
        try {
            const data = await getUserData(userId);
            setUserData({
                name: data.name,
                lastname: data.lastname,
                cellphone_number: data.cellphone_number,
                email: data.email,
            });

        } catch (error) {
            Alert.alert('Error', 'No tienes datos guardados');
        }
    };


    const handleSave = async () => {
        const userId = await getUserID();
        await updateUserData(userId, userData);
        Alert.alert('¡Bien!', 'Tus datos se han actualizado correctamente.');
    };


    const [fontsLoaded] = useFonts({
        Poppins_300Light,
        Poppins_600SemiBold,
        Poppins_400Regular,
    });

    const identificacionRef = useRef();
    const lastnameRef = useRef();
    const mailRef = useRef();
    const numberRef = useRef();

    useEffect(() => {

        loadUserData();


        async function prepare() {
            await SplashScreen.preventAutoHideAsync();


        }
        prepare();



    }, []);

    const onLayout = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) return null;


    const handleMailChange = (value) => {

        setUserData((prevState) => ({ ...prevState, email: value })); // Actualizar el campo 'mail' en el estado

    };
    const handleName = (value) => {

        setUserData((prevState) => ({ ...prevState, name: value })); // Actualizar el campo 'mail' en el estado

    };
    const handleLastName = (value) => {

        setUserData((prevState) => ({ ...prevState, lastname: value })); // Actualizar el campo 'mail' en el estado

    };


    const handleIdentificacionChange = (value) => {
        // Permitir solo números y cadenas vacías para poder borrar
        const regex = /^\d*$/; // Usar \d para solo dígitos

        // Verificamos si el valor cumple con la regex
        if (regex.test(value)) {
            setUserData((prevState) => ({ ...prevState, cellphone_number: value })); // Actualiza directamente el campo "cellphone_number"
        }
    };



    return (

        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
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

                    <View style={{ width: '100%', marginBottom: 20, flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ width: '80%' }}>

                            <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 28, marginBottom: 10 }}>
                                Mis Datos
                            </Text>
                            <Text style={{ fontFamily: 'Poppins_400Regular', fontSize: 14 }}>
                                Manten tus datos actualizados
                            </Text>
                        </View>
                        <View style={{ width: '20%', alignItems: 'center', justifyContent: 'center' }}>
                            <FontAwesome name="user-o" size={40} color={ColorComponents} />
                        </View>

                    </View>

                    <View style={{ paddingHorizontal: 10 }}>


                        <Option
                            text={"Nombres"}
                            value={userData.name}
                            onChangeText={handleName}
                            maxLength={50} // Longitud máxima según selección
                            keyboardType="default"
                            ref={identificacionRef}
                            onSubmitEditing={() => lastnameRef.current.focus()}
                            returnKeyType="next"


                        />
                        <Option
                            text={"Apellidos"}
                            value={userData.lastname}
                            onChangeText={handleLastName}
                            maxLength={50} // Longitud máxima según selección
                            keyboardType="default"
                            ref={lastnameRef}
                            onSubmitEditing={() => mailRef.current.focus()}
                            returnKeyType="next"


                        />


                        <Option
                            text={"Correo"}
                            value={userData.email}
                            onChangeText={handleMailChange}
                            maxLength={200} // Longitud máxima según selección
                            keyboardType="default"
                            ref={mailRef}
                            onSubmitEditing={() => numberRef.current.focus()}
                            returnKeyType="next"
                        />


                        <Option
                            text={"numero"}
                            value={userData.cellphone_number}
                            onChangeText={handleIdentificacionChange}
                            maxLength={13} // Longitud máxima según selección
                            keyboardType="numeric"
                            ref={numberRef}
                        />
                    </View>


                    <View
                        style={{
                            alignItems: 'center',
                            justifyContent: "center",
                            flex: 1
                        }}
                    >
                        <TouchableOpacity
                            onPress={handleSave}
                        >
                            <Text
                                style={{
                                    fontSize: 20,
                                    fontFamily: 'Poppins_600SemiBold',
                                    color: ColorComponents,
                                }}>
                                Guardar

                            </Text>

                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
};

const Option = React.forwardRef(({ text, value, onChangeText, maxLength, keyboardType, onSubmitEditing, returnKeyType }, ref) => {
    return (
        <View style={{ marginBottom: 20 }}>
            <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 14, marginBottom: 5, marginStart: 5 }}>
                {text}
            </Text>
            <TextInput
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
    );
});

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
    formContainer: {
        flex: 1,
        justifyContent: "flex-start",
    },
    
    textInput: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 13,
        backgroundColor: '#EEEEEE',
        borderRadius: 15,
        paddingHorizontal: 20,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    option: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        width: '100%',
    },
    optionText: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 14,
    },
});
