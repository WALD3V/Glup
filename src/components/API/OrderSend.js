// API/OrderSend.js
import { API_BASE_URL } from '@env';
import { getUserID } from "../Async/read";


const crearOrden = async ({ cart, idDireccion, total, tipoPago, tiempoEntrega, indicaciones, coordenadas, isActive, direccion }) => {

  const orderDate = new Date();
  const sameDayDelivery = orderDate.toDateString() === tiempoEntrega.toDateString();

  // Definir el status basado solo en la fecha de entrega
  const status = sameDayDelivery ? "en reparto" : "programado";


  try {
    // Primero crear la orden
    const orderResponse = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: await getUserID(), // ID del usuarieo autenticado
        address_id: idDireccion,
        driver_id: null, // Cambia esto si tienes un conductor asignado
        order_date: orderDate.toISOString(),
        delivery_date: tiempoEntrega || new Date(new Date().getTime() + 2 * 60 * 60 * 1000).toISOString(), // Si no hay tiempo de entrega, suma 2 horas
        status: status,
        total_amount: total,
        metodo_pago: tipoPago,
        factura: isActive,
        coordinates: coordenadas,
        address: direccion,
        indications: indicaciones,

      }),
    });

    const orderData = await orderResponse.json();

    if (orderResponse.ok) {
      console.log(`Orden creada con ID: ${orderData.order_id}`);

      // Crear los detalles de la orden
      for (let product of cart) {
        const orderDetailResponse = await fetch(`${API_BASE_URL}/orderdetails`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            order_id: orderData.order_id, // ID de la orden creada
            name_product: product.name,
            product_id: product.product_id, // ID del producto
            quantity: product.quanty, // Cantidad del producto
            price: product.price, // Precio del producto
          }),
        });

        if (!orderDetailResponse.ok) {
          console.error('Error al crear el detalle de la orden', await orderDetailResponse.json());
        } else {
          console.log(`Detalle de producto ${product.product_id} agregado a la orden`);
        }
      }
    } else {
      console.error('Error en la creación de la orden:', orderData);
      return null;
    }

    return orderData.order_id; // Retorna el ID de la orden si es necesario
  } catch (error) {

    console.error('Error al hacer el POST:', error);
    return null;

  }
};

export default crearOrden;
