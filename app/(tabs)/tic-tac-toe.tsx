import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";

const emptyBoard = Array(9).fill(null);

function checkWinner(board: string[]) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let [a, b, c] of lines) {
        if (board[a] && board[a] === board[b] && board[a] === board[c])
            return board[a];
    }
    return null;
}

export default function TicTacToeScreen() {
    const [board, setBoard] = useState<string[]>([...emptyBoard]);
    const [turn, setTurn] = useState<"○" | "×">("○");
    const winner = checkWinner(board);

    const handlePress = (idx: number) => {
        if (board[idx] || winner) return;
        const newBoard = [...board];
        newBoard[idx] = turn;
        setBoard(newBoard);
        setTurn(turn === "○" ? "×" : "○");
    };

    const reset = () => {
        setBoard([...emptyBoard]);
        setTurn("○");
    };

    React.useEffect(() => {
        if (winner) {
            setTimeout(() => {
                Alert.alert("勝者", `${winner} の勝ち！`, [
                    { text: "リセット", onPress: reset },
                ]);
            }, 300);
        } else if (board.every(Boolean)) {
            setTimeout(() => {
                Alert.alert("引き分け", "引き分けです", [
                    { text: "リセット", onPress: reset },
                ]);
            }, 300);
        }
    }, [winner, board]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>三目並べ</Text>
            <Text style={styles.turn}>手番：{turn}</Text>
            <View style={styles.board}>
                {board.map((cell, i) => (
                    <TouchableOpacity
                        key={i}
                        style={[styles.cell, cell && styles.cellFilled]}
                        onPress={() => handlePress(i)}
                        activeOpacity={cell ? 1 : 0.7}
                    >
                        <Text style={styles.cellText}>{cell}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            <TouchableOpacity style={styles.resetBtn} onPress={reset}>
                <Text style={styles.resetText}>リセット</Text>
            </TouchableOpacity>
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
    turn: { fontSize: 18, marginBottom: 10, color: "#222" },
    board: {
        flexDirection: "row",
        flexWrap: "wrap",
        width: 240,
        height: 240,
        marginBottom: 20,
    },
    cell: {
        width: 80,
        height: 80,
        borderWidth: 2,
        borderColor: "#4e8cff",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
    },
    cellFilled: { backgroundColor: "#e8f0fe" },
    cellText: { fontSize: 40, fontWeight: "bold", color: "#4e8cff" },
    resetBtn: {
        marginTop: 10,
        backgroundColor: "#d2e3fc",
        paddingHorizontal: 30,
        paddingVertical: 12,
        borderRadius: 12,
    },
    resetText: { color: "#4e8cff", fontWeight: "bold", fontSize: 18 },
});
