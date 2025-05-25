import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Pressable } from "react-native";

import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";

function TabBarIcon(props: {
    name: React.ComponentProps<typeof FontAwesome>["name"];
    color: string;
}) {
    return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
    const colorScheme = useColorScheme();

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
                headerShown: useClientOnlyValue(false, true),
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "ゲームメニュー",
                    tabBarIcon: ({ color }) => (
                        <TabBarIcon name="gamepad" color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="tic-tac-toe"
                options={{
                    title: "三目並べ",
                    tabBarIcon: ({ color }) => (
                        <TabBarIcon name="th-large" color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="counter"
                options={{
                    title: "カウンター",
                    tabBarIcon: ({ color }) => (
                        <TabBarIcon name="plus-square" color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="guess-number"
                options={{
                    title: "数当て",
                    tabBarIcon: ({ color }) => (
                        <TabBarIcon name="question-circle" color={color} />
                    ),
                }}
            />
            {/* 既存のtwoタブも残す場合 */}
            {/* <Tabs.Screen
                name="two"
                options={{
                    title: "Tab Two",
                    tabBarIcon: ({ color }) => (
                        <TabBarIcon name="code" color={color} />
                    ),
                }}
            /> */}
        </Tabs>
    );
}
