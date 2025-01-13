import AsyncStorage from "@react-native-async-storage/async-storage";


export const saveDataSupplier = async (supplierId, suppCellphone) => {
    try {
        // Convertir el supplierId a string antes de guardarlo
        await AsyncStorage.setItem('SupplierId', JSON.stringify(supplierId));
        console.log('Supplier ID saved:', supplierId);

        await AsyncStorage.setItem('SuppCellphone', JSON.stringify(suppCellphone));
        console.log('Supplier number saved:', suppCellphone);
    } catch (e) {
        console.log('Error saving supplier data', e);
    }
};


export const saveDataUser = async () => {
    try {
      const userId = 1; // Ejemplo de valor de userId
      const userName = "David"; // Ejemplo de valor de userName
      await AsyncStorage.setItem('userId', JSON.stringify(userId)); // Guarda el userId como string
      await AsyncStorage.setItem('userName', JSON.stringify(userName)); // Guarda el userId como string
      console.log('Data saved successfully', userName);
    } catch (e) {
      console.error('Error saving data', e);
    }
  };

