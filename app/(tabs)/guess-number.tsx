import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Keyboard,
} from "react-native";

function getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function GuessNumberScreen() {
    const [target, setTarget] = useState(getRandomInt(1, 100));
    const [input, setInput] = useState("");
    const [message, setMessage] = useState("1～100の数字を当ててください！");
    const [tries, setTries] = useState(0);

    const check = () => {
        const num = parseInt(input, 10);
        if (isNaN(num)) {
            setMessage("数字を入力してください");
            return;
        }
        setTries(tries + 1);
        if (num === target) {
            setMessage(`正解！${tries + 1}回目で当たりました！`);
            Keyboard.dismiss();
        } else if (num < target) {
            setMessage("もっと大きい数字です");
        } else {
            setMessage("もっと小さい数字です");
        }
        setInput("");
    };

    const reset = () => {
        setTarget(getRandomInt(1, 100));
        setMessage("1～100の数字を当ててください！");
        setTries(0);
        setInput("");
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>数当てゲーム</Text>
            <Text style={styles.msg}>{message}</Text>
            <TextInput
                style={styles.input}
                value={input}
                onChangeText={setInput}
                keyboardType="numeric"
                placeholder="数字を入力"
                maxLength={3}
                onSubmitEditing={check}
            />
            <TouchableOpacity style={styles.btn} onPress={check}>
                <Text style={styles.btnText}>判定</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.resetBtn} onPress={reset}>
                <Text style={styles.resetText}>リセット</Text>
            </TouchableOpacity>
            <Text style={styles.tries}>試行回数: {tries}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f7fafd",
        padding: 16,
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#4e8cff",
        marginBottom: 10,
    },
    msg: { fontSize: 18, marginBottom: 10, color: "#333" },
    input: {
        borderWidth: 1,
        borderColor: "#4e8cff",
        borderRadius: 8,
        width: 120,
        height: 40,
        fontSize: 20,
        textAlign: "center",
        backgroundColor: "#fff",
        marginBottom: 10,
    },
    btn: {
        backgroundColor: "#4e8cff",
        paddingHorizontal: 30,
        paddingVertical: 12,
        borderRadius: 10,
        marginBottom: 8,
    },
    btnText: { color: "#fff", fontWeight: "bold", fontSize: 20 },
    resetBtn: {
        backgroundColor: "#d2e3fc",
        paddingHorizontal: 30,
        paddingVertical: 10,
        borderRadius: 10,
        marginBottom: 8,
    },
    resetText: { color: "#4e8cff", fontWeight: "bold", fontSize: 18 },
    tries: { marginTop: 10, color: "#888", fontSize: 16 },
});
