import React from 'react';
import { View, Text } from 'react-native';
import {   
  Table,
  TableHeader,
  TableFooter,
  TableBody,
  TableHead,
  TableData,
  TableRow,
  TableCaption,
 } from '@/components/ui/table';

const Crm = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Crm Screen hello</Text>
      {/* <Box className="rounded-lg overflow-hidden w-full"> */}
    <Table className="w-full">
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email Address</TableHead>
          <TableHead>Phone Number</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableData>Rajesh Kumar</TableData>
          <TableData >rajesh@example.com</TableData>
          <TableData >1234567890</TableData>
        </TableRow>
        <TableRow>
          <TableData>Priya Sharma</TableData>
          <TableData >priya@example.com</TableData>
          <TableData >1234567890</TableData>
        </TableRow>
        <TableRow>
          <TableData>Ravi Patel</TableData>
          <TableData >ravi@example.com</TableData>
          <TableData >1234567890</TableData>
        </TableRow>
        <TableRow>
          <TableData>Ananya Gupta</TableData>
          <TableData >ananya@example.com</TableData>
          <TableData >1234567890</TableData>
        </TableRow>
        <TableRow>
          <TableData>Arjun Singh</TableData>
          <TableData >arjun@example.com</TableData>
          <TableData >1234567890</TableData>
        </TableRow>
        <TableRow>
          <TableData>Nisha Verma</TableData>
          <TableData >nisha@example.com</TableData>
          <TableData >1234567890</TableData>
        </TableRow>
      </TableBody>
      <TableCaption >
        Showing recent membership details
      </TableCaption>
    </Table>
    {/* </Box>   */}
    </View>
  );
};

export default Crm;
 



