import { API_BASE_URL } from '@env';

// api.js
const API_URL = `${API_BASE_URL}/users`; // Cambia la URL base según tu entorno

// Obtener datos del usuario
export const getUserData = async (userId) => {
  try {
    const response = await fetch(`${API_URL}/${userId}`);
    if (!response.ok) throw new Error('Error al obtener datos del usuario');
    const data = await response.json();
    
    // Asegúrate de manejar la respuesta como un objeto
    return  data;
    
    // Si no hay datos, lanzar un error
    
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Actualizar datos del usuariocls
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
