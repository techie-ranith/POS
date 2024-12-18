import React from 'react';
import { View, Text } from 'react-native';
// import {   
//   Table,
//   TableHeader,
//   TableFooter,
//   TableBody,
//   TableHead,
//   TableData,
//   TableRow,
//   TableCaption,
//  } from '@/components/ui/table';

import Tabel from "@/components/table"

 const headers = ['Name', 'Email Address', 'Phone Number'];
const data = [
  ['Rajesh Kumar', 'rajesh@example.com', '1234567890'],
  ['Priya Sharma', 'priya@example.com', '1234567890'],
  ['Ravi Patel', 'ravi@example.com', '1234567890'],
  ['Ananya Gupta', 'ananya@example.com', '1234567890'],
  ['Arjun Singh', 'arjun@example.com', '1234567890'],
  ['Nisha Verma', 'nisha@example.com', '1234567890'],
];
 
const caption = 'Showing recent membership details';
 
const Crm = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Tabel headers={headers} data={data} caption={caption} />
    </View>
  );
};

export default Crm;
 



