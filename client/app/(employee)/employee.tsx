import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { TouchableOpacity, Text } from 'react-native'; // Import TouchableOpacity and Text

import Overview from './screen/overview';
import Inventry from './screen/inventry';
import Crm from './screen/crm';
import BillingandSale from './screen/billingandsales';
import Profile from './screen/profile';

const Drawer = createDrawerNavigator();

function RootStack() {
  // Function to handle logout
  const handleLogout = () => {
    console.log("Logging out...");
    // Add your logout logic here (e.g., clear session or navigate to login screen)
  };

  // Custom button component with NativeWind's className prop
  const LogoutButton = () => {
    return (
      <TouchableOpacity
        className="bg-red-500 p-2 rounded-full mr-4" // Tailwind className for styling
        onPress={handleLogout}
      >
        <Text className="text-white font-bold text-base">Logout</Text>
      </TouchableOpacity>
    );
  };

  return (
    <Drawer.Navigator initialRouteName="Overview">
      <Drawer.Screen 
        name="Overview" 
        component={Overview} 
        options={{
          headerRight: () => <LogoutButton />
        }} 
      />
      <Drawer.Screen 
        name="Profile" 
        component={Profile} 
        options={{
          headerRight: () => <LogoutButton />
        }} 
      />
      <Drawer.Screen 
        name="Crm" 
        component={Crm} 
        options={{
          headerRight: () => <LogoutButton />
        }} 
      />
      <Drawer.Screen 
        name="Inventry" 
        component={Inventry} 
        options={{
          headerRight: () => <LogoutButton />
        }} 
      />
   
      <Drawer.Screen 
        name="BillingandSale" 
        component={BillingandSale} 
        options={{
          headerRight: () => <LogoutButton />
        }} 
      />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
   
      <RootStack />
  );
}
