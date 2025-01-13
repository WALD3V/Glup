import React, { useState } from 'react';
import { StyleSheet, Text, View, Platform, SafeAreaView, Dimensions, TextInput, Linking } from 'react-native';
//import for fonts
import { useFonts } from 'expo-font';
import { useEffect, useCallback } from "react";
import * as SplashScreen from 'expo-splash-screen'
import { Poppins_600SemiBold, Poppins_300Light, Poppins_400Regular } from '@expo-google-fonts/poppins'
import TextColor from '../../ImputsButton/TextColor';
import { LineStatus } from '../components/StatusOrder';
import MapView, { Marker } from 'react-native-maps';
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import BkButton from '../../ImputsButton/BackButton';
import { useNavigation } from '@react-navigation/native';
import { getOrderData } from '../../API/OrderDetail';
import getDisplayDate from '../components/formatHour';
import { Skeleton } from 'moti/skeleton';
import { MotiView } from 'moti';

const ColorComponents = "#76ABAE";//color app


export default function DetailOrderState({ route }) {


    const { orderid } = route.params; // idOrder será un valor simple (string o número)

    const [isLoading, setIsLoading] = useState(true);

    const [orderData, setOrderData] = useState({
        order_date: '',
        delivery_date: '',
        status: '',
        adress: '',
        coordinates: '',
        indications: '',
        products: '',
        
    });

    const loadOrderData = async () => {
        try {
            const data = await getOrderData(orderid);

            const formattedDetails = data.details
            .map(item => `${item.quantity} ${item.name_product}`)
            .join(', ');




            setOrderData({
                order_date: data.order_date,
                delivery_date: data.delivery_date,
                status: data.status,
                adress: data.address,
                coordinates: data.coordinates,
                indications: data.indications,
                products: formattedDetails,
            });


           

            setIsLoading(false);


        } catch (error) {
            Alert.alert('Error', 'No cargaron datos guardados');
        }
    };

    const navigation = useNavigation();




    const orderNumber = "12345"; // Obtén este número dinámicamente según tu lógica


    const [fontsLoaded] = useFonts({
        Poppins_300Light,
        Poppins_600SemiBold,
        Poppins_400Regular,
    });
    useEffect(() => {
        loadOrderData();
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

        <View style={{
            flex: 1,
            backgroundColor: '#FFFF',
            paddingHorizontal: 30,
            paddingTop: Platform.OS == "android" ? 30 : "5%",
            paddingBottom: Platform.OS == "android" ? 15 : "5%"
        }} onLayout={onLayout}>
            <SafeAreaView style={styles.container}>

                <BkButton />

                {isLoading ? (
                    //<Text>cargando...</Text>
                    <Myskleton />
                ) : (

                    <View style={{ flex: 1 }}>




                        <View style={{ marginTop: 20, flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                            <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 30, width: '75%' }}>
                                Mi Pedido
                            </Text>
                            <View style={{ width: '25%', alignItems: 'flex-end' }}>
                                <WhatsAppButton orderNumber={orderNumber} />
                                {/* {orderNumber && <WhatsAppButton orderNumber={orderNumber} />} para cuando sea dinamico*/}

                            </View>
                        </View>

                        <View>
                            <Text style={{
                                flex: 1,
                                fontSize: 16,
                                fontFamily: 'Poppins_600SemiBold',
                            }}>
                                Se Entrega en:

                            </Text>
                            <Text style={{
                                fontSize: 14,
                                fontFamily: 'Poppins_400Regular',
                            }}>

                                {orderData.adress}

                            </Text>
                        </View>

                        <Separator />

                        <LineStatus />
                        <View style={{ height: 160 }}>
                            <MapOrder coordinates={orderData.coordinates} />
                        </View>

                        <Separator />

                        <OptionDetail
                            textOption={"Entrega estimada"}
                            value={getDisplayDate(orderData.delivery_date)}
                        />

                        <Separator />
                        <OptionDetail
                            textOption={"Indicaciones"}
                            value={orderData.indications}
                        />
                        <Separator />
                        <OptionDetail
                            textOption={"Productos"}
                            value={orderData.products}
                        />


                        <Separator />



                        <Separator />


                        <View
                            style={{
                                flex: 1,
                                justifyContent: 'flex-end',

                            }}
                        >
                            <View
                                style={{
                                    height: 50,
                                    flexDirection: 'row',

                                }}
                            >
                                <View style={{
                                    width: '60%',
                                    justifyContent: "center",

                                }} >
                                    <Text
                                        style={{
                                            fontFamily: 'Poppins_600SemiBold',
                                            fontSize: 14,
                                        }}
                                    >
                                        Glup Amigo
                                    </Text>

                                    <Text
                                        style={{
                                            fontFamily: 'Poppins_600SemiBold',
                                            fontSize: 12,
                                        }}
                                    >
                                        Tu repartidor
                                    </Text>


                                </View>


                                <View
                                    style={{
                                        width: '40%',
                                    }}>
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate('chat')}
                                    >
                                        <View
                                            style={{
                                                flexDirection: 'row',
                                                backgroundColor: ColorComponents,
                                                height: 45,
                                                borderRadius: 30,
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    fontFamily: 'Poppins_600SemiBold',
                                                    fontSize: 16,
                                                    color: '#FFFF',
                                                    marginEnd: 10,
                                                }}
                                            >
                                                Chatea
                                            </Text>
                                            <AntDesign name="message1" size={24} color={'#FFFF'} />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                    </View>
                )}



            </SafeAreaView>
        </View>





    );
};


const OptionDetail = ({ textOption, value }) => {
    return (
        <View style={styles.optionDetail}>
            <View style={{ marginHorizontal: 15, width: "100%" }}>
                <Text style={{ fontSize: 16, fontFamily: "Poppins_600SemiBold" }}>
                    {textOption}
                </Text>
                <Text style={{ fontSize: 14, fontFamily: "Poppins_400Regular" }}>
                    {value}
                </Text>
            </View>

        </View>
    );
};

const Spacer = ({ height = 20 }) => <MotiView style={{ height }} />

function Myskleton() {
    return (
        <View style={{ flex: 1 }}>

            <Spacer height={30} />
            <Skeleton width={"100%"} height={80} colorMode='light' />
            <Spacer />
            <Skeleton radius={'round'} width={"100%"} height={30} colorMode='light' />
            <Spacer height={10} />
            <Skeleton width={"100%"} height={150} colorMode='light' />
            <Spacer height={50} />
            <Skeleton width={"100%"} height={70} colorMode='light' />
            <Spacer height={15} />
            <Skeleton width={"100%"} height={70} colorMode='light' />
            <Spacer height={150} />
            <Skeleton width={"100%"} height={50} colorMode='light' />

        </View>
    )
}


const WhatsAppButton = ({ orderNumber }) => {
    return (
        <TextColor
            fontSize={20}
            font={"Poppins_600SemiBold"}
            text={'Ayuda'}
            onPress={() => openWhatsApp(orderNumber)}
        />
    );
};


const openWhatsApp = (orderNumber) => {
    console.log("Número de pedido:", orderNumber);
    const phoneNumber = "593997142159"; // Reemplaza con el número de teléfono al que deseas enviar el mensaje
    const message = `Hola, necesito ayuda con el pedido. ${orderNumber}`; // El mensaje predefinido
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    Linking.openURL(url).catch(err => console.error("Error al abrir WhatsApp:", err));
};


const Separator = () => {
    return <View style={styles.separator} />;
};
const MapOrder = ({ coordinates }) => {


    const [latitude, longitude] = coordinates.split(',').map(coord => parseFloat(coord.trim()));

    if (isNaN(latitude) || isNaN(longitude)) {
        return <Text>Error: Coordenadas no válidas</Text>;
    }

    return (
        <View
            style={{
                height: 150,
                borderRadius: 25,
                overflow: 'hidden', // Añadir overflow hidden aquí para que funcione en ambas plataformas
            }}
        >
            <View
                style={{
                    flex: 1,
                    borderRadius: 25,
                }}
            >
                <MapView
                    style={{
                        flex: 1,
                        borderRadius: 25,
                        overflow: 'hidden', // Asegurarse de que el mapa también tenga overflow hidden
                    }}
                    initialRegion={{
                        latitude: latitude,
                        longitude: longitude,
                        latitudeDelta: 0.003,
                        longitudeDelta: 0.003 * (Dimensions.get('window').width / Dimensions.get('window').height),
                    }}

                    scrollEnabled={false} // Deshabilitar desplazamiento
                    zoomEnabled={false}   // Deshabilitar zoom
                    pitchEnabled={false}  // Deshabilitar inclinación
                    rotateEnabled={false} // Deshabilitar rotación
                >
                    <Marker
                        coordinate={{ latitude, longitude }}
                        title="Lugar de Entrega"
                        description="Tu Pedido se entregara Aqui"
                    />
                </MapView>
            </View>
        </View>
    );
};



const styles = StyleSheet.create({


    optionDetail: {
        left: 0,
        right: 0,
        bottom: 0,
        borderBottomWidth: 0.5,
        borderColor: '#E1DFE9',
        paddingBottom: 10,
        flexDirection: "row",
        alignItems: "center"
    },
    container: {
        flex: 1,
        backgroundColor: '#FFFF',
    },

    separator: {
        marginBottom: "10%"
    },

    Product: {
        flex: 0.3,
        width: '50%',
        borderRadius: 20,
        backgroundColor: '#fff',
        padding: '5%',
    },

    Line: {
        flex: 1,
        height: '20%',
        backgroundColor: '#7ED882',
        borderRadius: 10,

    },

    SearchBar: {
        height: 40,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "#ccc",
        borderRadius: 40,
        paddingHorizontal: 15,
    },
    StateOrder: {
        height: '20%',
        borderRadius: 20,
        backgroundColor: "#fff",
        padding: "5%"
    },

    Information: {
        height: '15%',
        borderRadius: 20,
        borderBlockColor: 'black',
        backgroundColor: "#fff",
        padding: "5%",
        justifyContent: 'center',
        alignItems: 'center',
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
