//const response = await fetch(`${API_BASE_URL}/Suppliers`);
import React, { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity } from "react-native";
import { API_BASE_URL } from '@env';
import { useNavigation } from '@react-navigation/native';
import { saveDataSupplier } from "../Async/save";


export default function Suppliers() {
    const [suppliers, setSuppliers] = useState([]);
    const navigation = useNavigation(); // Para la navegación entre páginas

    // Guardar SupplierId en AsyncStorage


    useEffect(() => {
        fetchSuppliers(); // Obtener lista de proveedores al montar el componente
    }, []);

    // Función para obtener la lista de proveedores
    async function fetchSuppliers() {
        try {
            const response = await fetch(`${API_BASE_URL}/suppliers`);
            const data = await response.json();
            
            setSuppliers(data); // Guardar la lista de proveedores en el estado
        } catch (error) {
            console.error("Error fetching suppliers:", error);
        }
    }


    // Función que maneja la selección del proveedor
    const handleSupplierPress = (supplierId, suppCellphone) => {
        saveDataSupplier(supplierId, suppCellphone); // Guardar el supplierId en AsyncStorage
        navigation.navigate('ButonLog'); // Navegar a la página de productos
    };

    return (
        <FlatList
            showsVerticalScrollIndicator={false}
            style={{ marginBottom: 5 }}
            data={suppliers} // Renderizar la lista de proveedores
            keyExtractor={(supplier) => supplier.supplier_id.toString()} // Asegurar que supplier_id sea un string
            renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleSupplierPress(item.supplier_id, item.whatsapp_number)}>
                    <Text style={{ fontFamily: "Poppins_600SemiBold", fontSize: 18, color: "#76ABAE", marginVertical: 30 }}>
                        {item.name} {/* Mostrar el nombre del proveedor */}
                    </Text>
                </TouchableOpacity>
            )}
        />
    );
}
