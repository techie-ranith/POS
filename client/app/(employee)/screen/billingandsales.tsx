import React from 'react';
import { View, Text, StyleSheet, TextInput, Button, FlatList } from 'react-native';

const BillingandSale = () => {
  const [items, setItems] = React.useState([]);
  const [itemName, setItemName] = React.useState('');
  const [itemPrice, setItemPrice] = React.useState('');

  const addItem = () => {
    if (itemName && itemPrice) {
      setItems([...items, { name: itemName, price: parseFloat(itemPrice) }]);
      setItemName('');
      setItemPrice('');
    }
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
          onChangeText={setItemPrice}
          keyboardType="numeric"
        />
        <Button title="Add Item" onPress={addItem} />
      </View>

      <FlatList
        data={items}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text style={styles.listText}>{item.name}</Text>
            <Text style={styles.listText}>{item.price.toFixed(2)}</Text>
          </View>
        )}
      />

      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total: LKR {calculateTotal()}</Text>
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
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  listText: {
    fontSize: 16,
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
  },
});

export default BillingandSale;
