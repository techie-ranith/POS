import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import TableComponent from '@/components/table';

type Customer = {
  name: string;
  email: string;
  phone: string;
};

const Crm = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [newCustomer, setNewCustomer] = useState<Customer>({ name: '', email: '', phone: '' });
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const addCustomer = () => {
    if (newCustomer.name && newCustomer.email && newCustomer.phone) {
      if (editingIndex !== null) {
        const updatedCustomers = [...customers];
        updatedCustomers[editingIndex] = newCustomer;
        setCustomers(updatedCustomers);
        setEditingIndex(null);
      } else {
        setCustomers((prevCustomers) => [...prevCustomers, newCustomer]);
      }
      setNewCustomer({ name: '', email: '', phone: '' });
    } else {
      alert('Please fill in all fields.');
    }
  };

  const editCustomer = (index: number) => {
    setNewCustomer(customers[index]);
    setEditingIndex(index);
  };

  const deleteCustomer = (index: number) => {
    const updatedCustomers = customers.filter((_, i) => i !== index);
    setCustomers(updatedCustomers);
    if (editingIndex === index) {
      setNewCustomer({ name: '', email: '', phone: '' });
      setEditingIndex(null);
    }
  };

  const clearAllCustomers = () => {
    setCustomers([]);
    setNewCustomer({ name: '', email: '', phone: '' });
    setEditingIndex(null);
  };

  const caption = 'Customer Management';
  const headers = ['Name', 'Email', 'Phone'];
  const data = customers.map((customer) => [customer.name, customer.email, customer.phone]);

  return (
    <View style={styles.container}>
      {/* Customer Management Section */}
      <View style={styles.card}>
        <Text style={styles.header}>Customer Management</Text>
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
            keyboardType="numeric"
            onChangeText={(text) => {
              const numericText = text.replace(/[^0-9]/g, '');
              setNewCustomer({ ...newCustomer, phone: numericText });
            }}
          />
          <TouchableOpacity style={styles.button} onPress={addCustomer}>
            <Text style={styles.buttonText}>
              {editingIndex !== null ? 'Update Customer' : 'Add Customer'}
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.scrollView}>
          {customers.length === 0 ? (
            <Text style={styles.noCustomersText}>No customers found</Text>
          ) : (
            <FlatList
              data={customers}
              keyExtractor={(_, index) => index.toString()}
              renderItem={({ item, index }) => (
                <View style={styles.listItem}>
                  <View style={styles.listItemText}>
                    <Text style={styles.listItemField}>Name: {item.name}</Text>
                    <Text style={styles.listItemField}>Email: {item.email}</Text>
                    <Text style={styles.listItemField}>Phone: {item.phone}</Text>
                  </View>
                  <View style={styles.actionButtons}>
                    <TouchableOpacity
                      style={[styles.button, styles.editButton]}
                      onPress={() => editCustomer(index)}
                    >
                      <Text style={styles.buttonText}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.button, styles.deleteButton]}
                      onPress={() => deleteCustomer(index)}
                    >
                      <Text style={styles.buttonText}>Delete</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            />
          )}
        </ScrollView>
        {customers.length > 0 && (
          <TouchableOpacity style={[styles.button, styles.clearAllButton]} onPress={clearAllCustomers}>
            <Text style={styles.buttonText}>Clear All</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* TableComponent Section */}
      <View style={styles.tableComponentContainer}>
        <TableComponent headers={headers} data={data} caption={caption} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  card: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    marginRight: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  clearAllButton: {
    backgroundColor: '#6c757d',
  },
  scrollView: {
    marginTop: 10,
  },
  listItem: {
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  listItemText: {
    flex: 3,
  },
  listItemField: {
    marginBottom: 5,
    fontSize: 14,
  },
  actionButtons: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
  },
  editButton: {
    backgroundColor: '#ffc107',
  },
  deleteButton: {
    backgroundColor: '#dc3545',
  },
  noCustomersText: {
    textAlign: 'center',
    color: '#888',
    fontSize: 16,
  },
  tableComponentContainer: {
    flex: 1,
    padding: 10,
  },
});

export default Crm;
