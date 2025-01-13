import React, { createContext, useState, useMemo, useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';

// Crear el contexto
const DataContext = createContext();

// Proveedor del contexto
const DataProvider = ({ children }) => {
    // Estado general de la aplicación
    const [cart, setCart] = useState([]);
    const [nameDireccion, setNameDireccion] = useState('');
    const [total, setTotal] = useState('');
    const [direccion, setDireccion] = useState('');
    const [idDireccion, setIdDireccion] = useState('');
    const [coordenadas, setCoordenadas] = useState('');
    const [tiempoEntrega, setTiempoEntrega] = useState('');
    const [indicaciones, setIndicaciones] = useState('sin detalle');
    const [tipoPago, setTipoPago] = useState('');
    const [urlTransferencia, setUrlTransferencia] = useState('');
    const [isActive, setIsActive] = useState(false);
    const [isNew, setIsNew] = useState(false);

    // Estado para la conexión a internet
    const [isConnected, setIsConnected] = useState(true);

    // Escuchar cambios en la conexión a internet
    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            setIsConnected(state.isConnected);
        });

        return () => unsubscribe();
    }, []);

    // Función para agregar productos al carrito
    const buyProducts = (product) => {
        const productRepeat = cart.find((item) => item.product_id === product.product_id);
        if (productRepeat) {
            setCart(cart.map((item) => (item.product_id === product.product_id ? { ...product, quanty: productRepeat.quanty + 1 } : item)));
        } else {
            setCart([...cart, { ...product, quanty: 1 }]);
        }
    };

    // Memorizar el valor del contexto
    const contextValue = useMemo(() => ({
        cart,
        setCart,
        buyProducts,
        direccion,
        setDireccion,
        nameDireccion,
        setNameDireccion,
        total,
        setTotal,
        idDireccion,
        setIdDireccion,
        coordenadas,
        setCoordenadas,
        tiempoEntrega,
        setTiempoEntrega,
        indicaciones,
        setIndicaciones,
        tipoPago,
        setTipoPago,
        urlTransferencia,
        setUrlTransferencia,
        isActive,
        setIsActive,
        isNew,
        setIsNew,
        isConnected, // Añadimos el estado de conexión al contexto
    }), [
        cart, direccion, nameDireccion, total, idDireccion,
        coordenadas, tiempoEntrega, indicaciones, tipoPago, urlTransferencia,
        isActive, isNew, isConnected
    ]);

    return (
        <DataContext.Provider value={contextValue}>
            {children}
        </DataContext.Provider>
    );
};

export { DataContext, DataProvider };
