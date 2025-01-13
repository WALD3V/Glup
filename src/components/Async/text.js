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