import React, { useContext, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated,Platform } from 'react-native';
import { DataContext } from '../components/Context/DataContex';

const OfflineNotice = () => {
    const { isConnected } = useContext(DataContext);
    const translateY = useRef(new Animated.Value(-50)).current; // Comienza fuera de la pantalla

    useEffect(() => {
        if (!isConnected) {
            // Mostrar el mensaje con animación
            Animated.timing(translateY, {
                toValue: 0, // Mueve el aviso a la posición visible
                duration: 500, // Duración de la animación
                useNativeDriver: true,
            }).start();
        } else {
            // Ocultar el mensaje con animación
            Animated.timing(translateY, {
                toValue:Platform.OS === 'android' ? -50 : -70, // Devuelve el aviso fuera de la pantalla
                duration: 500,
                useNativeDriver: true,
            }).start();
        }
    }, [isConnected]);

    return (
        <Animated.View
            style={[
                styles.container,
                { transform: [{ translateY }] }, // Aplica la animación
            ]}
        >
            <Text style={styles.text}>No tienes conexión a internet</Text>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 70,
        backgroundColor: '#ff3616',
        justifyContent: "flex-end",
        alignItems: 'center',
        paddingBottom: 10,
        zIndex: 1000,

        ...Platform.select({
            android: {
                height: 50,

              // Sombra en Android
            },
            ios: {
                height: 70,

            },
          }),


    },
    text: {
        
        color: 'white',
        fontWeight: 'bold',
    },
});

export default OfflineNotice;

