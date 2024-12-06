import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import {Link} from  'expo-router';
export default function SignUpPage() {
  return (  
    <View className="flex-1 bg-gray-100 justify-center items-center px-6">
      <View className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <Text className="text-2xl font-bold text-center text-gray-800 mb-6">Sign Up</Text>
        
        <TextInput
          placeholder="Full Name"
          className="w-full border border-gray-300 rounded-lg p-3 text-base mb-4 focus:border-blue-500 focus:ring-blue-500"
        />
        <TextInput
          placeholder="Email"
          className="w-full border border-gray-300 rounded-lg p-3 text-base mb-4 focus:border-blue-500 focus:ring-blue-500"
        />
        <TextInput
          placeholder="Password"
          secureTextEntry
          className="w-full border border-gray-300 rounded-lg p-3 text-base mb-4 focus:border-blue-500 focus:ring-blue-500"
        />
        <TextInput
          placeholder="Confirm Password"
          secureTextEntry
          className="w-full border border-gray-300 rounded-lg p-3 text-base mb-6 focus:border-blue-500 focus:ring-blue-500"
        />

        <TouchableOpacity className="w-full bg-blue-500 py-3 rounded-lg active:bg-blue-600">
          <Text className="text-center text-white text-base font-medium">Sign Up</Text>
        </TouchableOpacity>

        <Text className="text-center text-gray-600 text-sm mt-4">
          Already have an account?{' '}
          <Link href="/auth/login">

       <Text className="text-blue-500 underline">Sign up</Text>
      </Link>
        </Text>
      </View>
    </View>
  );
}
