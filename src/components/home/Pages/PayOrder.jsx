import React, { useContext, useRef, useState } from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, Keyboard, Platform, SafeAreaView, Dimensions, Image, TextInput, KeyboardAvoidingView } from 'react-native';
//import for fonts

import { useFonts } from 'expo-font';
import { useEffect, useCallback } from "react";
import * as SplashScreen from 'expo-splash-screen'
import { Poppins_600SemiBold, Poppins_300Light, Poppins_400Regular } from '@expo-google-fonts/poppins'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import BkButton from '../../ImputsButton/BackButton';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import ImagePickerExample from '../components/ImageSend';
import TimePickerComponent from '../components/TimePickerComponent ';
import { DataContext } from '../../Context/DataContex';
import ToggleActive from '../components/ToggleActive';
import TextInputModal from '../components/ModalIndications';
import { ModalLocc } from '../components/Modal';
const ColorComponents = "#76ABAE";//color app


export default function Pay() {



    //modal para las direcciones
    const modalRef = useRef(null);


    const handlePress = () => {
        modalRef.current?.present();
    };


    const { nameDireccion, direccion, total, setTipoPago, setIndicaciones } = useContext(DataContext);


    const onTimeSelected = (selectedTime) => {
        console.log('Hora seleccionada:', selectedTime);
    };

    const navigation = useNavigation();

    const [selectedOption, setSelectedOption] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const options = ['efectivo', 'transferencia',];

    const handlePaymentOptionPress = (option) => {
        setSelectedOption(option);
        setTipoPago(option); // Actualiza el contexto con el método de pago seleccionado
        if (option !== 'transferencia') {
            setSelectedImage(null); // Limpiar la imagen si la opción seleccionada no es 'transferencia'
        }
    };

    const isButtonDisabled = () => {
        return !(selectedOption === 'efectivo' || (selectedOption === 'transferencia' && selectedImage));
    };



    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleOpenModal = () => {
        setIsModalVisible(true);
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
    };

    const handleTextSubmit = (text) => {

        setIndicaciones(text);
        // Aquí puedes manejar el texto ingresado, como guardarlo en el estado o enviarlo a un backend
    };


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

        <View style={styles.container} onLayout={onLayout}>


            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>

                    <BkButton />

                    <View style={{ flex: 1, marginTop: 20, width: '100%' }}>
                        <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 30, width: '100%' }}>
                            Tu pedido
                        </Text>

                        <OptionsLocation
                            direccion={
                                direccion.length > 20 ? direccion.substring(0, 20) + "..." : direccion
                            }
                            handlePress={handlePress}
                        />

                        <TimePickerComponent onTimeSelected={onTimeSelected} />

                        <OptionsIndications
                            handleOpenModal={handleOpenModal}

                        />


                        <View style={{
                            width: "100%",
                            marginTop: 20,
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>
                            <View style={{ width: "75%" }}>
                                <Titleadd text={"Deseo factura"} />

                            </View>
                            <View style={{
                                width: "25%",
                                alignItems: 'flex-end'
                            }}>
                                <ToggleActive />
                            </View>
                        </View>

                        <View style={styles.fullTextContainer}>
                            <Titleadd text={"Metodo de pago"} />
                        </View>



                        <View style={{ marginVertical: 10 }}>
                            <View style={{ justifyContent: 'center', flexDirection: 'row', marginVertical: 10 }}>
                                {options.map(option => (
                                    <TouchableOpacity
                                        key={option}
                                        style={[styles.paymentButton, selectedOption === option && styles.selectedPaymentButton]}
                                        onPress={() => handlePaymentOptionPress(option)}
                                    >
                                        <Text style={styles.paymentButtonText}>{option}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>

                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            {selectedOption === 'transferencia' && (

                                <View>


                                    {selectedImage && (
                                        <View style={{ alignItems: 'center', marginTop: 20, }}>
                                            <Image source={{ uri: selectedImage.uri }} style={styles.selectedImage} />
                                        </View>
                                    )}


                                    <ImagePickerExample onImageSelected={setSelectedImage} />
                                    <TouchableOpacity style={{ marginTop: 20 }}>
                                        <Text style={{ color: ColorComponents, textAlign: 'center', textDecorationLine: 'underline', fontFamily: 'Poppins_400Regular', fontSize: 12 }}>
                                            ¿No dispongo de  las cuentas bancarias?
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            )}




                            {selectedOption === 'efectivo' && (

                                <Text style={{ color: ColorComponents, textAlign: 'center', fontFamily: 'Poppins_400Regular', fontSize: 13 }}>
                                    ⓘ Recuerda disponer del efectivo al momento de la entrega </Text>
                            )}


                        </View>

                    </View>




                    <View style={styles.footer}>
                        <View style={styles.footerTextContainer}>
                            <Text style={styles.footerText}>Total a pagar</Text>
                            <Text style={styles.footerAmount}>$ {total} </Text>
                        </View>
                        <View style={{ width: '40%' }}>
                            <TouchableOpacity
                                onPress={() => navigation.navigate("Resume")}
                                disabled={isButtonDisabled()}
                            >
                                <View style={isButtonDisabled() ? styles.buttonDisabled : styles.button}>
                                    <Text style={styles.buttonText}>Hacer Pedido</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>


                </View>
            </SafeAreaView>
            <TextInputModal
                visible={isModalVisible}
                onClose={handleCloseModal}
                onSubmit={handleTextSubmit}
            />
            <ModalLocc ref={modalRef} />
        </View>




    );
};



const OptionsLocation = ({ direccion, handlePress }) => {

    return (
        <View style={styles.optionContainer}>

            <View style={{
                width: "15%",
                alignItems: 'flex-start'
            }}>
                <Octicons name="location" size={24} color="black" />
            </View>
            <View style={{ width: "60%" }}>
                <Text>{direccion}</Text>
            </View>
            <TouchableOpacity
                onPress={handlePress} >
                <Text style={styles.changeText}>Cambiar</Text>
            </TouchableOpacity>
        </View>
    );
};
const OptionsIndications = ({ handleOpenModal }) => {

    return (
        <TouchableOpacity onPress={handleOpenModal}>

            <View style={styles.optionContainer}>
                <View style={{ width: "75%" }}>
                    <Titleadd text={"Indicaciones"} />
                </View>
                <View style={styles.navigationText}>
                    <MaterialIcons name="navigate-next" size={35} color="#ccc" />
                </View>
            </View>
        </TouchableOpacity>
    );
};


const Titleadd = ({ text }) => {

    return (
        <View >
            <Text style={{ fontFamily: "Poppins_600SemiBold", fontSize: 16 }}>
                {text}
            </Text>
        </View>
    );
};


const Separator = () => {
    return <View style={styles.separator} />;
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFF',
        paddingHorizontal: 30,
        paddingTop: Platform.OS === "android" ? 30 : "5%"
    },
    separator: {
        marginBottom: "10%"
    },


    Optionsall: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 14,


    },
    optionContainer: {
        width: "100%",
        marginTop: 20,
        left: 0,
        right: 0,
        bottom: 0,
        borderBottomWidth: 0.5,
        borderColor: '#E1DFE9',
        paddingBottom: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    iconContainer: {
        width: "15%",
        alignItems: 'center',
        justifyContent: 'center',
    },
    textContainer: {
        width: "50%",
    },

    selectedImage: {
        width: 100,
        height: 100,
        resizeMode: 'cover',
        borderRadius: 10,
    },
    changeText: {
        fontSize: 14,
        color: ColorComponents,
        fontFamily: "Poppins_600SemiBold"
    },
    navigationText: {
        width: "25%",
        alignItems: 'flex-end'
    },
    fullTextContainer: {
        width: "100%",
        marginTop: 20
    },
    buttonDisabled: {
        backgroundColor: '#ccc',
        height: 45,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },

    button: {
        backgroundColor: ColorComponents,
        height: 45,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        fontFamily: 'Poppins_600SemiBold',
        fontSize: 14,
        color: '#FFFF',
    },
    paymentButton: {
        backgroundColor: '#ccc',
        padding: 10,
        margin: 5,
        borderRadius: 50
    },
    selectedPaymentButton: {
        backgroundColor: ColorComponents,
    },
    paymentButtonText: {
        color: 'white',
        fontFamily: "Poppins_600SemiBold"
    },
    footer: {
        height: 100,
        flexDirection: 'row',
        alignItems: 'center',
    },
    footerTextContainer: {
        width: '60%',
        justifyContent: "center"
    },
    footerText: {
        fontFamily: 'Poppins_600SemiBold',
        fontSize: 14,
    },
    footerAmount: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 28,
    },
    OptionContainer: {
        left: 0,
        right: 0,
        bottom: 0,
        borderBottomWidth: 0.5,
        borderColor: '#E1DFE9', // Puedes cambiar el color del subrayado aquí
        marginBottom: 10,

    },



});