import { API_BASE_URL } from '@env';

// api.js
const API_URL = `${API_BASE_URL}/billingdataByUser`; // Cambia la URL base según tu entorno

// Obtener datos del usuario
export const getUserData = async (userId) => {
  try {
    const response = await fetch(`${API_URL}/${userId}`);
    if (!response.ok) throw new Error('Error al obtener datos del usuario');
    const data = await response.json();
    
    // Asegúrate de manejar la respuesta como un objeto
    if (Array.isArray(data) && data.length > 0) {
      return data[0]; // Retorna el primer objeto si es un array
    }
    
    // Si no hay datos, lanzar un error
    throw new Error('No se encontraron datos para el usuario');
    
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Actualizar datos del usuario
export const updateUserData = async (userId, updatedData) => {
  try {

    console.log(updatedData)
    const response = await fetch(`${API_URL}/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    });
    if (!response.ok) throw new Error('Error al actualizar datos del usuario');
    return await response.json(); // Devuelve la respuesta actualizada
  } catch (error) {
    console.error(error);
    throw error;
  }
};


//crear en e caso que no encuentre
export const createBillingData = async (billingData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/billingdata`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(billingData),
    });
    if (!response.ok) throw new Error('Error al crear los datos de facturación');
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};