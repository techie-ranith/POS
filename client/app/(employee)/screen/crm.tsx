import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, ScrollView } from 'react-native';

// Define a type for the customer object
type Customer = {
  name: string;
  email: string;
  phone: string;
};

const Crm = () => {
  const [customers, setCustomers] = useState<Customer[]>([]); // Type the state as an array of Customer
  const [newCustomer, setNewCustomer] = useState<Customer>({ name: '', email: '', phone: '' }); // Type for new customer input

  // Fetch customer data from API and update table
  const fetchCustomersFromApi = async () => {
    try {
      const response = await fetch('https://your-api-route.com/customers'); // Replace with your API endpoint
      const data: Customer[] = await response.json(); // Cast data to type Customer[]
      setCustomers((prevCustomers) => [...prevCustomers, ...data]);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  // Add a new customer manually
  const addCustomer = () => {
    if (newCustomer.name && newCustomer.email && newCustomer.phone) {
      setCustomers((prevCustomers) => [...prevCustomers, newCustomer]);
      setNewCustomer({ name: '', email: '', phone: '' }); // Clear input fields
    } else {
      alert('Please fill in all fields.');
    }
  };

  useEffect(() => {
    fetchCustomersFromApi(); // Fetch initial data on component mount
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>CRM - Customer Management</Text>

      {/* Input Fields to Add Customer */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={newCustomer.name}
          onChangeText={(text) => setNewCustomer({ ...newCustomer, name: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={newCustomer.email}
          onChangeText={(text) => setNewCustomer({ ...newCustomer, email: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone"
          value={newCustomer.phone}
          onChangeText={(text) => setNewCustomer({ ...newCustomer, phone: text })}
        />
        <Button title="Add Customer" onPress={addCustomer} />
      </View>

      {/* Customer Details Table */}
      <View style={styles.tableContainer}>
        <Text style={styles.tableHeader}>Customer List</Text>
        {customers.length === 0 ? (
          <Text>No customers found</Text>
        ) : (
          <FlatList
            data={customers}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.tableRow}>
                <Text style={styles.tableCell}>{item.name}</Text>
                <Text style={styles.tableCell}>{item.email}</Text>
                <Text style={styles.tableCell}>{item.phone}</Text>
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

export default Crm;
