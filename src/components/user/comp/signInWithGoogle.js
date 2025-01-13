import * as Google from 'expo-auth-session/providers/google';
import { useEffect, useState } from 'react';
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();

export const signInWithGoogle = async () => {
  try {
    const [request, response, promptAsync] = Google.useAuthRequest({
      clientId: 'TU_CLIENT_ID_DE_GOOGLE', // Reemplázalo con tu ID de cliente
      androidClientId: 'TU_CLIENT_ID_ANDROID',
      iosClientId: 'TU_CLIENT_ID_IOS',
    });

    useEffect(() => {
      if (response?.type === 'success') {
        const { authentication } = response;
        console.log(authentication); // Aquí puedes manejar el token de autenticación
      }
    }, [response]);

    const result = await promptAsync();
    return result;
  } catch (error) {
    console.error('Error al iniciar sesión con Google:', error);
  }
};
