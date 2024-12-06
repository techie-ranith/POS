import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';

export default function SignUpPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const validateForm = () => {
    if (!fullName || !email || !password || !confirmPassword) {
      setErrorMessage("All fields are required");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage("Invalid email format");
      return false;
    }

    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters");
      return false;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return false;
    }

    return true;
  };

  const handleSignUp = async () => {
    if (!validateForm()) return;

    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fullName, email, password }),
      });

      if (response.ok) {
        alert("Sign up successful");
      } else {
        alert("Failed to sign up");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred");
    }
  };

  return (
    <View className="flex-1 bg-gray-100 justify-center items-center px-6">
      <View className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <Text className="text-2xl font-bold text-center text-gray-800 mb-6">Sign Up</Text>

        {errorMessage && (
          <Text className="text-red-500 text-center mb-4">{errorMessage}</Text>
        )}

        <TextInput
          placeholder="Full Name"
          value={fullName}
          onChangeText={setFullName}
          className="w-full border border-gray-300 rounded-lg p-3 text-base mb-4 focus:border-blue-500 focus:ring-blue-500"
        />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          className="w-full border border-gray-300 rounded-lg p-3 text-base mb-4 focus:border-blue-500 focus:ring-blue-500"
        />
        <TextInput
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          className="w-full border border-gray-300 rounded-lg p-3 text-base mb-4 focus:border-blue-500 focus:ring-blue-500"
        />
        <TextInput
          placeholder="Confirm Password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          className="w-full border border-gray-300 rounded-lg p-3 text-base mb-6 focus:border-blue-500 focus:ring-blue-500"
        />

        <TouchableOpacity
          onPress={handleSignUp}
          className="w-full bg-blue-500 py-3 rounded-lg active:bg-blue-600"
        >
          <Text className="text-center text-white text-base font-medium">Sign Up</Text>
        </TouchableOpacity>

        <Text className="text-center text-gray-600 text-sm mt-4">
          Already have an account?{' '}
          <Link href="/auth/login">
            <Text className="text-blue-500 underline">Log in</Text>
          </Link>
        </Text>
      </View>
    </View>
  );
}
