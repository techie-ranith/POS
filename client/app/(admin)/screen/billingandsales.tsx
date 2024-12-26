import React, { JSXElementConstructor, ReactElement, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Alert, StyleSheet, ListRenderItemInfo, GestureResponderEvent } from 'react-native';

const BillingAndScale = () => {
  const [itemName, setItemName] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [itemWeight, setItemWeight] = useState('');
  const [items, setItems] = useState([]);

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
    const newItem = {
      id: Date.now().toString(),
      name: itemName,
      pricePerUnit,
      weight,
      totalPrice,
    };

    
  };

  

  const handleReset = () => {
    setItems([]);
  };

  

  function renderItem(info: ListRenderItemInfo<never>): ReactElement<any, string | JSXElementConstructor<any>> | null {
    throw new Error('Function not implemented.');
  }

  function handleFinalize(event: GestureResponderEvent): void {
    throw new Error('Function not implemented.');
  }

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
        
        renderItem={renderItem}
        ListHeaderComponent={() =>
          items.length > 0 && (
            <View style={styles.headerRow}>
              <Text style={styles.headerText}>Name</Text>
              <Text style={styles.headerText}>Price/kg</Text>
              <Text style={styles.headerText}>Weight</Text>
              <Text style={styles.headerText}>Total</Text>
              <Text style={styles.headerText}></Text>
            </View>
          )
        }
      />

      {/* Actions */}
      {items.length > 0 && (
        <View style={styles.actionsRow}>
          <TouchableOpacity onPress={handleReset} style={styles.resetButton}>
            <Text style={styles.buttonText}>Reset</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleFinalize} style={styles.finalizeButton}>
            <Text style={styles.buttonText}>Finalize</Text>
          </TouchableOpacity>
        </View>
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
  deleteButton: {
    backgroundColor: '#f44336',
    padding: 8,
    borderRadius: 8,
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
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  resetButton: {
    backgroundColor: '#ff9800',
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginRight: 8,
    alignItems: 'center',
  },
  finalizeButton: {
    backgroundColor: '#2196F3',
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginLeft: 8,
    alignItems: 'center',
  },
});

export default BillingAndScale;
