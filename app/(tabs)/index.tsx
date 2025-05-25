import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import GameButton from "@/components/GameButton";

export default function GameMenuScreen() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>🎮 ゲームメニュー</Text>
            <GameButton
                title="三目並べ（Tic-Tac-Toe）"
                onPress={() => router.push("/tic-tac-toe")}
            />
            <GameButton
                title="カウンターゲーム"
                onPress={() => router.push("/counter")}
            />
            <GameButton
                title="数当てゲーム"
                onPress={() => router.push("/guess-number")}
            />
            <Text style={styles.footer}>Powered by Expo Router</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f7fafd",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 16,
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        marginBottom: 30,
        color: "#4e8cff",
        letterSpacing: 1,
    },
    footer: {
        marginTop: 40,
        color: "#aaa",
        fontSize: 14,
    },
});
