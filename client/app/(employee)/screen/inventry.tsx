import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

type Item = {
  name: string;
  category: string;
  quantity: number;
};

const Inventory = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [newItem, setNewItem] = useState<Item>({ name: '', category: '', quantity: 0 });

  const addItem = () => {
    if (newItem.name && newItem.category && newItem.quantity > 0) {
      setItems((prevItems) => [...prevItems, newItem]);
      setNewItem({ name: '', category: '', quantity: 0 });
    } else {
      alert('Please fill in all fields with valid data.');
    }
  };

  const deleteItem = (index: number) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  const clearAllItems = () => {
    setItems([]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.header}>Inventory Management</Text>

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
          <Button title="Add Item" onPress={addItem} color="#007BFF" />
        </View>

        <View style={styles.tableContainer}>
          <Text style={styles.tableHeader}>Inventory List</Text>
          {items.length === 0 ? (
            <Text style={styles.noItemsText}>No items found</Text>
          ) : (
            <>
              <FlatList
                data={items}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                  <View style={styles.tableRow}>
                    <Text style={styles.tableCell}>{item.name}</Text>
                    <Text style={styles.tableCell}>{item.category}</Text>
                    <Text style={styles.tableCell}>{item.quantity}</Text>
                    <TouchableOpacity onPress={() => deleteItem(index)}>
                      <Text style={styles.deleteButton}>Delete</Text>
                    </TouchableOpacity>
                  </View>
                )}
              />
              <Button title="Clear All" onPress={clearAllItems} color="#FF3B30" />
            </>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  card: {
    width: '95%', // Increased card width
    maxWidth: 500, // Increased max width
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 80, // Increased padding
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6, // Increased shadow radius
    elevation: 6, // Increased elevation
  },
  header: {
    fontSize: 28, // Increased font size
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 25, // Increased bottom margin
  },
  inputContainer: {
    marginBottom: 30, // Increased margin
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 14, // Increased padding
    borderRadius: 8, // Increased border radius
    backgroundColor: '#f9f9f9',
    marginBottom: 15, // Increased margin
    fontSize: 18, // Increased font size
  },
  tableContainer: {
    marginTop: 25, // Increased margin top
  },
  tableHeader: {
    fontSize: 24, // Increased font size
    fontWeight: 'bold',
    marginBottom: 15, // Increased bottom margin
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15, // Increased padding
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  tableCell: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16, // Increased font size
  },
  deleteButton: {
    color: '#FF3B30',
    fontWeight: 'bold',
    fontSize: 18, // Increased font size
  },
  noItemsText: {
    textAlign: 'center',
    fontSize: 18, // Increased font size
    color: '#888',
  },
});

export default Inventory;
