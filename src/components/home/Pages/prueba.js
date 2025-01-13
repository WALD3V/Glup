const [OrderData, setOrderData] = useState({
    order_date: '',
    delivery_date: '',
    status: '',
    adress: '',
    coordinates: '',
    indications: '',
});

const loadOrderData = async () => {
    try {
        const data = await getOrderData(OrderId);
        setOrderData({
            order_date: data.order_date,
            delivery_date: data.delivery_date,
            status: data.status,
            adress: data.adress,
            coordinates: data.coordinates,
            indications: data.indications,
        });

    } catch (error) {
        Alert.alert('Error', 'No cargaron datos guardados');
    } 
};


const handleSave = async () => {

    try {
        if (hasorderData) {
            // Actualizar datos existentes con PUT
            await updateOrderData(OrderId, OrderData);
            Alert.alert('¡Éxito!', 'Los datos de la orden se han actualizado correctamente.');
        } else {
            // Crear nuevos datos con POST
            const neworderData = {
                Order_id: OrderId,
                delivery_date: OrderData.delivery_date,
                order_date: OrderData.order_date,
                status: OrderData.status,
                indications: OrderData.indications,
            };
            await createorderData(neworderData);
            setHasorderData(true); // Actualiza el estado indicando que ahora tiene datos
            Alert.alert('¡Éxito!', 'Los datos de la orden se han creado correctamente.');
        }
    } catch (error) {
        Alert.alert('Error', 'Hubo un problema al guardar los datos: ' + error.message);
    }
};