import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";

export default function CartItem({icon, name, price, control}) {



    return (
        <View style={styles.OptionContainer}>
            <View style={{ width: "25%", alignItems: "center", justifyContent: "center" }}>

            <Image
                    source={{ uri: icon }}
                    style={{ width: 40, height: 40, }}
                    resizeMode="contain"
                />
                
            </View>
            <View style={{ width: "45%", alignItems: "flex-start", justifyContent: "center" }}>
                <Text>
                    {name}
                </Text>
                
                <Text>
                    $ {price}
                </Text>

            </View>
            {control}

            
        </View>

    );
};

const styles = StyleSheet.create({
    OptionContainer: {
        width: "100%", 
        height: 80, 
        paddingVertical: 10, 
        flexDirection: "row" ,
        left: 0,
        right: 0,
        bottom: 0,
        borderBottomWidth: 0.5,
        borderColor: '#E1DFE9', // Puedes cambiar el color del subrayado aquí
        marginBottom: 10,

    },
});