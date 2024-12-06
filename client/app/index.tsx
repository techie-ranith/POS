import { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, Animated } from 'react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const fadeAnim = new Animated.Value(0); // Initial opacity for animation

  useEffect(() => {
    
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000, 
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 1000, 
          useNativeDriver: true,
        }),
      ])
    ).start();

   
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); 

    return () => clearTimeout(timer); 
  }, []);

  const handleNavigation = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push('/auth/login'); 
    });
  };

  if (isLoading) {
    return (
      <View className="flex-1 bg-gray-900 items-center justify-center">
  <Animated.View
    style={{
      opacity: fadeAnim,
      backgroundColor: '#1E90FF', 
      width: 120,
      height: 120,
      borderRadius: 60, 
      shadowColor: '#1E90FF', 
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.8,
      shadowRadius: 20,
      elevation: 10, 
    }}
  />
</View>

    );
  }

  return (
    <View className="flex-1 bg-gray-800 items-center justify-center">
      <TouchableOpacity onPress={handleNavigation}>
        <Text className="text-green-500 text-lg mb-5">Login</Text>
      </TouchableOpacity>
      <Text className="text-white text-base mt-2">Home screen</Text>
    </View>
  );
}
