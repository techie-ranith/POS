import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Modal } from 'react-native';

const AdminProfile = () => {
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('johndoe@example.com');
  const [contact, setContact] = useState('+123 456 7890');
  const [address, setAddress] = useState('123 Main St, City, Country');
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    // Save the changes
    setIsEditing(false);
    console.log('Profile updated:', { name, email, contact, address });
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Optionally reset fields to original state if canceling
    // setName('John Doe');
    // setEmail('johndoe@example.com');
    // setContact('+123 456 7890');
    // setAddress('123 Main St, City, Country');
  };

  return (
    <View style={{ padding: 16, backgroundColor: '#f9f9f9', flex: 1 }}>
      {/* Profile Header */}
      <View className="flex items-center mb-8">
        <Image
          source={{ uri: 'https://via.placeholder.com/150' }}
          style={{ width: 150, height: 150, borderRadius: 75 }}
        />
        <Text className="mt-4 text-2xl font-bold">{name}</Text>
        <Text className="text-gray-500">{email}</Text>
      </View>

      {/* Profile Details */}
      <View className="space-y-4">
        {/* Name */}
        <View className="bg-white p-4 rounded-lg shadow-md">
          <Text className="font-semibold">Name</Text>
          <Text className="mt-2 text-gray-700">{name}</Text>
        </View>

        {/* Email */}
        <View className="bg-white p-4 rounded-lg shadow-md">
          <Text className="font-semibold">Email</Text>
          <Text className="mt-2 text-gray-700">{email}</Text>
        </View>

        {/* Contact */}
        <View className="bg-white p-4 rounded-lg shadow-md">
          <Text className="font-semibold">Contact</Text>
          <Text className="mt-2 text-gray-700">{contact}</Text>
        </View>

        {/* Address */}
        <View className="bg-white p-4 rounded-lg shadow-md">
          <Text className="font-semibold">Address</Text>
          <Text className="mt-2 text-gray-700">{address}</Text>
        </View>
      </View>

      {/* Edit Button */}
      <View className="mt-8 flex items-center">
        <TouchableOpacity
          onPress={() => setIsEditing(true)}
          className="bg-blue-500 text-white py-2 px-6 rounded-lg"
        >
          <Text className="font-semibold">Edit Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Edit Profile Modal */}
      <Modal
        transparent={true}
        visible={isEditing}
        animationType="slide"
        onRequestClose={handleCancel}
      >
        <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
          <View className="bg-white p-6 rounded-lg w-80">
            <Text className="text-2xl font-semibold text-center mb-4">Edit Profile</Text>

            {/* Name Input */}
            <Text className="font-semibold">Name</Text>
            <TextInput
              value={name}
              onChangeText={setName}
              className="mt-2 p-2 border border-gray-300 rounded-md mb-4"
            />

            {/* Email Input */}
            <Text className="font-semibold">Email</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              className="mt-2 p-2 border border-gray-300 rounded-md mb-4"
            />

            {/* Contact Input */}
            <Text className="font-semibold">Contact</Text>
            <TextInput
              value={contact}
              onChangeText={setContact}
              className="mt-2 p-2 border border-gray-300 rounded-md mb-4"
            />

            {/* Address Input */}
            <Text className="font-semibold">Address</Text>
            <TextInput
              value={address}
              onChangeText={setAddress}
              className="mt-2 p-2 border border-gray-300 rounded-md mb-4"
            />

            {/* Save & Cancel Buttons */}
            <View className="flex flex-row justify-between">
              <TouchableOpacity
                onPress={handleCancel}
                className="bg-gray-500 text-white py-2 px-4 rounded-lg"
              >
                <Text className="font-semibold">Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleSave}
                className="bg-green-500 text-white py-2 px-4 rounded-lg"
              >
                <Text className="font-semibold">Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default AdminProfile;
