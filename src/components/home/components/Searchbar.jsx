
import React from "react";
import { StyleSheet, View, Text, } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';





export default function SearchBar() {
    const Navigation = useNavigation();


    return (

        <TouchableOpacity onPress={() => Navigation.navigate('SearchBar')}>

            <View
                style={styles.SearchBar}

            >
                <View style={{ width: '90%' }} >
                    <Text
                        style={{
                            fontFamily: 'Poppins_400Regular',
                            fontSize: 16,
                            color: '#CCC'
                        }}
                    >

                        Necesito...
                    </Text>
                </View>

                <View style={{ width: '10%' }}>
                    <Feather name="search" size={24} color="#CCC" />
                </View>
            </View>
        </TouchableOpacity>




    );







}


const styles = StyleSheet.create({

    SearchBar: {
        height: 50,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "#EEEEEE",
        borderRadius: 40,
        paddingHorizontal: 15,
    },


});










