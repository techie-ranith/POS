import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';

const Profile = () => {
  const [profile, setProfile] = useState({
    name: 'Ashini Nanayakkara',
    email: 'ashini@example.com',
    phone: '+123456789',
    bio: 'Computer Science Undergraduate and Frontend Developer',
  });

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Profile</Text>
        <Image
          style={styles.profileImage}
          source={{ uri: 'https://via.placeholder.com/150' }} // Replace with actual profile image URL
        />
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.value}>{profile.name}</Text>

          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{profile.email}</Text>

          <Text style={styles.label}>Phone:</Text>
          <Text style={styles.value}>{profile.phone}</Text>

          <Text style={styles.label}>Bio:</Text>
          <Text style={styles.value}>{profile.bio}</Text>
        </View>

        {/* Edit Profile Section */}
        <Text style={styles.editHeader}>Edit Profile</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={profile.name}
          onChangeText={(text) => setProfile({ ...profile, name: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={profile.email}
          onChangeText={(text) => setProfile({ ...profile, email: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone"
          value={profile.phone}
          onChangeText={(text) => setProfile({ ...profile, phone: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Bio"
          value={profile.bio}
          onChangeText={(text) => setProfile({ ...profile, bio: text })}
        />
        <Button title="Save Changes" onPress={() => alert('Profile updated successfully!')} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f5f5f5',
    flexGrow: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    alignSelf: 'center',
    marginBottom: 20,
  },
  infoContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  value: {
    fontSize: 16,
    marginBottom: 10,
  },
  editHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
});

export default Profile;
