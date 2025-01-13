import React, { useEffect, useState, useCallback } from "react";
import { FlatList, Text, View } from "react-native";
import StateOrder from "../home/components/StatusOrder";
import { API_BASE_URL } from '@env';
import { getUserID } from "../Async/read";
import { useFocusEffect } from '@react-navigation/native';
import LottieView from 'lottie-react-native'; // Importa Lottie
import { Skeleton } from "moti/skeleton";

const OrderList = () => {
    const [orders, setOrders] = useState([]);
    const [userId, setUserId] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchUserId = async () => {
        const id = await getUserID();
        setUserId(id);
    };

    const fetchOrders = async () => {
        try {
            if (!userId) return;
            setLoading(true);
            const response = await fetch(`${API_BASE_URL}/todayOrdersByUser/${userId}`);
            const data = await response.json();
            setOrders(data);
        } catch (error) {
            console.error("Error fetching orders:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserId();
    }, []);

    useFocusEffect(
        useCallback(() => {
            if (userId) {
                fetchOrders();
                const interval = setInterval(() => {
                    fetchOrders();
                }, 20000);
                return () => clearInterval(interval);
            }
        }, [userId])
    );

    const renderItem = ({ item }) => (
        <StateOrder
            delivery_date={item.delivery_date}
            addres={item.address}
            idOrder={item.order_id.toString()} />
    );

    if (loading) {
        return (
            <ViewSkeleton />
        );
    }


    return (
        <View style={{ height: 180 }}>

            <FlatList
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                data={orders}
                renderItem={renderItem}
                keyExtractor={item => item.order_id.toString()}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={ViewNoneOrders}
            />

        </View>
    );
};


//vista de carga de skeleton
const ViewSkeleton = () => {
    return (
        <View style={{ justifyContent: 'center', alignItems: 'center', height: 180, width: '100%' }}>
            <Skeleton radius={40} width={"90%"} height={150} colorMode='light' />
        </View>
    );
};
const ViewNoneOrders = () => {
    return (
        <View style={{justifyContent: 'center', alignItems: 'center', height: 180, width: 400 }}>
            <Text>sin pedidos en curso :c</Text>
        </View>
    );
};

//vista de carga de animacion con lottie

const ViewLottie = () => {
    return (
        <View style={{ justifyContent: 'center', alignItems: 'center', height: 175, width: '100%' }}>
            <LottieView
                source={require('../lottie/Animation - 1728279511630.json')} // Asegúrate de ajustar la ruta
                autoPlay
                loop
                speed={4}
                style={{ width: 200, height: 200 }} // Ajusta el tamaño de la animación
            />
        </View>
    );
};

export default OrderList;
