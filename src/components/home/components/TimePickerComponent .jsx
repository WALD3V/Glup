import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, useColorScheme, Alert } from 'react-native';
import { Octicons } from '@expo/vector-icons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { DataContext } from '../../Context/DataContex';

// Definir las horas mínimas y máximas permitidas como constantes
const MIN_HOUR = 6; // Hora mínima permitida
const MAX_HOUR = 24; // Hora máxima permitida

const TimePickerComponent = ({ onTimeSelected }) => {
  const [pickerVisible, setPickerVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(getDefaultDate()); // Fecha y hora por defecto
  const colorScheme = useColorScheme(); // Obtener esquema de color actual (light/dark)
  const { setTiempoEntrega } = useContext(DataContext); // Usar contexto

  // Al montar el componente, se actualiza automáticamente el contexto con la hora válida
  useEffect(() => {
    setTiempoEntrega(selectedDate);
  }, [selectedDate]);

  // Obtener la fecha y hora por defecto con las restricciones aplicadas
  function getDefaultDate() {
    const now = new Date();
    const currentHour = now.getHours();

    if (currentHour < MIN_HOUR) {
      now.setHours(MIN_HOUR, 0, 0, 0); // Configurar la hora mínima
    } else if (currentHour >= MAX_HOUR) {
      // Si la hora actual es mayor o igual a la hora máxima, configura la fecha para el próximo día
      now.setDate(now.getDate() + 1);
      now.setHours(MIN_HOUR, 0, 0, 0);
    } else {
      now.setHours(currentHour, 0, 0, 0);
    }

    return now;
  }

  // Obtener la fecha mínima permitida para el DateTimePicker
  function getMinimumDate() {
    const now = new Date();
    const currentHour = now.getHours();

    if (currentHour < MIN_HOUR) {
      now.setHours(MIN_HOUR, 0, 0, 0);
    } else if (currentHour >= MAX_HOUR) {
      now.setDate(now.getDate() + 1);
      now.setHours(MIN_HOUR, 0, 0, 0);
    } else {
      const nextInterval = Math.ceil(currentHour / 2) * 2;
      if (nextInterval >= MAX_HOUR) {
        now.setDate(now.getDate() + 1);
        now.setHours(MIN_HOUR, 0, 0, 0);
      } else {
        now.setHours(nextInterval, 0, 0, 0);
      }
    }

    return now;
  }

  // Obtener la fecha máxima permitida para el DateTimePicker
  function getMaximumDate() {
    const oneWeekLater = new Date();
    oneWeekLater.setDate(oneWeekLater.getDate() + 7);
    return oneWeekLater;
  }

  // Mostrar el modal
  const showPicker = () => {
    setPickerVisible(true);
  };

  // Confirmar la selección de la fecha y hora
  const handleConfirm = (date) => {
    if (isDateValid(date)) {
      setSelectedDate(date);
      setPickerVisible(false);
      setTiempoEntrega(date); // Actualizar el tiempo de entrega en el contexto

      if (onTimeSelected) {
        onTimeSelected(date);
      }
    } else {
      Alert.alert(
        'Horario no disponible',
        'Por favor escoge entre las horas de reparto.',
        [{ text: 'OK' }]
      );
      setPickerVisible(false);
    }
  };

  // Obtener el texto a mostrar por defecto
  const getDisplayDate = () => {
    const isToday = selectedDate.toDateString() === new Date().toDateString();
    const twoHoursLater = new Date(selectedDate.getTime() + 2 * 60 * 60 * 1000);

    if (isToday) {
      return `Hoy, ${selectedDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${twoHoursLater.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else {
      const dayOfWeek = selectedDate.toLocaleDateString('es-ES', { weekday: 'long' });
      return `${dayOfWeek}, ${selectedDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${twoHoursLater.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    }
  };

  // Validar la fecha seleccionada
  const isDateValid = (date) => {
    const now = new Date();
    const oneWeekLater = new Date();
    oneWeekLater.setDate(now.getDate() + 7);
    const selectedHour = date.getHours();

    return date >= now && date <= oneWeekLater && selectedHour >= MIN_HOUR && selectedHour < MAX_HOUR;
  };

  return (
    <View>
      <TouchableOpacity onPress={showPicker}>
        <View style={[styles.optionContainer, { backgroundColor: colorScheme === 'dark' ? '#333' : '#fff' }]}>
          <View style={styles.iconContainer}>
            <Octicons name="clock" size={24} color={colorScheme === 'dark' ? '#fff' : '#000'} />
          </View>
          <View style={styles.textContainer}>
            <Text style={{ color: colorScheme === 'dark' ? '#fff' : '#000' }}>
              {getDisplayDate()}
            </Text>
          </View>
        </View>
      </TouchableOpacity>

      <DateTimePickerModal
        isVisible={pickerVisible}
        mode="datetime"
        onConfirm={handleConfirm}
        onCancel={() => setPickerVisible(false)}
        date={selectedDate}
        minimumDate={getMinimumDate()}
        maximumDate={getMaximumDate()}
        headerTextIOS="Selecciona una fecha y hora"
        confirmTextIOS="Confirmar"
        cancelTextIOS="Cancelar"
        textColor={colorScheme === 'dark' ? '#fff' : '#000'}
        pickerBackgroundColor={colorScheme === 'dark' ? '#333' : '#fff'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  optionContainer: {
    width: '100%',
    marginTop: 20,
    borderBottomWidth: 0.5,
    borderColor: '#E1DFE9',
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: '15%',
    justifyContent: 'center',
  },
  textContainer: {
    width: '85%',
  },
});

export default TimePickerComponent;
