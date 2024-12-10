import { Stack } from "expo-router";
import { View, Text } from "react-native";
import { Slot } from "expo-router";
import "../global.css";
export default function Layout() {
  return (
    <View className="flex-1 bg-gray-100">
      

      <Stack
        screenOptions={{
          headerShown: false, // Disable individual screen headers
          contentStyle: {   
            backgroundColor: "transparent", // Match parent background
          },
        }}
      />
    </View>
  );
}
