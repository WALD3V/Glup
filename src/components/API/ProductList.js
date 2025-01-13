import React, { useEffect, useState, useContext } from "react";
import { DataContext } from "../Context/DataContex";
import { FlatList, Text } from "react-native";
import FrameProduct from "../home/components/ProductCont";
import { TouchableOpacity } from "react-native-gesture-handler";
import { API_BASE_URL } from '@env';
import { getSupplierId } from "../Async/read";

export default function Products() {
    const { buyProducts } = useContext(DataContext);

    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);


   
    async function fetchData() {

        const supplierId = await getSupplierId(); // Esperar a obtener el supplier

        try {
           
            const response = await fetch(`${API_BASE_URL}/ProductsBySupplier/${supplierId}`);
            const data = await response.json();
            setProducts(data);
            console.log("fetchpetition",API_BASE_URL, supplierId)
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }


    const handleBuyPress = (product) => {
        buyProducts(product);
    };

    return (
        <FlatList
            showsHorizontalScrollIndicator={false}
            style={{
                marginBottom: 5,
            }}
            horizontal={true}
            data={products}
            keyExtractor={(product) => product.product_id}
            renderItem={({ item }) => <FrameProduct
                nameProduct={item.name} //nombre del producto
                uri={item.uri_1} //link de la url de la imagen del producto
                price={item.price}
                add={
                    <TouchableOpacity onPress={() => handleBuyPress(item)}>
                        <Text style={{ fontFamily: "Poppins_600SemiBold", fontSize: 18, color: "#76ABAE", marginVertical: 10, }}>
                            Añadir
                        </Text>
                    </TouchableOpacity>
                }

            />}
        />
    );
}
