import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function CounterGameScreen() {
    const [count, setCount] = useState(0);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>カウンターゲーム</Text>
            <Text style={styles.counter}>{count}</Text>
            <View style={styles.btnRow}>
                <TouchableOpacity
                    style={styles.btn}
                    onPress={() => setCount(count + 1)}
                >
                    <Text style={styles.btnText}>＋</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.btn}
                    onPress={() => setCount(count - 1)}
                >
                    <Text style={styles.btnText}>－</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.btn}
                    onPress={() => setCount(0)}
                >
                    <Text style={styles.btnText}>リセット</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f7fafd",
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#4e8cff",
        marginBottom: 10,
    },
    counter: {
        fontSize: 48,
        fontWeight: "bold",
        marginBottom: 20,
        color: "#222",
    },
    btnRow: { flexDirection: "row", gap: 16 },
    btn: {
        backgroundColor: "#4e8cff",
        paddingHorizontal: 18,
        paddingVertical: 12,
        borderRadius: 10,
        marginHorizontal: 4,
    },
    btnText: { color: "#fff", fontWeight: "bold", fontSize: 22 },
});
