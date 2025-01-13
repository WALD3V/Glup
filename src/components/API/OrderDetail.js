import { API_BASE_URL } from '@env';

// api.js

// Obtener datos del usuario
export const getOrderData = async (orderID) => {
    try {
      // Convierte el orderID a string
      const orderIDString = String(orderID);
  
      // Realiza la solicitud fetch a la API
      const response = await fetch(`${API_BASE_URL}/orders/${orderIDString}/details`);
      
      // Verifica si la respuesta es correcta
      if (!response.ok) throw new Error('Error al obtener datos de la orden');
  
      // Procesa la respuesta como JSON
      const data = await response.json();
      
      // Asegúrate de que la respuesta es un objeto
      if (typeof data === 'object' && data !== null) {
        return data; // Retorna los datos directamente, ya que es un objeto
      }
  
      // Si no hay datos, lanzar un error
      throw new Error('No se encontraron datos para la orden');
      
    } catch (error) {
      console.error(error);
      throw error; // Lanza el error para que pueda ser manejado por el llamador
    }
  };