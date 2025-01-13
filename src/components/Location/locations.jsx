import { StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import DetailDirecction from '../home/components/DirectionPreform';
import Header from '../user/header';
import Directions from '../API/DirectionList';

// BOTOON SHET 


const ColorComponents = "#76ABAE";//color app


export default function Location() {
    const Navigation = useNavigation();

    return (
        <View style={{ flex: 1, paddingTop: 20 }}>
            <TouchableOpacity onPress={() => Navigation.navigate("ChangeLoc")}>
                <View style={styles.falsebar}>
                    <Text style={styles.falseText}>
                        Agrega una direccion despacho..
                    </Text>
                </View>
            </TouchableOpacity>
            <View style={{ paddingTop: 20 }}>

                <Header
                    text={"Mis Direcciónes"}
                    fontFamily={"Poppins_600SemiBold"}
                    fontSize={28}

                />

            </View>

           
            <Directions/>


        </View>
    );
}

const Separator = () => {
    return <View style={styles.separator} />;
};



const styles = StyleSheet.create({
    falseText: {
        fontFamily: "Poppins_600SemiBold",
        color: '#CCC',
        fontSize: 12,

    },
    falsebar: {
        height: 50,
        backgroundColor: '#EEEEEE',
        borderRadius: 20,
        justifyContent: "center",
        alignItems: 'flex-start',
        paddingHorizontal: 15,
        width: '100%'


    },


});
