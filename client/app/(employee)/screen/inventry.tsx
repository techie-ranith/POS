import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import TableComponent from "@/components/table";

type Item = {
  name: string;
  category: string;
  quantity: number;
};

const Inventory = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [pendingItems, setPendingItems] = useState<Item[]>([]);
  const [newItem, setNewItem] = useState<Item>({ name: '', category: '', quantity: 0 });
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const addItem = () => {
    if (newItem.name && newItem.category && newItem.quantity > 0) {
      if (editingIndex !== null) {
        const updatedItems = [...pendingItems];
        updatedItems[editingIndex] = newItem;
        setPendingItems(updatedItems);
        setEditingIndex(null);
      } else {
        setPendingItems((prevItems) => [...prevItems, newItem]);
      }
      setNewItem({ name: '', category: '', quantity: 0 });
    } else {
      alert('Please fill in all fields with valid data.');
    }
  };

  const editItem = (index: number) => {
    setNewItem(pendingItems[index]);
    setEditingIndex(index);
  };

  const deleteItem = (index: number) => {
    const updatedItems = pendingItems.filter((_, i) => i !== index);
    setPendingItems(updatedItems);
  };

  const clearPendingItems = () => {
    setPendingItems([]);
  };

  const confirmChanges = async () => {
    if (pendingItems.length === 0) {
      alert("No items to confirm.");
      return;
    }

    try {
      const response = await fetch("https://example.com/api/inventory", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pendingItems),
      });

      if (response.ok) {
        setItems((prevItems) => [...prevItems, ...pendingItems]);
        setPendingItems([]);
        alert("Changes confirmed and data sent to the database!");
      } else {
        const errorData = await response.json();
        alert(`Failed to send data: ${errorData.message}`);
      }
    } catch (error) {
      alert(`An error occurred: $ {error.message}`);
    }
  };

  const clearAllItems = () => {
    setItems([]);
  };

  const caption = 'Inventory Screen';
  const headers = ['Item Name', 'Category', 'Quantity'];
  const data = items.map((item) => [item.name, item.category, item.quantity.toString()]);

  return (
    <View style={styles.container}>
      {/* Inventory Management Section */}
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
          <Button title={editingIndex !== null ? 'Update Item' : 'Add Item'} onPress={addItem} color="#007BFF" />
        </View>

        <View style={styles.tableContainer}>
          <Text style={styles.tableHeader}>Pending Inventory List</Text>
          {pendingItems.length === 0 ? (
            <Text style={styles.noItemsText}>No items found</Text>
          ) : (
            <ScrollView style={styles.scrollView}>
              <View style={styles.tableHeaderRow}>
                <Text style={styles.tableHeaderCell}>Item Name</Text>
                <Text style={styles.tableHeaderCell}>Category</Text>
                <Text style={styles.tableHeaderCell}>Quantity</Text>
                <Text style={styles.tableHeaderCell}>Actions</Text>
              </View>

              <FlatList
                data={pendingItems}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                  <View style={styles.tableRow}>
                    <Text style={styles.tableCell}>{item.name}</Text>
                    <Text style={styles.tableCell}>{item.category}</Text>
                    <Text style={styles.tableCell}>{item.quantity}</Text>
                    <View style={styles.actionButtons}>
                      <TouchableOpacity onPress={() => editItem(index)}>
                        <Text style={styles.editButton}>Edit</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => deleteItem(index)}>
                        <Text style={styles.deleteButton}>Delete</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              />
            </ScrollView>
          )}
          {pendingItems.length > 0 && (
            <Button title="Clear All" onPress={clearPendingItems} color="#FF3B30" />
          )}
        </View>

        {pendingItems.length > 0 && (
          <TouchableOpacity style={styles.confirmButton} onPress={confirmChanges}>
            <Text style={styles.confirmButtonText}>Confirm</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* TableComponent Section */}
      <View style={styles.tableComponentContainer}>
        <TableComponent headers={headers} data={data} caption={caption} />
        {items.length > 0 && (
          <TouchableOpacity style={styles.clearButton} onPress={clearAllItems}>
            <Text style={styles.clearButtonText}>Clear All</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  card: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 25,
  },
  inputContainer: {
    marginBottom: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 14,
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    marginBottom: 15,
    fontSize: 18,
  },
  tableContainer: {
    marginTop: 25,
    maxHeight: 250,
  },
  scrollView: {
    flexGrow: 0,
  },
  tableHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  tableHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#f0f0f0',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  tableHeaderCell: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  tableCell: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flex: 1,
  },
  editButton: {
    color: '#007BFF',
    fontWeight: 'bold',
    fontSize: 16,
    marginRight: 10,
  },
  deleteButton: {
    color: '#FF3B30',
    fontWeight: 'bold',
    fontSize: 16,
  },
  noItemsText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#888',
  },
  confirmButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#28A745',
    borderRadius: 8,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  tableComponentContainer: {
    flex: 1,
    padding: 10,
  },
  clearButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#FF3B30',
    borderRadius: 8,
    alignItems: 'center',
  },
  clearButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Inventory;
