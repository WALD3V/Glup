import React, { useEffect, useState, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

const CountdownBar = ({ onComplete }) => {
  const [progress] = useState(new Animated.Value(0));
  const timeoutRef = useRef(null);
  const isMounted = useRef(false); // Bandera para saber si el componente está montado
  const navigation = useNavigation(); // Hook para acceder a la navegación

  useFocusEffect(
    React.useCallback(() => {
      // Cuando la pantalla está enfocada, se inicia el contador
      isMounted.current = true;

      Animated.timing(progress, {
        toValue: 1, // Completa la animación
        duration: 5000, // 5 segundos
        useNativeDriver: false,
      }).start(() => {
        if (isMounted.current) {
          onComplete();
        }
      });

      return () => {
        // Limpieza cuando la pantalla pierde el foco o el componente se desmonta
        isMounted.current = false;
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    }, [])
  );

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.progressBar,
          {
            width: progress.interpolate({
              inputRange: [0, 1],
              outputRange: ['0%', '100%'], // Ancho de 0% a 100%
            }),
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 5, // Altura de la barra
    backgroundColor: '#e0e0e0', // Color de fondo
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressBar: {
    height: 5, // Altura de la barra de progreso
    backgroundColor: '#76c7c0', // Color de la barra de progreso
  },
});

export default CountdownBar;
