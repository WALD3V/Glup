
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { ScrollView, Text, StyleSheet, View, Platform, Linking } from "react-native";
//iconos
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
//imports for fonts
import { useFonts } from 'expo-font';
import { useEffect, useCallback } from "react";
import * as SplashScreen from 'expo-splash-screen'
import { Poppins_600SemiBold, Poppins_300Light, Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins'
import TextColor from "../ImputsButton/TextColor";
import { TouchableOpacity } from "react-native-gesture-handler";
import BkButton from '../ImputsButton/BackButton';
import { SafeAreaView } from 'react-native-safe-area-context';
const ColorComponents = '#76ABAE';//color app
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUserName } from '../Async/read';





export default function UserConf() {

    const Navigation = useNavigation();
    const userName = "";




    const [fontsLoaded] = useFonts({
        Poppins_300Light,
        Poppins_600SemiBold,
        Poppins_400Regular,
        Poppins_700Bold,
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
        <SafeAreaView
            style={{ flex: 1, backgroundColor: '#FFFF' }}
        >
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


                <ScrollView
                    showsVerticalScrollIndicator={false}
                >
                    <View style={{ flex: 0.1, flexDirection: "row", }}>
                        <View style={{ width: '75%', alignItems: 'flex-start', justifyContent: 'center' }}>
                            <Text style={styles.TextUser}>
                                Hola, 
                            </Text>
                        </View>
                        <View style={{ width: '25%', alignItems: 'flex-end', justifyContent: 'center', }}>
                        </View>
                    </View>
                    <Separator espace={20} />
                    <View style={{ height: 100, flexDirection: 'row', borderRadius: 30, backgroundColor: ColorComponents, alignItems: 'center' }}>
                        <OptionAccount />
                        <OptionHistorialSents />
                        <OptionHelp
                            onPress={() => openWhatsApp("Hola, necesito ayuda con la app.")}

                        />

                    </View>
                    <Separator espace={'10%'} />
                    <View style={{ paddingHorizontal: 10 }}>
                        <TitleOptionsAdd text="Cupones & Creditos" />
                        <Separator espace={'5%'} />
                        <OptionsAdd
                            icon={<Entypo name="credit" size={24} color="black" />}
                            text="Creditos"
                            navigate={'unav'}
                        />
                        <OptionsAdd
                            icon={<MaterialCommunityIcons name="ticket-percent-outline" size={24} color="black" />}
                            text="Cupones"
                            navigate={'unav'}

                        />

                        <TitleOptionsAdd text="Servicios" />
                        <Separator espace={'5%'} />
                        <OptionsAdd
                            icon={<MaterialCommunityIcons name="clipboard-check-outline" size={24} color="black" />}
                            text="Servicio 1"
                            navigate={'unav'}

                        />
                        <OptionsAdd
                            icon={<MaterialIcons name="cleaning-services" size={24} color="black" />}
                            text="servicio 2"
                            navigate={'unav'}

                        />
                        <TitleOptionsAdd text="Mi cuenta" />
                        <Separator espace={'5%'} />
                        <OptionsAdd
                            icon={<Octicons name="location" size={24} color="black" />}
                            text="Direcciones"
                            navigate={"Looc"}
                        />
                        <OptionsAdd
                            icon={<Feather name="database" size={24} color="black" />}
                            text="Datos de Facturacion"
                            navigate={'DataFac'}

                        />
                        <TitleOptionsAdd text="Mas información" />
                        <Separator espace={'5%'} />
                        <OptionsAdd
                            icon={<Ionicons name="information-circle-outline" size={24} color="black" />}
                            text="Terminos Y condiciones de Uso"
                            navigate={'unav'}

                        />
                        <OptionsAdd
                            icon={<Ionicons name="information-circle-outline" size={24} color="black" />}
                            text="Politicas y privacidad"
                            navigate={'unav'}

                        />
                    </View>

                    <Separator espace={'5%'} />
                    <TextColor text="Cerrar sesion" onPress={() => Navigation.navigate("Login")} />
                    <Separator espace={'20%'} />


                </ScrollView>



            </View >
        </SafeAreaView>



    );

}

const getData = async () => {
    try {
        const storedsuppCellphone = await AsyncStorage.getItem('SuppCellphone');
        if (storedsuppCellphone !== null) {
            // El valor se guarda y recupera correctamente como string
            console.log('Valor recuperado:', storedsuppCellphone);
            return JSON.parse(storedsuppCellphone); // Convierte de nuevo a número si es necesario
        }
    } catch (e) {
        console.error('Error retrieving data', e);
    }
};

async function openWhatsApp(text) {
    const suppCellphone = await getData();
    console.log(suppCellphone);
    const message = text; // El mensaje predefinido
    const url = `https://wa.me/${suppCellphone}?text=${encodeURIComponent(message)}`;

    Linking.openURL(url).catch(err => console.error("Error al abrir WhatsApp:", err));
};







const OptionsAdd = ({ text, icon, navigate }) => {
    const Navigation = useNavigation();

    return (
        <TouchableOpacity onPress={() => Navigation.navigate(navigate)}>
            <View style={[styles.OptionContainer, { height: 40, flexDirection: 'row', alignItems: 'center' }]}>
                <View style={{ width: '10%', paddingEnd: '2%' }}>
                    {icon}
                </View>
                <Text style={styles.Optionsall}>
                    {text}
                </Text>
            </View>
        </TouchableOpacity>
    );
};


const TitleOptionsAdd = ({ text }) => {
    return (
        <Text style={styles.OptionallText}>
            {text}
        </Text>
    );
};


const OptionsPreform = ({ icon, text, onPress }) => {
    return (
        <View style={styles.ToolsAdd}>
            <TouchableOpacity onPress={onPress}>
                {icon}
                {text}
            </TouchableOpacity >
        </View>
    );
};


const OptionAccount = () => {
    const Navigation = useNavigation();

    return (
        <OptionsPreform
            icon={<FontAwesome name="user-o" size={24} color="white" style={{ textAlign: 'center' }} />}
            text={<Text style={styles.OptionText}>Perfil</Text>}
            onPress={() => Navigation.navigate('DataUser')

            }

        />
    );
};
const OptionHelp = ({ onPress, text }) => {
    return (
        <OptionsPreform
            icon={<FontAwesome name="whatsapp" size={24} color="white" style={{ textAlign: 'center' }} />}
            text={<Text style={styles.OptionText}>Ayuda</Text>}
            onPress={onPress}
        />
    );
};
const OptionHistorialSents = () => {
    const Navigation = useNavigation();

    return (
        <OptionsPreform
            icon={<Entypo name="list" size={24} color="white" style={{ textAlign: 'center' }} />}
            text={<Text style={styles.OptionText}>Pedidos</Text>}
            onPress={() => Navigation.navigate('OrderList')
            }

        />

    );
};
const OptionFacturation = () => {
    return (
        <OptionsPreform
            icon={<Ionicons name="receipt-outline" size={24} color="white" style={{ textAlign: 'center' }} />}
            text={<Text style={styles.OptionText}>Facturación</Text>}
            navigate={'unav'}

        />
    );
};

const Separator = ({ espace }) => {
    return <View style={{ marginBottom: espace }} />;
};

const styles = StyleSheet.create({

    separator: {
        marginBottom: "10%"
    },

    container: {
        flex: 1,
        backgroundColor: '#FFFF',
    },

    TextUser: {
        fontSize: 34,
        fontFamily: 'Poppins_600SemiBold',

    },

    OptionText: {
        paddingTop: 10,
        textAlign: 'center',
        fontFamily: 'Poppins_600SemiBold',
        color: 'white',
    },

    ToolsAdd: {
        flex: 1,
        flexDirection: 'column',
        paddingHorizontal: 2,

    },
    Optionsall: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 14,

    },
    OptionallText: {
        fontFamily: 'Poppins_600SemiBold',
        alignItems: 'flex-start',
        justifyContent: 'center',
        fontSize: 20,

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