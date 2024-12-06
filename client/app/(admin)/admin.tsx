
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Overview from './screen/overview';
import Inventry from './screen/inventry';
import Employee from './screen/employee';
import Discount from './screen/discount';
import Crm from './screen/crm';
import BillingandSale from './screen/billingandsales';
import Profile from './screen/profile';



const Drawer = createDrawerNavigator();

function RootStack() {
  return (
    <Drawer.Navigator initialRouteName="Overview">
      <Drawer.Screen name="Overview" component={Overview} />
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="Crm" component={Crm} />
      <Drawer.Screen name="Inventry" component={Inventry} />
      <Drawer.Screen name="Employee" component={Employee} />
      <Drawer.Screen name="Discount" component={Discount} />
      <Drawer.Screen name="BillingandSale" component={BillingandSale} />
    
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
   
      <RootStack />
  
  );
}
