import React from 'react';

import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';

export default function OrderView({ address, state, date }) {

  const Navigation = useNavigation();

  const formattedDate = moment(date).format('DD/MM');


  const getStatusStyle = () => {
    switch (state) {
      case 'en reparto':
        return styles.outForDelivery;
      case 'entregado':
        return styles.delivered;
      case 'cancelado':
        return styles.canceled;
      case 'programado':
        return styles.programing;
      default:
        return styles.defaultText;
    }
  };


  return (
    <View
      style={{
        alignItems: 'center',
        height: 60,
        flexDirection: 'row',
        left: 0,
        right: 0,
        bottom: 0,
        borderBottomWidth: 0.5,
        borderColor: '#E1DFE9', // Puedes cambiar el color del subrayado aquí
        marginBottom: 10,
      }}
    >
      <View
        style={{
          width: '70%',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <View >
          <Text style={[getStatusStyle(), {
            borderRadius: 13,
            borderWidth: 1.1,
            fontFamily: "Poppins_400Regular",
            fontSize: 10,
            paddingVertical: 2,
            paddingHorizontal: 5,
          }]} >
            {state}
          </Text>
        </View>


        <Text style={{
          fontFamily: "Poppins_400Regular",
          fontSize: 13,
        }}>
          {" "} - {formattedDate}
        </Text>
      </View>
      <View
        style={{
          width: '30%',
          alignItems: 'flex-end',
          justifyContent: "center"

        }}>
        <TouchableOpacity onPress={() => Navigation.navigate('unav')}>
          <MaterialIcons name="navigate-next" size={40} color="#eee" />
        </TouchableOpacity>
      </View>
    </View>

  );

};


const styles = StyleSheet.create({

  outForDelivery: {
    borderColor: 'orange',
    color: 'orange',
  },

  delivered: {

    borderColor: '#7ED882',
    color: '#7ED882',

  },
  canceled: {
    borderColor: 'red',
    color: 'red',

  },
  programing: {
    borderColor: 'gray',
    color: 'gray',

  },
  defaultText: {
    borderColor: 'black',
    color: 'black',
  },
});