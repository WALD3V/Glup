import Detaildirections from "../home/components/DirectionPreform";
import React, { useEffect, useState } from "react";
import { FlatList, } from "react-native";
import { API_BASE_URL } from '@env';
import { getUserID } from "../Async/read";



export default function Directions() {
    const [directions, setDirections] = useState([]);


    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {

        const userId = await getUserID(); // Esperar a obtener el userId

        if (userId !== null) {
            try {
                const response = await fetch(`${API_BASE_URL}/addressesByUser/${userId}`); // Usar el userId obtenido
                const data = await response.json();
                setDirections(data); // Guardar las direcciones en el estado

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        } else {
            console.log("No userId found");
        }
    }

    return (
        <FlatList
            showsVerticalScrollIndicator={false}
            style={{
                marginBottom: 5,
            }}
            data={directions}
            keyExtractor={(directions) => directions.address_id}
            renderItem={({ item }) =>
                <Detaildirections
                    title={item.address}
                    detail={item.block}
                    id={item.address_id}
                    name={item.name_address}
                    coordinates={item.coordinates}
                />

            }
        />
    );
}
