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
    <View style={styles.screen}>
      <View style={styles.card}>
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
          <TouchableOpacity style={styles.addButton} onPress={addItem}>
            <Text style={styles.addButtonText}>Add Item</Text>
          </TouchableOpacity>
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
          <Text style={styles.totalText}>Total: LKR {calculateTotal()}</Text>
          <TouchableOpacity style={styles.clearButton} onPress={clearAll}>
            <Text style={styles.clearButtonText}>Clear All</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
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
    backgroundColor: '#f9f9f9',
  },
  addButton: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
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
    alignItems: 'center',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  clearButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
  clearButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default BillingandSale;
