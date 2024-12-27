import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

const DiscountPage = () => {
  const [discounts, setDiscounts] = useState([
    { id: 1, type: 'Percentage', productName: 'Product A', price: 100, discount: 10 },
    { id: 2, type: 'Flat Amount', productName: 'Product B', price: 150, discount: 20 },
    { id: 3, type: 'Percentage', productName: 'Product C', price: 200, discount: 0 },
  ]);
  const [selectedDiscountType, setSelectedDiscountType] = useState('Percentage');
  const [newDiscountValue, setNewDiscountValue] = useState('');
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);

  // States for adding new items
  const [newProductName, setNewProductName] = useState('');
  const [newProductPrice, setNewProductPrice] = useState('');
  const [newItemDiscountType, setNewItemDiscountType] = useState('Percentage');
  const [newItemDiscountValue, setNewItemDiscountValue] = useState('');

  const discountTypes = ['Percentage', 'Flat Amount', 'Buy one Get one'];

  const handleApplyDiscount = () => {
    if (selectedItemId !== null && newDiscountValue !== '') {
      setDiscounts((prevDiscounts) =>
        prevDiscounts.map((discount) =>
          discount.id === selectedItemId
            ? { ...discount, type: selectedDiscountType, discount: parseFloat(newDiscountValue) }
            : discount
        )
      );
      resetForm();
    }
  };

  const handleAddNewItem = () => {
    if (newProductName && newProductPrice && newItemDiscountValue) {
      const newItem = {
        id: discounts.length + 1,
        type: newItemDiscountType,
        productName: newProductName,
        price: parseFloat(newProductPrice),
        discount: parseFloat(newItemDiscountValue),
      };
      setDiscounts([...discounts, newItem]);
      resetNewItemForm();
    }
  };

  const resetForm = () => {
    setSelectedDiscountType('Percentage');
    setNewDiscountValue('');
    setSelectedItemId(null);
  };

  const resetNewItemForm = () => {
    setNewProductName('');
    setNewProductPrice('');
    setNewItemDiscountType('Percentage');
    setNewItemDiscountValue('');
  };

  return (
    <ScrollView style={styles.container}>
      {/* Add New Item Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Add New Item</Text>
        <TextInput
          placeholder="Product Name"
          value={newProductName}
          onChangeText={setNewProductName}
          style={styles.input}
        />
        <TextInput
          placeholder="Price"
          value={newProductPrice}
          onChangeText={setNewProductPrice}
          keyboardType="numeric"
          style={styles.input}
        />
        <TextInput
          placeholder="Discount Value"
          value={newItemDiscountValue}
          onChangeText={setNewItemDiscountValue}
          keyboardType="numeric"
          style={styles.input}
        />
        <TouchableOpacity
          onPress={handleAddNewItem}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Add Item</Text>
        </TouchableOpacity>
      </View>

      {/* Discount Type Selection */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Select Discount Type</Text>
        <View style={styles.cardsContainer}>
          {discountTypes.map((type) => (
            <TouchableOpacity
              key={type}
              onPress={() => setSelectedDiscountType(type)}
              style={[
                styles.card,
                selectedDiscountType === type && styles.selectedCard,
              ]}
            >
              <Text style={styles.cardText}>{type}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Discount Value Input */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Discount Value</Text>
        <TextInput
          placeholder="Enter Discount"
          value={newDiscountValue}
          onChangeText={setNewDiscountValue}
          keyboardType="numeric"
          style={styles.input}
        />
      </View>

      {/* Product Table */}
      <View style={styles.tableContainer}>
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderText}>ID</Text>
          <Text style={styles.tableHeaderText}>Type</Text>
          <Text style={styles.tableHeaderText}>Product</Text>
          <Text style={styles.tableHeaderText}>Price</Text>
          <Text style={styles.tableHeaderText}>Discount</Text>
          <Text style={styles.tableHeaderText}>Actions</Text>
        </View>
        {discounts.map((discount) => (
          <View key={discount.id} style={styles.tableRow}>
            <Text style={styles.tableText}>{discount.id}</Text>
            <Text style={styles.tableText}>{discount.type}</Text>
            <Text style={styles.tableText}>{discount.productName}</Text>
            <Text style={styles.tableText}>${discount.price.toFixed(2)}</Text>
            <Text style={styles.tableText}>{discount.discount}%</Text>
            <TouchableOpacity
              onPress={() => setSelectedItemId(discount.id)}
              style={styles.actionButton}
            >
              <Text style={styles.actionButtonText}>Select</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {/* Apply Discount Button */}
      <TouchableOpacity
        onPress={handleApplyDiscount}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Apply Discount</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
  },
  cardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    flex: 1,
    padding: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    margin: 4,
    alignItems: 'center',
  },
  selectedCard: {
    backgroundColor: '#4CAF50',
  },
  cardText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  tableContainer: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    borderRadius: 8,
  },
  tableHeader: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: '#f0f0f0',
  },
  tableHeaderText: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  tableRow: {
    flexDirection: 'row',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tableText: {
    flex: 1,
    textAlign: 'center',
  },
  actionButton: {
    backgroundColor: '#4CAF50',
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  actionButtonText: {
    color: 'white',
  },
});

export default DiscountPage;
