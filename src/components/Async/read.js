import AsyncStorage from "@react-native-async-storage/async-storage";

export const getUserID = async () => {
    try {
      const storedUserId = await AsyncStorage.getItem('userId');
      if (storedUserId !== null) {
        // El valor se guarda y recupera correctamente como string
        console.log('Valor recuperado:', storedUserId);
        return JSON.parse(storedUserId); // Convierte de nuevo a número si es necesario
      }
    } catch (e) {
      console.error('Error retrieving data', e);
    }
  };

  export const getUserName = async () => {
    try {
        const storedUserName = await AsyncStorage.getItem('userName');
        if (storedUserName !== null) {
            // El valor se guarda y recupera correctamente como string
            console.log('Valor recuperado:', storedUserName);
            return JSON.parse(storedUserName); // Convierte de nuevo a número si es necesario
        }
    } catch (e) {
        console.error('Error retrieving data', e);
    }
};

 export const getSupplierId = async () => {
    try {
      const storedSupplierId = await AsyncStorage.getItem('SupplierId');
      if (storedSupplierId !== null) {
        // El valor se guarda y recupera correctamente como string
        console.log('Valor recuperado:', storedSupplierId);
        return JSON.parse(storedSupplierId); // Convierte de nuevo a número si es necesario
      }
    } catch (e) {
      console.error('Error retrieving data', e);
    }
  };