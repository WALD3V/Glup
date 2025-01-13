import React, { useState } from 'react';
import { StyleSheet, Text, View, Platform, SafeAreaView, Alert } from 'react-native';
//import for fonts
import { useFonts } from 'expo-font';
import { useEffect, useCallback, useContext } from "react";
import * as SplashScreen from 'expo-splash-screen'
import { Poppins_600SemiBold, Poppins_300Light, Poppins_400Regular } from '@expo-google-fonts/poppins'
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Octicons } from '@expo/vector-icons';
import CountdownBar from '../components/CountdownBar';
import FadeInView from '../components/FadeInView';
import CcButton from '../../ImputsButton/Cancelbutton';
import { DataContext } from '../../Context/DataContex';
import crearOrden from '../../API/OrderSend';
import LottieView from 'lottie-react-native';
import getDisplayDate from '../components/formatHour';
const ColorComponents = "#76ABAE";//color app


export default function Resume() {



    function retrasoHome() {
        setTimeout(() => {
            navigation.navigate("Home");
        }, 1000); // 2000 milisegundos = 2 segundos
    }

    const [mensaje, setMensaje] = useState('Creando tu orden...');
    const [detail, setDetail] = useState('');

    const [showComponent, setShowComponent] = useState(false);


    const navigation = useNavigation();

    const { cart, idDireccion, direccion, total, tipoPago, tiempoEntrega, indicaciones, coordenadas, setCart, isActive } = useContext(DataContext);


    const [loading, setLoading] = useState(true); // Estado para el loading

    const handleClearCart = () => {
        setCart([]); // Vaciar el carrito
    };

    const handleCrearOrden = async () => {
        setLoading(true); // Mostrar loading
        try {
            const orderId = await crearOrden({
                cart,
                idDireccion,
                direccion,
                total,
                tipoPago,
                tiempoEntrega,
                indicaciones,
                coordenadas,
                isActive,
            });

            if (orderId) {
                setMensaje("Pedido Creado");
                setShowComponent(true);
                handleClearCart(); // Limpiar carrito después de crear la orden
                retrasoHome();// Navegar a la página principal
            } else {
                Alert.alert('Error', 'No se pudo crear la orden. Inténtalo de nuevo.');
            }
        } catch (error) {
            console.error('Error al crear la orden:', error);
            Alert.alert('Error', 'Ocurrió un error al crear la orden. Inténtalo de nuevo.');
        } finally {
            setLoading(false); // Dejar de mostrar loading
        }
    };


    const [fontsLoaded] = useFonts({
        Poppins_300Light,
        Poppins_600SemiBold,
        Poppins_400Regular,
    });
    useEffect(() => {
        setDetail(formattedProducts);
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

    const handleComplete = () => {
        console.log('¡Contador terminado!');
        handleCrearOrden();
        // Aquí puedes ejecutar la función que desees cuando el contador termine
    };

    const formattedProducts = cart
        .map((item) => `${item.quanty} ${item.name}`)
        .join(', ');


    const components = [
        <OptionDirecction
            direction={direccion}
            key="1" />,
        <OptionTime
            tiempoEntrega={getDisplayDate(tiempoEntrega)}
            key="2" />,
        <OptionIndications
            detail={indicaciones || "Sin indicaciones"}
            key="3" />,
        <OptionPay
            tipoPago={tipoPago}
            key="4" />,
        <OptionProduct
            products={detail}
            key="5" />,

    ];

    return (




        <View style={styles.container} onLayout={onLayout}>
            <SafeAreaView style={{ flex: 1 }}>
                <CcButton />
                <View style={{ flex: 1, marginTop: 20, width: '100%' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', height: 100  }}>

                        <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 30, marginBottom: 10 }}>
                            {mensaje}
                        </Text>
                        <View style={{flex: 1 }}>

                        </View>

                        {showComponent && (
                            <Animationcheck />
                        )}
                    </View>


                    {loading && (
                        <CountdownBar onComplete={handleComplete} />

                    )}


                    <Separator />

                    <View>
                        {components.map((component, index) => (
                            <FadeInView key={index} delay={index * 500}>
                                {component}
                            </FadeInView>
                        ))}
                    </View>
                    <Separator />





                </View>

            </SafeAreaView>
        </View>




    );
};


const Animationcheck = () => {
    return (
        <View style={{ justifyContent: 'center', alignItems: 'center', height: 100, width: 100 }}>
            <LottieView
                source={require('../../lottie/AnimationCheck.json')} // Asegúrate de ajustar la ruta
                autoPlay
                speed={3}
                style={{ width: 100, height: 100 }} // Ajusta el tamaño de la animación
            />
        </View>
    );
};

const OptionsAdd = ({ text, icon, fontsize }) => {

    return (
        <View style={[styles.optionContainer, { height: 40, flexDirection: 'row', alignItems: 'center' }]}>
            <View style={{ width: '20%' }}>
                {icon}
            </View>
            <View style={{ width: '80%' }}>
                <Text style={[styles.Optionsall, { fontSize: fontsize }]}>
                    {text}
                </Text>
            </View>
        </View>
    );
};


const OptionDirecction = ({ direction }) => {

    return (
        <OptionsAdd
            icon={
                <Octicons name="location" size={24} color="black" />
            }
            text={direction}
        />
    );
};

const OptionPay = ({ tipoPago }) => {
    return (
        <OptionsAdd
            icon={
                <MaterialCommunityIcons name="hand-coin-outline" size={24} color="black" />
            }
            text={tipoPago}
        />
    );
};

const OptionTime = ({ tiempoEntrega }) => {
    return (
        <OptionsAdd
            icon={
                <Octicons name="clock" size={24} color="black" />
            }
            text={tiempoEntrega ? (
                <Text>{tiempoEntrega}</Text>
            ) : (
                <Text>No se ha seleccionado una hora.</Text>
            )}
        />
    );
};

const OptionIndications = ({ detail }) => {
    return (
        <OptionsAdd
            icon={
                <MaterialCommunityIcons name="pencil-outline" size={24} color="black" />
            }
            text={detail}
        />
    );
};
const OptionProduct = ({ products }) => {
    return (
        <OptionsAdd
            icon={
                <MaterialCommunityIcons name="storefront-outline" size={24} color="black" />
            }
            text={products}
            fontsize={12}

        />
    );
};





const Titleadd = ({ text }) => {

    return (
        <View >
            <Text style={{ fontFamily: "Poppins_600SemiBold", fontSize: 16, width: '75%' }}>
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

});