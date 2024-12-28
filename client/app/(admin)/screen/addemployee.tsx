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

type Employee = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  address: string;
  contactNumber: string;
};

const EmployeeManagement = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [newEmployee, setNewEmployee] = useState<Employee>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: '',
    contactNumber: '',
  });
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const addEmployee = () => {
    const { name, email, password, confirmPassword, address, contactNumber } = newEmployee;

    if (name && email && password && confirmPassword && address && contactNumber) {
      if (password !== confirmPassword) {
        alert('Passwords do not match.');
        return;
      }

      if (editingIndex !== null) {
        const updatedEmployees = [...employees];
        updatedEmployees[editingIndex] = newEmployee;
        setEmployees(updatedEmployees);
        setEditingIndex(null);
      } else {
        setEmployees((prevEmployees) => [...prevEmployees, newEmployee]);
      }

      setNewEmployee({ name: '', email: '', password: '', confirmPassword: '', address: '', contactNumber: '' });
    } else {
      alert('Please fill in all fields.');
    }
  };

  const editEmployee = (index: number) => {
    setNewEmployee(employees[index]);
    setEditingIndex(index);
  };

  const deleteEmployee = (index: number) => {
    const updatedEmployees = employees.filter((_, i) => i !== index);
    setEmployees(updatedEmployees);
    if (editingIndex === index) {
      setNewEmployee({ name: '', email: '', password: '', confirmPassword: '', address: '', contactNumber: '' });
      setEditingIndex(null);
    }
  };

  const clearAllEmployees = () => {
    setEmployees([]);
    setNewEmployee({ name: '', email: '', password: '', confirmPassword: '', address: '', contactNumber: '' });
    setEditingIndex(null);
  };

  const caption = 'Employee Management';
  const headers = ['Name', 'Email', 'Address', 'Contact Number'];
  const data = employees.map((employee) => [employee.name, employee.email, employee.address, employee.contactNumber]);

  return (
    <View style={styles.container}>
      {/* Employee Management Section */}
      <View style={styles.card}>
        <Text style={styles.header}>Employee Management</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={newEmployee.name}
            onChangeText={(text) => setNewEmployee({ ...newEmployee, name: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={newEmployee.email}
            onChangeText={(text) => setNewEmployee({ ...newEmployee, email: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={newEmployee.password}
            secureTextEntry
            onChangeText={(text) => setNewEmployee({ ...newEmployee, password: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            value={newEmployee.confirmPassword}
            secureTextEntry
            onChangeText={(text) => setNewEmployee({ ...newEmployee, confirmPassword: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Address"
            value={newEmployee.address}
            onChangeText={(text) => setNewEmployee({ ...newEmployee, address: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Contact Number"
            value={newEmployee.contactNumber}
            keyboardType="numeric"
            onChangeText={(text) => {
              const numericText = text.replace(/[^0-9]/g, '');
              setNewEmployee({ ...newEmployee, contactNumber: numericText });
            }}
          />
          <TouchableOpacity style={styles.button} onPress={addEmployee}>
            <Text style={styles.buttonText}>
              {editingIndex !== null ? 'Update Employee' : 'Add Employee'}
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.scrollView}>
          {employees.length === 0 ? (
            <Text style={styles.noEmployeesText}>No employees found</Text>
          ) : (
            <FlatList
              data={employees}
              keyExtractor={(_, index) => index.toString()}
              renderItem={({ item, index }) => (
                <View style={styles.listItem}>
                  <View style={styles.listItemText}>
                    <Text style={styles.listItemField}>Name: {item.name}</Text>
                    <Text style={styles.listItemField}>Email: {item.email}</Text>
                    <Text style={styles.listItemField}>Address: {item.address}</Text>
                    <Text style={styles.listItemField}>Contact Number: {item.contactNumber}</Text>
                  </View>
                  <View style={styles.actionButtons}>
                    <TouchableOpacity
                      style={[styles.button, styles.editButton]}
                      onPress={() => editEmployee(index)}
                    >
                      <Text style={styles.buttonText}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.button, styles.deleteButton]}
                      onPress={() => deleteEmployee(index)}
                    >
                      <Text style={styles.buttonText}>Delete</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            />
          )}
        </ScrollView>
        {employees.length > 0 && (
          <TouchableOpacity style={[styles.button, styles.clearAllButton]} onPress={clearAllEmployees}>
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
  noEmployeesText: {
    textAlign: 'center',
    color: '#888',
    fontSize: 16,
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

export default EmployeeManagement;