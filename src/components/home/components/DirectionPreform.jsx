import React, { useContext } from "react";
import { View, Text } from "react-native";
import { Feather } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native-gesture-handler";
import { DataContext } from "../../Context/DataContex";
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function DetailDirecction({ name, title, detail, id, coordinates }) {
    const { setDireccion, setIdDireccion, setNameDireccion, setCoordenadas } = useContext(DataContext); // Usar contexto

    function syncDataDirecction() {
        setDireccion(title);
        setNameDireccion(name);
        setCoordenadas(coordinates);
        setIdDireccion(JSON.stringify(id));
        saveData(id);
    }

    const saveData = async (DirectionId) => {
        try {
            // Convertir el supplierId a string antes de guardarlo
            await AsyncStorage.setItem('DirectionId', JSON.stringify(DirectionId));
            console.log('Direction ID saved:', DirectionId);
        } catch (e) {
            console.log('Error saving Dirrection ID', e);
        }
    };

    return (
        <View style={{
            flexDirection: 'row',
            marginTop: 20,
            alignItems: "center",
            left: 0,
            right: 0,
            bottom: 0,
            borderBottomWidth: 0.5,
            borderColor: '#E1DFE9', // Puedes cambiar el color del subrayado aquí
            marginBottom: 10,
            paddingBottom: 20
        }}>
            <TouchableOpacity onPress={syncDataDirecction}>
                <View style={{ width: "80%" }}>
                    <Text >
                        {title}
                    </Text>
                    <Text >
                        {detail}
                    </Text>
                </View>
            </TouchableOpacity>

          
            <View style={{ width: "20%", alignItems: "flex-end", justifyContent: "center" }}>
                <TouchableOpacity>
                    <Feather name="edit-2" size={24} color="black" />
                </TouchableOpacity>
            </View>

        </View>

    );


}

