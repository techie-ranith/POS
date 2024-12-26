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

interface CrmProps {
  headers: string[];
  data: string[][];
  caption?: string;
}

const Crm: React.FC<CrmProps> = ({ headers, data, caption }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text className='text-xl font-bold'>Crm Screen</Text>
      <Table className="w-full border-2">
        {/* Render Table Headers */}
        <TableHeader>
          <TableRow>
            {headers.map((header, index) => (
              <TableHead key={index}>{header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>

        {/* Render Table Rows */}
        <TableBody>
          {data.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <TableData key={cellIndex}>{cell}</TableData>
              ))}
            </TableRow>
          ))}
        </TableBody>

        {/* Render Table Caption */}
        {caption && <TableCaption>{caption}</TableCaption>}
      </Table>
    </View>
  );
};

export default Crm;
