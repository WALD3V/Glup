import React, { useEffect, useState } from "react";
import { FlatList, Text, View, } from "react-native";
import OrderView from "../user/comp/OrderPreform";
import { API_BASE_URL } from '@env';
import { getUserID } from "../Async/read";

export default function Orders() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {

        const userId = await getUserID();
        try {
            const response = await fetch(`${API_BASE_URL}/orderByUserId/${userId}`);
            const data = await response.json();
            const reversedData = [...data].reverse();
            setOrders(reversedData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }


    return (
        <FlatList
            ListEmptyComponent={
                <View style={{ justifyContent: 'center', alignItems: 'center', height: 180, width: '100%' }}>
                    <Text>aun no tines pedidos</Text>
                </View>
            }
            showsVerticalScrollIndicator={false}
            style={{
                marginBottom: 5,
            }}
            data={orders}
            keyExtractor={(orders) => orders.order_id}
            renderItem={({ item }) =>

                <OrderView
                    state={item.status}
                    date={item.order_date}

                />

            }
        />
    );
}
