import MapView, { Marker } from 'react-native-maps';
import { View, Dimensions } from "react-native";


export default function MapOrder({ coordinates, height, borderRadius, latitudeDelta, longitudeDelta }) {


    const [latitude, longitude] = coordinates.split(',').map(coord => parseFloat(coord.trim()));

    if (isNaN(latitude) || isNaN(longitude)) {
        return <Text>Error: Coordenadas no válidas</Text>;
    }

    return (
        <View
            style={{
                height: height,
                borderRadius: borderRadius,
                overflow: 'hidden', // Añadir overflow hidden aquí para que funcione en ambas plataformas
            }}
        >
            <View
                style={{
                    flex: 1,
                    borderRadius: borderRadius,
                }}
            >
                <MapView
                    style={{
                        flex: 1,
                        borderRadius: borderRadius,
                        overflow: 'hidden', // Asegurarse de que el mapa también tenga overflow hidden
                    }}
                    initialRegion={{
                        latitude: latitude,
                        longitude: longitude,
                        latitudeDelta: latitudeDelta,
                        longitudeDelta: longitudeDelta,
                    }}

                    scrollEnabled={false} // Deshabilitar desplazamiento
                    zoomEnabled={false}   // Deshabilitar zoom
                    pitchEnabled={false}  // Deshabilitar inclinación
                    rotateEnabled={false} // Deshabilitar rotación
                >
                    <Marker
                        coordinate={{ latitude, longitude }}
                        title="Lugar de Entrega"
                        description="Tu Pedido se entregara Aqui"
                    />
                </MapView>
            </View>
        </View>
    );
};

