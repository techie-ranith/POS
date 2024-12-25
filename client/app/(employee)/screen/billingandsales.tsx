import React from 'react';
import { View, Text, StyleSheet, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';

interface Item {
  name: string;
  price: number;
}

const BillingandSale: React.FC = () => {
  const [items, setItems] = React.useState<Item[]>([]);
  const [itemName, setItemName] = React.useState('');
  const [itemPrice, setItemPrice] = React.useState('');

  const handlePriceChange = (text: string) => {
    // Validate input to allow only numbers and a single decimal point
    const numericValue = text.replace(/[^0-9.]/g, '');
    if (!numericValue.includes('.') || numericValue.match(/\./g)?.length === 1) {
      setItemPrice(numericValue);
    }
  };

  const addItem = () => {
    if (itemName && itemPrice) {
      setItems([...items, { name: itemName, price: parseFloat(itemPrice) }]);
      setItemName('');
      setItemPrice('');
    }
  };

  const deleteItem = (index: number) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  const clearAll = () => {
    setItems([]);
  };

  const calculateTotal = () => {
    return items.reduce((total, item) => total + item.price, 0).toFixed(2);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Billing and Sale</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Item Name"
          value={itemName}
          onChangeText={setItemName}
        />
        <TextInput
          style={styles.input}
          placeholder="Item Price"
          value={itemPrice}
          onChangeText={handlePriceChange}
          keyboardType="numeric"
        />
        <Button title="Add Item" onPress={addItem} />
      </View>

      <FlatList
        data={items}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.listItem}>
            <Text style={styles.listText}>{item.name}</Text>
            <Text style={styles.listText}>{item.price.toFixed(2)}</Text>
            <TouchableOpacity onPress={() => deleteItem(index)}>
              <Text style={styles.deleteButton}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total: ${calculateTotal()}</Text>
        <Button title="Clear All" onPress={clearAll} color="red" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
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
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  listText: {
    fontSize: 16,
  },
  deleteButton: {
    color: 'red',
    fontSize: 14,
  },
  totalContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#ddd',
    borderRadius: 5,
    alignItems: 'center',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default BillingandSale;
