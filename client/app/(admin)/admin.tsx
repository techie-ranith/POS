import * as React from 'react';
import  { useEffect, useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { TouchableOpacity, Text, View} from 'react-native'; 
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';// Import TouchableOpacity and Text
import Overview from './screen/overview';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import Inventry from './screen/inventry';
import Employee from './screen/employee';
import Discount from './screen/discount';
import Crm from './screen/crm';
import BillingandSale from './screen/billingandsales';
import Profile from './screen/profile';
import jwtDecode from 'jwt-decode';


import {
  Button,
  ButtonText,
  ButtonSpinner,
  ButtonIcon,
  ButtonGroup,
} from '@/components/ui/button';

import { EditIcon } from '@/components/ui/icon';
import { useNavigation } from '@react-navigation/native';

const Drawer = createDrawerNavigator();


function RootStack() {
 
    const handleLogout = async () => {
      console.log("Logging out...");
      await AsyncStorage.removeItem('token');
      window.location.href = '/auth/login';

      
    };
  const LogoutButton = () => {
    return (
      <TouchableOpacity
        className="bg-red-500 p-2 rounded-full mr-4" 
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
        name="Employee" 
        component={Employee} 
        options={{
          headerRight: () => <LogoutButton />
        }} 
      />
      <Drawer.Screen 
        name="Discount" 
        component={Discount} 
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

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
    const token = await AsyncStorage.getItem('token');
    const role = await AsyncStorage.getItem('role')
    if (!(role=="Admin"))
    {
      setIsAuthenticated(false);
    }else{

    
  
  if (token) {
   
    const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/verify-token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, 
      },
    });

    const data = await response.json();

    if (data.success) {
      console.log('Token is valid');
      setIsAuthenticated(true);     
    } else {
      console.log('Invalid token');
      setIsAuthenticated(false);
     
    }
  } else {
    console.log('No token found');
    setIsAuthenticated(false);
   
  }

}

     
    };

    checkAuth();
    const intervalId = setInterval(checkAuth, 9000);

    return () => clearInterval(intervalId);
  }, []);


  if (!isAuthenticated) {
    return (
      <div className="flex justify-center items-center h-screen bg-black">
      <div className="text-center">
        <Text className="text-white">Not authorized. Please log in.</Text>
        
          <a className="text-blue-500 hover:underline" href='/auth/login'>Click here to log in</a>
      
      </div>
    </div>
  )
  }


  return (
    <>
      <RootStack />
      <View className='felx items-end justify-center'>
      <Button
      size='lg'
      className='rounded-full border-2 p-3.5 mb-4 mr-4'
    >
      <ButtonIcon as={EditIcon} />
    </Button>
      </View>

    </>
  );
}
