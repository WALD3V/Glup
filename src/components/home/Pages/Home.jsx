import React, { useEffect, useCallback, useRef, useContext, useState } from 'react';
import { StyleSheet, Text, View, Platform, SafeAreaView, ScrollView, Button, Animated } from 'react-native';
//import for fonts
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen'
import { Poppins_600SemiBold, Poppins_300Light, Poppins_400Regular, Poppins_500Medium } from '@expo-google-fonts/poppins'
import HeadDirrection from '../components/DetailLocation';
import CartUserItem from '../components/CartUser';
//import SearchBar from '../components/Searchbar';
import Products from '../../API/ProductList';
import { DataContext } from '../../Context/DataContex';
import { saveDataUser } from '../../Async/save';
import { ModalLocc } from '../components/Modal';
import OrderList from '../../API/OrdersStateList';
import Banners from '../../API/BannerList';
import { Skeleton } from 'moti/skeleton';

const ColorComponents = "#76ABAE";//color app

export default function Home() {

  const [isRefreshing, setIsRefreshing] = React.useState(false);

  // Función para manejar la acción de refrescar
  const onRefresh = () => {
    setIsRefreshing(true);
    // Puedes añadir lógica aquí para refrescar los datos si es necesario
    setTimeout(() => {
      setIsRefreshing(false); // Simula un refresco después de 2 segundos
    }, 2000);
  };




  const { cart } = useContext(DataContext); // Accede al carrito desde el contexto

  const totalItems = cart.reduce((total, product) => total + product.quanty, 0);


  const [visible, setVisible] = useState(false);
  const opacity = useRef(new Animated.Value(0)).current;


  const showNotification = () => {
    setVisible(true);
    Animated.timing(opacity, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        Animated.timing(opacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }).start(() => {
          setVisible(false);
        });
      }, 200); // Duración del mensaje visible
    });
  };



  const { direccion } = useContext(DataContext);

  const [fontsLoaded] = useFonts({
    Poppins_300Light,
    Poppins_600SemiBold,
    Poppins_400Regular,
    Poppins_500Medium
  });


  useEffect(() => {

    if (totalItems > 0) {
      showNotification();
    }


    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, [totalItems]);


  const onLayout = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);


  const modalRef = useRef(null);


  const handlePress = () => {
    modalRef.current?.present();
  };

  if (!fontsLoaded) return null;

  return (

    <View
      style={{
        flex: 1,
        paddingTop: Platform.OS == "android" ? 25 : 10,
        backgroundColor: "#FFFF"

      }}
      onLayout={onLayout}>



      <View style={styles.safe}>

        <SafeAreaView>

          <View style={{ flexDirection: "row", height: 70, }}>
            <View style={styles.leftItem} >
              <HeadDirrection
                fontTitle={'Poppins_600SemiBold'}
                text={direccion || "Sin seleccionar"}
                font={'Poppins_400Regular'}
                navigate={handlePress}
              />
            </View>
            <CartUserItem />

          </View>
          <Separator espace={10} />

        </SafeAreaView >

      </View>

      <View style={{ alignItems: 'center', height: 170 }}>
        <Banners />
      </View>

      <Separator espace={10} />

      <View
        style={{
          flex: 1,
        }}
      >
        <View
          style={{

          }}>

          <OrderList isRefreshing={isRefreshing} onRefresh={onRefresh} />

          <View style={{
            paddingHorizontal: 15,
          }}>


            <Text
              style={{
                marginStart: 15,
                fontFamily: 'Poppins_600SemiBold',
                fontSize: 20

              }}>
              Productos:
            </Text>
          </View>

          <Products />

        </View>




      </View>

      <ModalLocc ref={modalRef} />


      {visible && (
        <Animated.View style={[styles.notification, { opacity }]}>
          <Text style={styles.text}>¡Agregado al carrito!</Text>
        </Animated.View>
      )}



    </View >


  );
}







const Information = () => {
  return (
    <View style={styles.Information}>
      <Text style={{ textAlign: 'center' }}>
        {'baners(informacion/promos/comunicados)'}
      </Text>

    </View>


  );
};

const Separator = ({ espace }) => {
  return <View style={{ marginBottom: espace }} />;
};






const styles = StyleSheet.create({
  safe: {
    paddingHorizontal: 15,
    justifyContent: "center",
  },

  separator: {
    marginBottom: "10%"
  },

  Information: {
    marginTop: 5,
    width: 300,
    height: 125,
    marginLeft: 20,
    borderRadius: 20,
    backgroundColor: "#fff",
    alignItems: 'center',
    justifyContent: "center",
    ...Platform.select({
      android: {
        elevation: 6,
        // Sombra en Android
      },
      ios: {
        shadowColor: '#CCC',
        shadowOffset: { width: 2, height: 4 },
        shadowOpacity: 0.6,
        shadowRadius: 5,
        elevation: 10,
      },
    }),
  },

  contentContainer: {
    flex: 1,
    paddingHorizontal: 30,
  },

  leftItem: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '50%',
  },


  text: {
    color: 'white',
    fontSize: 16,
  },

  notification: {
    height: 55,
    backgroundColor: '#7ED882',
    paddingTop: 10,
    alignItems: 'center',
  },

});
