import * as React from 'react';
import { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, Text, Image, Platform } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Entypo from '@expo/vector-icons/Entypo';
import { MaterialIcons } from '@expo/vector-icons';
import BkButton from '../ImputsButton/BackButton';
import { useNavigation } from '@react-navigation/native';


const ColorComponents = "#76ABAE"; // color app
const Marker_f = require('../../icons/MTra.png');
const Icon1 = require('../../icons/Icon1.png');
const Icon2 = require('../../icons/Icon2.png');


export default function MapScreen({ route }) {
  const navigation = useNavigation();

  const [image, setImage] = useState(Icon1);
  const { latitude, longitude, Userlatitude, Userlongitude } = route.params || {};

  const [region, setRegion] = useState(null); // Estado inicial del mapa
  const [isReady, setIsReady] = useState(false); // Controla la preparación del componente

  const mapRef = React.useRef(null);


  useEffect(() => {
    if (latitude && longitude) {
      // Solo procede si las coordenadas están disponibles
      setRegion({
        latitude,
        longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005 * (Dimensions.get('window').width / Dimensions.get('window').height),
      });
      setIsReady(true); // Marca que el componente está listo
    } else {
      console.warn("Coordenadas no recibidas correctamente.");
    }
  }, [latitude, longitude]);

  if (!isReady) {
    // Muestra un estado de carga si los datos no están listos
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>
          Cargando mapa, por favor espera...
        </Text>
      </View>
    );
  }

  const handleRegionChangeComplete = (region) => {
    setRegion(region);
    setImage(Icon1);
  };

  const handleCenterMap = () => {
    mapRef.current.animateToRegion({
      ...region,
      latitude: Userlatitude,
      longitude: Userlongitude,
    }, 300); // 1000 ms de animación
  };

  return (


    <View style={{ flex: 1, backgroundColor: '#FFFF', paddingBottom: 30 }}>




      <View style={[{ flex: 1, width: '100%' }]}>
        <MapView
          ref={mapRef}
          style={styles.map}
          region={region} // Usa `region` en lugar de `initialRegion`
          onRegionChange={() => setImage(Icon2)} // Cambia la imagen mientras el mapa se mueve
          onRegionChangeComplete={handleRegionChangeComplete}
          showsUserLocation={false}
          showsMyLocationButton={false}
        >
          <Marker
            image={Marker_f}
            coordinate={{
              latitude: region.latitude,
              longitude: region.longitude,
            }}
          />
        </MapView>

        <View style={styles.backButton}>
          <BkButton />
        </View>

        <View style={styles.ButtonFind}>
          <TouchableOpacity style={{ height: 70, width: 70, alignItems: 'center', justifyContent: 'center' }} onPress={handleCenterMap}>
            <MaterialIcons name="location-searching" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <View style={styles.CursorLoc}>
          <Image source={image} style={{ height: 65, width: 65 }} resizeMode="contain" />
        </View>

        <View style={styles.viewRadius}></View>
      </View>

      <View style={styles.viewDetail}>
        <View style={{ paddingHorizontal: 20 }}>
          <Text
            style={{
              fontFamily: "Poppins_600SemiBold",
              fontSize: 18,
              textAlign: "center",
            }}
          >
            Ubica correctamente el marcador
          </Text>
        </View>

        <View style={{ flex: 1, paddingVertical: 20, paddingHorizontal: 30 }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('LocAdd', {
              latitude: region.latitude,
              longitude: region.longitude,
            })}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                height: 50,
                width: "100%",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 22,
                  fontFamily: 'Poppins_600SemiBold',
                  color: ColorComponents,
                }}
              >
                Confirmar
              </Text>

              <Entypo name="chevron-right" size={25} color={ColorComponents} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  viewRadius: {
    height: 31,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  viewDetail: {
    height: 100,
    backgroundColor: "white",
  },
  CursorLoc: {
    position: 'absolute',
    bottom: '50%',
    left: '50%',
    ...Platform.select({
      android: {
        transform: [{ translateX: -33 }, { translateY: 0 }],
      },
      ios: {
        transform: [{ translateX: -33 }, { translateY: 40 }],
      },
    }),
  },
  ButtonFind: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    position: 'absolute',
    bottom: 80,
    right: 20,
    backgroundColor: '#FFFF',
    borderRadius: 50,
  },
  backButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    position: 'absolute',
    top: 50,
    left: 20,

  },
  map: {
    flex: 1,
    position: 'relative',
  },
});
