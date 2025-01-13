import React, { useState } from 'react';
import { Button, Image, View, Platform, Text, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { EvilIcons } from '@expo/vector-icons';
import Octicons from '@expo/vector-icons/Octicons';
import CellNum from '../../Registrer/CellNum';
const ColorComponents = "#76ABAE"; // color app


const ImagePickerExample = ({ onImageSelected }) => {

    const [image, setImage] = useState(null);

    const pickImage = async () => {
        // Pedir permisos para acceder a la galería
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("Permission to access camera roll is required!");
            return;
        }

        // Abrir la galería de imágenes
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }

        if (!result.canceled) {
            onImageSelected(result.assets[0]); // Asegúrate de que la imagen se pase correctamente
        }
    };

    return (

        <TouchableOpacity onPress={pickImage} style={styles.container} >
            <View style={{ justifyContent: 'center', marginEnd: 5 }}>
                <Octicons name="image" size={15} color={ColorComponents} />
            </View>
            <View style={{ justifyContent: 'center' }}>
                <Text style={styles.text}>
                    {image ? 'Cambiar' : 'Subir Imagen'}
                </Text>
            </View>
        </TouchableOpacity>

    );
};



const styles = StyleSheet.create({

    container: {
        flexDirection: "row",
        height: 40,
        marginTop: 10,
        borderRadius: 20,
        borderWidth: 1,
        marginHorizontal: '20%',
        borderColor: ColorComponents,
        alignItems: 'center',
        justifyContent: 'center',


    },
    row: {
        flexDirection: 'row',
    },
    text: {
        fontFamily: 'Poppins_600SemiBold',
        color: ColorComponents,
        fontSize: 14
    },
    image: {
        width: 40,
        height: 60,
        borderRadius: 5,
        marginRight: 10, // Add margin to the right of the image
    },

});

export default ImagePickerExample;
