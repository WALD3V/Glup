import { API_BASE_URL } from '@env';

// api.js
const API_URL = `${API_BASE_URL}/addresses`; // Cambia la URL base según tu entorno

// Obtener direccion del usuario
export const getAddressdata = async (userId) => {
  try {
    const response = await fetch(`${API_URL}/${userId}`);
    if (!response.ok) throw new Error('Error al obtener direccion del usuario');
    const data = await response.json();
    
    // Asegúrate de manejar la respuesta como un objeto
    return  data;
    
    // Si no hay direccion, lanzar un error
    
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// crear direccion del usuariocls
export const createAddressdata = async (createdData) => {
  try {

    console.log(createdData)
    
    const response = await fetch(`${API_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(createdData),
    });
    if (!response.ok) throw new Error('Error al crear direccion del usuario');
    return await response.json(); // Devuelve la respuesta actualizada
  } catch (error) {
    console.error(error);
    throw error;
  }
};
