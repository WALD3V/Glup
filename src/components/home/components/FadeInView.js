import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet } from 'react-native';

const FadeInView = ({ children, delay = 0 }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Valor inicial de opacidad

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1, // Desvanecimiento completo (opacidad 1)
      duration: 1000, // Duración de la animación en ms
      delay: delay, // Tiempo de retraso para cada componente
      useNativeDriver: true, // Optimiza la animación con el driver nativo
    }).start();
  }, [fadeAnim, delay]);

  return (
    <Animated.View style={{ ...styles.fadeContainer, opacity: fadeAnim }}>
      {children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  fadeContainer: {
    marginVertical: 10,
  },
});

export default FadeInView;
