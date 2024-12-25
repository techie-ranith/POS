import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, ScrollView } from 'react-native';

type Item = {
  name: string;
  category: string;
  quantity: number;
};

const Inventory = () => {
  const [items, setItems] = useState<Item[]>([]); // State to store inventory items
  const [newItem, setNewItem] = useState<Item>({ name: '', category: '', quantity: 0 }); // State for new item input fields

  // Add a new item manually
  const addItem = () => {
    if (newItem.name && newItem.category && newItem.quantity > 0) {
      setItems((prevItems) => [...prevItems, newItem]);
      setNewItem({ name: '', category: '', quantity: 0 }); // Clear input fields
    } else {
      alert('Please fill in all fields with valid data.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Inventory Management</Text>

      {/* Input Fields to Add Item */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Item Name"
          value={newItem.name}
          onChangeText={(text) => setNewItem({ ...newItem, name: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Category"
          value={newItem.category}
          onChangeText={(text) => setNewItem({ ...newItem, category: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Quantity"
          value={newItem.quantity.toString()}
          keyboardType="numeric"
          onChangeText={(text) => setNewItem({ ...newItem, quantity: parseInt(text) || 0 })}
        />
        <Button title="Add Item" onPress={addItem} />
      </View>

      {/* Inventory Items Table */}
      <View style={styles.tableContainer}>
        <Text style={styles.tableHeader}>Inventory List</Text>
        {items.length === 0 ? (
          <Text>No items found</Text>
        ) : (
          <FlatList
            data={items}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.tableRow}>
                <Text style={styles.tableCell}>{item.name}</Text>
                <Text style={styles.tableCell}>{item.category}</Text>
                <Text style={styles.tableCell}>{item.quantity}</Text>
              </View>
            )}
          />
        )}
      </View>
    </ScrollView>
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
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    width: '100%',
  },
  tableContainer: {
    marginTop: 20,
  },
  tableHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  tableCell: {
    flex: 1,
    textAlign: 'center',
    fontSize: 14,
  },
});

export default Inventory;
