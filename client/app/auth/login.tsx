import { View, Text, TextInput, TouchableOpacity} from 'react-native';
import { useState } from 'react';
import { Link } from 'expo-router';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    // Basic form validation
    if (!email || !password) {
      alert('Please fill in both email and password');
      return;
    }
  
    try {
      // Send the login request to the backend
      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
  
      // Check if the response is successful
      if (!response.ok) {
        const data = await response.json();
        alert(data.message || 'Login failed');
        return;  // Exit early if login fails
      }
  
      // Parse the response data
      const data = await response.json();
  
      // If login is successful, store the token and handle redirection
      if (data.token) {
        alert('Login successful');
        
        // Store the token in localStorage or sessionStorage (depending on your needs)
        localStorage.setItem('authToken', data.token);
  
        // Redirect user based on their role
        window.location.href = data.redirectTo;
      } else {
        alert('Failed to login');
      }
    } catch (error) {
      // Handle errors (network issues, etc.)
      console.error('Login error:', error);
      alert('An error occurred, please try again later');
    }
  };
  

  return (
    <View className="flex-1 bg-gray-100 justify-center items-center px-6">
      <View className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <Text className="text-2xl font-bold text-center text-gray-800 mb-6">Login</Text>

        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          keyboardType="email-address"
          className="w-full border border-gray-300 rounded-lg p-3 text-base mb-4 focus:border-blue-500 focus:ring-blue-500"
        />
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry
          className="w-full border border-gray-300 rounded-lg p-3 text-base mb-6 focus:border-blue-500 focus:ring-blue-500"
        />

        <TouchableOpacity
          onPress={handleLogin}
          className="w-full bg-blue-500 py-3 rounded-lg active:bg-blue-600"
        >
          <Text className="text-center text-white text-base font-medium">Login</Text>
        </TouchableOpacity>

        {/* <Text className="text-center text-gray-600 text-sm mt-4">
          Don't have an account?{' '}
          <Link href="/auth/signup">
            <Text className="text-blue-500 underline">Sign up</Text>
          </Link>
        </Text> */}
      </View>
    </View>
  );
}
