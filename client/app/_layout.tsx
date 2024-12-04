import { Stack } from "expo-router";
import { View, Text } from "react-native";
import { Slot } from "expo-router";
import "../global.css";
export default function Layout() {
  return (
    <View className="flex-1 bg-gray-100">
      <View className="bg-blue-500 py-4 px-6">
        
      </View>

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
