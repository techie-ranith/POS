import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Alert, StyleSheet } from 'react-native';

type Item = {
  id: string;
  name: string;
  pricePerUnit: number;
  weight: number;
  totalPrice: number;
};

const BillingAndScale = () => {
  const [itemName, setItemName] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [itemWeight, setItemWeight] = useState('');
  const [items, setItems] = useState<Item[]>([]);

  const handleAddItem = () => {
    if (!itemName || !itemPrice || !itemWeight) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    const pricePerUnit = parseFloat(itemPrice);
    const weight = parseFloat(itemWeight);

    if (isNaN(pricePerUnit) || isNaN(weight)) {
      Alert.alert('Error', 'Price and weight must be numeric values.');
      return;
    }

    const totalPrice = pricePerUnit * weight;
    const newItem: Item = {
      id: Date.now().toString(),
      name: itemName,
      pricePerUnit,
      weight,
      totalPrice,
    };

    setItems((prevItems) => [...prevItems, newItem]);
    setItemName('');
    setItemPrice('');
    setItemWeight('');
  };

  const handleReset = () => {
    setItems([]);
  };

  const renderItem = ({ item }: { item: Item }) => (
    <View style={styles.itemRow}>
      <Text style={styles.itemText}>{item.name}</Text>
      <Text style={styles.itemText}>{item.pricePerUnit.toFixed(2)}</Text>
      <Text style={styles.itemText}>{item.weight.toFixed(2)}</Text>
      <Text style={styles.itemText}>{item.totalPrice.toFixed(2)}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Billing & Scale System</Text>

      {/* Input Fields */}
      <TextInput
        placeholder="Item Name"
        value={itemName}
        onChangeText={setItemName}
        style={styles.input}
      />
      <TextInput
        placeholder="Price per kg (Rs.)"
        value={itemPrice}
        onChangeText={setItemPrice}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        placeholder="Weight (kg)"
        value={itemWeight}
        onChangeText={setItemWeight}
        keyboardType="numeric"
        style={styles.input}
      />

      <TouchableOpacity onPress={handleAddItem} style={styles.addButton}>
        <Text style={styles.buttonText}>Add Item</Text>
      </TouchableOpacity>

      {/* Item List */}
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListHeaderComponent={() =>
          items.length > 0 && (
            <View style={styles.headerRow}>
              <Text style={styles.headerText}>Name</Text>
              <Text style={styles.headerText}>Price/kg</Text>
              <Text style={styles.headerText}>Weight</Text>
              <Text style={styles.headerText}>Total</Text>
            </View>
          )
        }
      />

      {/* Actions */}
      {items.length > 0 && (
        <TouchableOpacity onPress={handleReset} style={styles.resetButton}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
  },
  addButton: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemText: {
    flex: 1,
    textAlign: 'center',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 2,
    borderBottomColor: '#000',
  },
  headerText: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  resetButton: {
    backgroundColor: '#ff9800',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
});

export default BillingAndScale;
