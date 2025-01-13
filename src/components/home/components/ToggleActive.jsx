import React, { useContext } from 'react';
import { DataContext } from '../../Context/DataContex';
import { View, Switch } from 'react-native'; // Usamos Switch para implementar el checkbox

const ToggleActive = () => {
    const { isActive, setIsActive } = useContext(DataContext); // Obtener isActive y setIsActive

    const handleToggle = (value) => {
        setIsActive(value); // Cambia el estado con el valor del Switch
    };


    return (
        <View style={{alignItems: 'center'}}>
            <Switch
                value={isActive} // El estado actual de isActive determina si el switch está activo
                onValueChange={handleToggle} // Cambia el estado cuando el usuario interactúa con el switch
            />
        </View>
    );
};

export default ToggleActive;

