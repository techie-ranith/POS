import React from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, Alert } from 'react-native';

interface Item {
  name: string;
  price: number;
  quantity: number;
}

const BillingandSale: React.FC = () => {
  const [items, setItems] = React.useState<Item[]>([]);
  const [itemName, setItemName] = React.useState('');
  const [itemPrice, setItemPrice] = React.useState('');
  const [itemQuantity, setItemQuantity] = React.useState('');
  const [invoice, setInvoice] = React.useState<any>(null); // To store the invoice data
  const [editIndex, setEditIndex] = React.useState<number | null>(null); // To track which item is being edited

  const handlePriceChange = (text: string) => {
    const numericValue = text.replace(/[^0-9.]/g, '');
    if (!numericValue.includes('.') || numericValue.match(/\./g)?.length === 1) {
      setItemPrice(numericValue);
    }
  };

  const handleQuantityChange = (text: string) => {
    const numericValue = text.replace(/[^0-9]/g, ''); // Only allow numbers
    setItemQuantity(numericValue);
  };

  const addItem = () => {
    if (itemName && itemPrice && itemQuantity) {
      const newItem = { name: itemName, price: parseFloat(itemPrice), quantity: parseInt(itemQuantity, 10) };
      if (editIndex !== null) {
        // Edit existing item
        const updatedItems = [...items];
        updatedItems[editIndex] = newItem;
        setItems(updatedItems);
        setEditIndex(null); // Reset edit mode
      } else {
        // Add new item
        setItems([...items, newItem]);
      }
      setItemName('');
      setItemPrice('');
      setItemQuantity('');
    }
  };

  const deleteItem = (index: number) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  const editItem = (index: number) => {
    const item = items[index];
    setItemName(item.name);
    setItemPrice(item.price.toString());
    setItemQuantity(item.quantity.toString());
    setEditIndex(index); // Set the index of the item being edited
  };

  const clearAll = () => {
    setItems([]);
    setInvoice(null); // Clear invoice data as well
  };

  const calculateTotal = () => {
    return items
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const confirmSale = async () => {
    if (items.length === 0) {
      Alert.alert('Error', 'No items to confirm!');
      return;
    }

    // Create an invoice object
    const invoiceData = {
      items,
      total: calculateTotal(),
      date: new Date().toLocaleString(),
    };

    setInvoice(invoiceData); // Set the invoice state

    // Optionally, send the invoice data to a server for PDF generation or email
    const apiUrl = 'https://your-api-endpoint.com/sales';

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items }),
      });

      if (response.ok) {
        Alert.alert('Success', 'Sale confirmed successfully!');
        clearAll(); // Clear the items after confirmation
      } else {
        Alert.alert('Error', 'Failed to confirm the sale. Please try again.');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while confirming the sale.');
    }
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
          <TextInput
            style={styles.input}
            placeholder="Quantity"
            value={itemQuantity}
            onChangeText={handleQuantityChange}
            keyboardType="numeric"
          />
          <TouchableOpacity style={styles.addButton} onPress={addItem}>
            <Text style={styles.addButtonText}>{editIndex !== null ? 'Update Item' : 'Add Item'}</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={items}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.listItem}>
              <Text style={styles.listText}>{item.name}</Text>
              <Text style={styles.listText}>
                LKR {item.price.toFixed(2)} x {item.quantity} = LKR{' '}
                {(item.price * item.quantity).toFixed(2)}
              </Text>
              <View style={styles.itemButtons}>
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

        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Total: LKR {calculateTotal()}</Text>
          <TouchableOpacity style={styles.clearButton} onPress={clearAll}>
            <Text style={styles.clearButtonText}>Clear All</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.confirmButton} onPress={confirmSale}>
          <Text style={styles.confirmButtonText}>Confirm</Text>
        </TouchableOpacity>
      </View>

      {invoice && (
        <View style={styles.invoiceContainer}>
          <Text style={styles.invoiceHeader}>Invoice</Text>
          <Text>Date: {invoice.date}</Text>
          {invoice.items.map((item: Item, index: number) => (
            <Text key={index}>
              {item.name} - LKR {item.price.toFixed(2)} x {item.quantity} = LKR{' '}
              {(item.price * item.quantity).toFixed(2)}
            </Text>
          ))}
          <Text style={styles.invoiceTotal}>Total: LKR {invoice.total}</Text>
        </View>
      )}
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
  itemButtons: {
    flexDirection: 'row',
  },
  editButton: {
    color: 'blue',
    fontSize: 14,
    marginRight: 10,
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
  confirmButton: {
    backgroundColor: 'green',
    padding: 15,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  invoiceContainer: {
    marginTop: 20,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    width: '90%',
  },
  invoiceHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  invoiceTotal: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
  },
});

export default BillingandSale;
