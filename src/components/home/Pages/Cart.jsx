import React from 'react';
import { StyleSheet, Text, View, Platform, SafeAreaView, FlatList, Alert } from 'react-native';
//import for fonts
import { useFonts } from 'expo-font';
import { useEffect, useCallback, useRef, useContext } from "react";
import * as SplashScreen from 'expo-splash-screen'
import { Poppins_600SemiBold, Poppins_300Light, Poppins_400Regular } from '@expo-google-fonts/poppins'
import HeadDirrection from '../components/DetailLocation';
import CartItem from '../components/IconCart';
import { TouchableOpacity } from 'react-native-gesture-handler';

import BkButton from '../../ImputsButton/BackButton';
import { DataContext } from '../../Context/DataContex';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

const ColorComponents = "#76ABAE";//color app


export default function Cart() {
    const navigation = useNavigation();


    const { cart, setCart, buyProducts, setTotal, direccion } = useContext(DataContext);

    //total
    const total = cart.reduce((acc, el) => acc + el.quanty * el.price, 0).toFixed(2);


    //increase
    const handleBuyPress = (product) => {
        buyProducts(product);
    };

    const handleClearCart = () => {
        setCart([]);
    };

    //decrease

    const handleBuyDecrease = (product) => {
        const productRepeat = cart.find((item) => item.product_id === product.product_id)

        productRepeat.quanty !== 1 &&
            setCart(cart.map((item) => (item.product_id === product.product_id ? { ...product, quanty: productRepeat.quanty - 1 } : item)));
    };

    //deleteForItem


    const handleDeletePress = (product) => {
        setCart(cart.filter((item) => item.product_id !== product.product_id));
    };


    const hasProducts = cart.length > 0;
    const hasDireccion = direccion !== ''; // Valida que haya una dirección seleccionada


    console.log('Cart:', cart);

    const handlePressPay = () => {
        setTotal(total);
    
        if (hasProducts && hasDireccion) {
            navigation.navigate('Pay');
        } else if (!hasProducts) {
            Alert.alert(
                'Carrito vacio :(',
                'selecciona productos'
            );
        } else if (!hasDireccion) {
            Alert.alert(
                'Dirección requerida',
                'selecciona una direccion de entrega'
            );
        }
    };


    // llamar al modal

    //deleteforItem
    const renderContent = (product) => {
        if (product.quanty === 1) {
            return (
                <TouchableOpacity onPress={() => handleDeletePress(product)}>
                    <MaterialIcons name="delete-outline" size={26} color={ColorComponents} />
                </TouchableOpacity>
            );
        } else {
            return (
                <TouchableOpacity onPress={() => handleBuyDecrease(product)}>
                    <Entypo name="minus" size={32} color="black" />
                </TouchableOpacity>
            );
        }
    };

    //clearcart



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

    // logic for modalview

    const modalRef = useRef(null);

    useEffect(() => {
        async function prepare() {
            await SplashScreen.preventAutoHideAsync();
        }
        prepare();
    }, []);


    const handlePresentModalPress = useCallback(() => {
        modalRef.current?.present();
    }, []);

    if (!fontsLoaded) return null;

    const handlePress = () => {
        handlePresentModalPress();
        //setModalVisible(true)
    };


    return (
        <View style={{ flex: 1, backgroundColor: '#FFFF', paddingHorizontal: 30, paddingTop: Platform.OS == "android" ? 30 : "5%" }} onLayout={onLayout}>
            <SafeAreaView style={styles.container}>

                <BkButton />

                <View style={{ marginTop: 20, flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                    <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 30, width: '75%' }}>
                        Tu canasta
                    </Text>
                    <View style={{ width: '25%', alignItems: 'flex-end' }}>

                        <TouchableOpacity
                            onPress={handleClearCart}
                        >
                            <Text
                                style={[{
                                    fontSize: 20,
                                    fontFamily: 'Poppins_600SemiBold',
                                    color: ColorComponents,
                                }, !hasProducts && styles.buttonDisabled1]}>
                                Vaciar

                            </Text>


                        </TouchableOpacity>

                    </View>
                </View>



                <View style={{ flex: 1, marginTop: 20 }}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        style={{
                            marginBottom: 5,
                        }}
                        data={cart}
                        keyExtractor={(product) => product.product_id}
                        renderItem={({ item }) => <CartItem
                            icon={item.uri_1}
                            name={item.name}
                            price={(item.quanty * item.price).toFixed(2)}
                            control={
                                <View style={{ width: "30%", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>

                                    {renderContent(item)}



                                    <View style={{ paddingHorizontal: 15 }}>
                                        <Text>
                                            {item.quanty}
                                        </Text>

                                    </View>

                                    <TouchableOpacity onPress={() => handleBuyPress(item)}>

                                        <MaterialIcons name="add" size={32} color="black" />

                                    </TouchableOpacity>
                                </View>
                            }
                        />}
                    />

                </View>




                <Separator />

                <View
                    style={{
                        justifyContent: 'flex-end',

                    }}
                >
                    <View
                        style={{
                            height: 100,
                            flexDirection: 'row',
                            alignItems: 'center',

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
                                Subtotal
                            </Text>

                            <Text
                                style={{
                                    fontFamily: 'Poppins_400Regular',
                                    fontSize: 28,
                                }}
                            >
                                ${total}
                            </Text>


                        </View>


                        <View
                            style={{
                                width: '40%',
                            }}>
                            <TouchableOpacity
                                onPress={handlePressPay}
                               
                            >
                                <View
                                    style={[styles.button, !hasProducts && styles.buttonDisabled]}
                                >
                                    <Text style={styles.buttonText}>
                                        Ir a pagar
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>


            </SafeAreaView>


        </View>



    );
}




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

    button: {
        backgroundColor: ColorComponents, 
        height: 45,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontFamily: 'Poppins_600SemiBold',
        fontSize: 14,
        color: '#FFFF',
    },
    buttonDisabled1: {
        color: '#A9A9A9',
    },
    buttonDisabled: {
        backgroundColor: '#A9A9A9', // Color de fondo cuando el botón está deshabilitado
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
