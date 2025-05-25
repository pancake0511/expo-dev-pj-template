import React from "react";
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from "react-native";

type Props = {
    title: string;
    onPress: () => void;
    style?: ViewStyle;
};

export default function GameButton({ title, onPress, style }: Props) {
    return (
        <TouchableOpacity
            style={[styles.button, style]}
            onPress={onPress}
            activeOpacity={0.7}
        >
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#4e8cff",
        paddingVertical: 18,
        paddingHorizontal: 30,
        borderRadius: 16,
        marginVertical: 10,
        alignItems: "center",
        shadowColor: "#222",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.18,
        shadowRadius: 5,
        elevation: 3,
    },
    text: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 20,
        letterSpacing: 1,
    },
});
