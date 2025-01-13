import React, { useContext, useEffect, useState, useRef } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { StyleSheet, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DataContext } from '../../Context/DataContex';
import { Animated } from 'react-native';

export default function CartUserItem() {
    const navigation = useNavigation();

    const { cart } = useContext(DataContext); // Accede al carrito desde el contexto

    const totalItems = cart.length;

    const [visible, setVisible] = useState(false);
    const opacity = useRef(new Animated.Value(0)).current;

    // Contar la cantidad total de productos en el carrito



   


    return (
        <View style={styles.cart}>
            <View style={styles.cartItem}>
                <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
                    <View style={styles.iconContainer}>
                        <Ionicons name="cart-outline" size={32} color="black" />
                        {totalItems > 0 && (
                            <View style={styles.badge}>
                                <Text style={styles.badgeText}>{totalItems}</Text>
                            </View>
                        )}
                    </View>
                </TouchableOpacity>


                <View style={{ paddingHorizontal: 20 }} />

                <TouchableOpacity onPress={() => navigation.navigate('User')}>
                    <FontAwesome name="user-o" size={28} color="black" style={{ paddingEnd: 20 }} />
                </TouchableOpacity>
            </View>

            
        </View>
    );
}

const styles = StyleSheet.create({
    cart: {
        paddingTop: 10,
        alignItems: 'flex-end',
        width: '50%',

    },
    cartItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: '50%',
    },
    iconContainer: {
        position: 'relative',
    },
    badge: {
        position: 'absolute',
        top: -5,
        right: -5,
        backgroundColor: 'red',
        borderRadius: 10,
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    badgeText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    },
    
});
