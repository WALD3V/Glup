import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, Keyboard, Platform, SafeAreaView, Modal, TouchableOpacity, FlatList, KeyboardAvoidingView, Alert } from 'react-native';
import { useFonts } from 'expo-font';
import { useEffect, useCallback } from "react";
import * as SplashScreen from 'expo-splash-screen';
import { Poppins_600SemiBold, Poppins_300Light, Poppins_400Regular } from '@expo-google-fonts/poppins';
import { TextInput } from 'react-native-gesture-handler';
import { getUserID } from '../../Async/read';
import { createBillingData, getUserData, updateUserData } from '../../API/BillingData';
import BkButton from '../../ImputsButton/BackButton';
import AntDesign from '@expo/vector-icons/AntDesign';

const ColorComponents = "#76ABAE"; // Color de la app

const options = [
    { label: "Ruc", value: "ruc" },
    { label: "Cédula de Identidad", value: "cedula" }
];



export default function DataFacturation() {

    const [hasBillingData, setHasBillingData] = useState(false); // Estado para verificar si ya tiene datos de facturación

    const [loading, setLoading] = useState(true);

    const [keyboardVisible, setKeyboardVisible] = useState(false);

    const [selectedValue, setSelectedValue] = useState("");
    const [modalVisible, setModalVisible] = useState(false);

    const [userData, setUserData] = useState({
        tipo: 'ruc',
        numero: '',
        razon_social: '',
        billing_mail: '',
    });

    const loadUserData = async () => {
        const userId = await getUserID();
        try {
            const data = await getUserData(userId);
            setUserData({
                tipo: data.tipo,
                numero: data.numero,
                razon_social: data.razon_social,
                billing_mail: data.billing_mail,
            });
            setHasBillingData(true);
            setSelectedValue(data.tipo);

        } catch (error) {
            Alert.alert('Error', 'No tienes datos guardados');
            setSelectedValue("ruc")
        } finally {
            setLoading(false);
        }
    };


    const handleSave = async () => {
        const userId = await getUserID();

        try {
            if (hasBillingData) {
                // Actualizar datos existentes con PUT
                await updateUserData(userId, userData);
                Alert.alert('¡Éxito!', 'Los datos de facturación se han actualizado correctamente.');
            } else {
                // Crear nuevos datos con POST
                const newBillingData = {
                    user_id: userId,
                    numero: userData.numero,
                    tipo: userData.tipo,
                    razon_social: userData.razon_social,
                    billing_mail: userData.billing_mail,
                };
                await createBillingData(newBillingData);
                setHasBillingData(true); // Actualiza el estado indicando que ahora tiene datos
                Alert.alert('¡Éxito!', 'Los datos de facturación se han creado correctamente.');
            }
        } catch (error) {
            Alert.alert('Error', 'Hubo un problema al guardar los datos: ' + error.message);
        }
    };


    const [fontsLoaded] = useFonts({
        Poppins_300Light,
        Poppins_600SemiBold,
        Poppins_400Regular,
    });

    const identificacionRef = useRef();


    useEffect(() => {

        loadUserData();


        async function prepare() {
            await SplashScreen.preventAutoHideAsync();


        }
        prepare();


        const keyboardDidShowListener = Keyboard.addListener(
            Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
            () => {
                setKeyboardVisible(true); // Cambia el estado a 'true' cuando se abre el teclado
            }
        );
        const keyboardDidHideListener = Keyboard.addListener(
            Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
            () => {
                setKeyboardVisible(false); // Cambia el estado a 'false' cuando se oculta el teclado
            }
        );

        // Limpia los listeners cuando el componente se desmonta
        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };



    }, []);

    const onLayout = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) return null;

    const handleRazonSocialChange = (value) => {
        // Permitir solo caracteres alfabéticos, espacios y cadenas vacías
        const regex = /^[\p{L}\s]*$/u;
        if (regex.test(value) || value === "") {
            setUserData({ ...userData, razon_social: value });
        }
    };

    const handleMailChange = (value) => {

        setUserData((prevState) => ({ ...prevState, billing_mail: value })); // Actualizar el campo 'mail' en el estado

    };
    const handleIdentificacionChange = (value) => {
        setUserData((prevState) => ({ ...prevState, numero: value })); // Actualiza directamente el campo "numero"
    };

    const handleSelectOption = (value) => {
        setSelectedValue(value);
        setUserData({ ...userData, tipo: value });
        setModalVisible(false);
        //setIdentificacion(""); // Clear the identification field when switching
    };

    return (

        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <SafeAreaView style={styles.container}>
                <View style={{
                    flex: 1,
                    paddingHorizontal: 20,
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
                    <View style={{ width: '100%' }}>
                        <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 26 }}>
                            Datos para Facturación
                        </Text>
                        <Separator />
                        {!keyboardVisible && (
                            <View>
                                <Text style={{ fontFamily: 'Poppins_400Regular', fontSize: 12, textAlign: 'justify', color: '#ccc' }}>
                                    Tu factura será emitida por tu proveedor seleccionado,
                                    Glup solo gestiona los pedidos con nuestros aliados para problemas con tu factura
                                    ir al apartado Perfil/ayuda para contactar con tu proveedor directamente
                                </Text>
                                <Separator />
                            </View>
                        )}
                    </View>




                    <View style={{ paddingHorizontal: 10 }}>
                        <View>
                            <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 14 }}>
                                Tipo de identificación:
                            </Text>
                            <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.inputContainer}>
                                <Text style={styles.input}>{selectedValue}</Text>
                                <View style={{width: '50%'}}>
                                </View>
                                <AntDesign style={{ textAlignVertical: 'center', textAlign: 'right', width: '20%', paddingEnd: 10 }} name="swap" size={24} color="#cccc" />
                            </TouchableOpacity>
                            <Modal
                                transparent={true}
                                animationType="slide"
                                visible={modalVisible}
                                onRequestClose={() => setModalVisible(false)}
                            >
                                <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                                    <View style={styles.modalOverlay}>
                                        <View style={styles.modalContainer}>
                                            <FlatList
                                                data={options}
                                                keyExtractor={(item) => item.value}
                                                renderItem={({ item }) => (
                                                    <TouchableOpacity onPress={() => handleSelectOption(item.value)} style={styles.option}>
                                                        <Text style={styles.optionText}>{item.label}</Text>
                                                    </TouchableOpacity>
                                                )}
                                            />
                                        </View>
                                    </View>
                                </TouchableWithoutFeedback>
                            </Modal>
                        </View>

                        <Option
                            text={selectedValue === "ruc" ? "ruc:" : "Cédula:"}
                            value={userData.numero}
                            onChangeText={handleIdentificacionChange}
                            maxLength={13} // Longitud máxima según selección
                            keyboardType="numeric"
                            ref={identificacionRef}
                        />
                        <Option
                            text={selectedValue === "ruc" ? "Razón Social:" : "Nombre:"}
                            value={userData.razon_social}
                            onChangeText={handleRazonSocialChange}
                            maxLength={50}
                            keyboardType="default"
                            onSubmitEditing={() => identificacionRef.current.focus()}
                            returnKeyType="next"
                        />

                        <Option
                            text={"Correo:"}
                            value={userData.billing_mail}
                            onChangeText={handleMailChange}
                            maxLength={200} // Longitud máxima según selección
                            keyboardType="default"
                            ref={identificacionRef}

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
        <View>
            <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 14 }}>
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
    inputContainer: {
        flexDirection: 'row',
        marginTop: 5,
        marginBottom: 10,
        backgroundColor: '#EEEEEE',
        borderRadius: 15,
        alignContent: 'center ',
        height: 40,
    },
    input: {
        width: '30%',
        textAlignVertical: 'center',
        fontFamily: 'Poppins_400Regular',
        fontSize: 12,
        backgroundColor: '#EEEEEE',
        borderRadius: 15,
        paddingStart: 20,
    },
    textInput: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 12,
        backgroundColor: '#EEEEEE',
        borderRadius: 15,
        paddingHorizontal: 20,
        marginBottom: 10,
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
