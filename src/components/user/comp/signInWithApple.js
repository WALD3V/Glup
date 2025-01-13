import * as AppleAuthentication from 'expo-apple-authentication';

export const signInWithApple = async () => {
  try {
    const credential = await AppleAuthentication.signInAsync({
      requestedScopes: [
        AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
        AppleAuthentication.AppleAuthenticationScope.EMAIL,
      ],
    });

    console.log(credential); // Aquí puedes manejar el token de autenticación y la información del usuario
    return credential;
  } catch (error) {
    if (error.code === 'ERR_CANCELED') {
      console.log('Inicio de sesión con Apple cancelado.');
    } else {
      console.error('Error al iniciar sesión con Apple:', error);
    }
  }
};
