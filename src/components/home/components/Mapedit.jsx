import MapView, { Marker } from 'react-native-maps';
import { View, Dimensions } from "react-native";
const MapEdit = ({ latitude, longitude,deliveryLocation,latitudeDelta,longitudeDelta }) => {


    return (

        <MapView
            style={{
                flex: 1,
                borderRadius: 25,
                overflow: 'hidden', // Asegurarse de que el mapa también tenga overflow hidden
            }}
            initialRegion={{
                latitude: latitude,
                longitude: longitude,
                latitudeDelta: latitudeDelta,
                longitudeDelta: latitudeDelta * (Dimensions.get('window').width / Dimensions.get('window').height),
            }}

            scrollEnabled={false} // Deshabilitar desplazamiento
            zoomEnabled={false}   // Deshabilitar zoom
            pitchEnabled={false}  // Deshabilitar inclinación
            rotateEnabled={false} // Deshabilitar rotación
        >
            <Marker
                coordinate={deliveryLocation}
                title="Lugar de Entrega"
                description="Tu Pedido se entregara Aqui"
            />
        </MapView>

    );
};


export default MapEdit;