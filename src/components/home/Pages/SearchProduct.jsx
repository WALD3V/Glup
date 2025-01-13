import React, { useRef, useEffect, useCallback, useState, forwardRef } from 'react';
import { KeyboardAvoidingView, View, Platform, StyleSheet, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SearchProduct() {
    const inputRef = useRef(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (inputRef.current) {
                inputRef.current.focus();
            }
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    return (
        <View style={{
            flex: 1,
            paddingHorizontal: 15,
            backgroundColor: '#FFF',
            paddingTop: Platform.OS === "android" ? 30 : 15
        }}>
            <View style={styles.SearchBar}>
                <View style={{ width: '90%' }}>
                    <ImputSearch
                        font={'Poppins_400Regular'}
                        placeholder="Necesito..."
                        maxLength={15}
                        keyboardType={"default"}
                        ref={inputRef}
                    />
                </View>
            </View>
        </View>
    );
}

const ImputSearch = forwardRef(({ placeholder, maxLength, keyboardType, font }, ref) => {
    const [inputText, setInputText] = useState('');

    const handleInputChange = (text) => {
        const formattedText = text.replace(/[^a-zA-Z0-9\s]/g, '');
        setInputText(formattedText);
    };

    return (
        <TextInput
            style={{
                paddingHorizontal: 10,
                fontFamily: font,
            }}
            onChangeText={handleInputChange}
            value={inputText}
            maxLength={maxLength}
            keyboardType={keyboardType}
            placeholder={placeholder}
            textAlign="left"
            ref={ref}
        />
    );
});

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
