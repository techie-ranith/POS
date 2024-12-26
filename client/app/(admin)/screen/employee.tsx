import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Button,
  Alert,
} from 'react-native';

type Employee = {
  id: string;
  name: string;
  position: string;
  department: string;
  email: string;
  phone: string;
};

const EmployeePage = () => {
  const [employees, setEmployees] = useState<Employee[]>([
    { id: '1', name: 'John Doe', position: 'Manager', department: 'Sales', email: 'john@example.com', phone: '123-456-7890' },
    { id: '2', name: 'Jane Smith', position: 'Developer', department: 'IT', email: 'jane@example.com', phone: '987-654-3210' },
  ]);

  const [searchText, setSearchText] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [newEmployee, setNewEmployee] = useState<Employee>({
    id: '',
    name: '',
    position: '',
    department: '',
    email: '',
    phone: '',
  });

  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleSelectEmployee = (employee: Employee) => {
    setSelectedEmployee({ ...employee });
    setIsModalVisible(true);
  };

  const handleSave = () => {
    if (selectedEmployee) {
      setEmployees((prev) =>
        prev.map((emp) => (emp.id === selectedEmployee.id ? selectedEmployee : emp))
      );
      setIsModalVisible(false);
    }
  };

  const handleDelete = (id: string) => {
    if (!id) {
      Alert.alert('Error', 'No employee selected for deletion.');
      return;
    }
  
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete this employee?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setEmployees((prev) => {
              const updatedList = prev.filter((emp) => emp.id !== id);
              console.log('Updated Employees List:', updatedList);
              return updatedList;
            });
            setIsModalVisible(false); // Ensure the modal closes after deletion
          },
        },
      ]
    );
  };
  
  
  const handleAddEmployee = () => {
    if (newEmployee.name && newEmployee.position && newEmployee.department) {
      setEmployees((prev) => [
        ...prev,
        { ...newEmployee, id: (prev.length + 1).toString() },
      ]);
      setNewEmployee({ id: '', name: '', position: '', department: '', email: '', phone: '' });
      setIsAddModalVisible(false);
    } else {
      Alert.alert('Error', 'Please fill out all required fields (name, position, department).');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Employee Management</Text>
      <TextInput
        style={styles.searchBar}
        placeholder="Search for an employee..."
        value={searchText}
        onChangeText={setSearchText}
      />

      <FlatList
        data={filteredEmployees}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.employeeCard} onPress={() => handleSelectEmployee(item)}>
            <Text style={styles.employeeName}>{item.name}</Text>
            <Text style={styles.employeePosition}>{item.position}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={styles.noEmployeesText}>No employees found</Text>}
      />

      <Button title="Add Employee" onPress={() => setIsAddModalVisible(true)} />

      <Modal visible={isModalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedEmployee && (
              <>
                <Text style={styles.modalHeader}>Employee Details</Text>
                <TextInput
                  style={styles.input}
                  value={selectedEmployee.name}
                  onChangeText={(text) =>
                    setSelectedEmployee((prev) => (prev ? { ...prev, name: text } : prev))
                  }
                  placeholder="Name"
                />
                <TextInput
                  style={styles.input}
                  value={selectedEmployee.position}
                  onChangeText={(text) =>
                    setSelectedEmployee((prev) => (prev ? { ...prev, position: text } : prev))
                  }
                  placeholder="Position"
                />
                <TextInput
                  style={styles.input}
                  value={selectedEmployee.department}
                  onChangeText={(text) =>
                    setSelectedEmployee((prev) => (prev ? { ...prev, department: text } : prev))
                  }
                  placeholder="Department"
                />
                <TextInput
                  style={styles.input}
                  value={selectedEmployee.email}
                  onChangeText={(text) =>
                    setSelectedEmployee((prev) => (prev ? { ...prev, email: text } : prev))
                  }
                  placeholder="Email"
                />
                <TextInput
                  style={styles.input}
                  value={selectedEmployee.phone}
                  onChangeText={(text) =>
                    setSelectedEmployee((prev) => (prev ? { ...prev, phone: text } : prev))
                  }
                  placeholder="Phone"
                />
                <View style={styles.modalActions}>
                  <Button title="Save" onPress={handleSave} />
                  <Button title="Cancel" color="#FF3B30" onPress={() => setIsModalVisible(false)} />
                  <Button
                    title="Delete"
                    color="#FF3B30"
                    onPress={() => handleDelete(selectedEmployee?.id || '')}
                    />


                </View>
              </>
            )}
          </View>
        </View>
      </Modal>

      <Modal visible={isAddModalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>Add New Employee</Text>
            <TextInput
              style={styles.input}
              value={newEmployee.name}
              onChangeText={(text) => setNewEmployee((prev) => ({ ...prev, name: text }))}
              placeholder="Name"
            />
            <TextInput
              style={styles.input}
              value={newEmployee.position}
              onChangeText={(text) => setNewEmployee((prev) => ({ ...prev, position: text }))}
              placeholder="Position"
            />
            <TextInput
              style={styles.input}
              value={newEmployee.department}
              onChangeText={(text) => setNewEmployee((prev) => ({ ...prev, department: text }))}
              placeholder="Department"
            />
            <TextInput
              style={styles.input}
              value={newEmployee.email}
              onChangeText={(text) => setNewEmployee((prev) => ({ ...prev, email: text }))}
              placeholder="Email"
            />
            <TextInput
              style={styles.input}
              value={newEmployee.phone}
              onChangeText={(text) => setNewEmployee((prev) => ({ ...prev, phone: text }))}
              placeholder="Phone"
            />
            <View style={styles.modalActions}>
              <Button title="Add" onPress={handleAddEmployee} />
              <Button
                title="Cancel"
                color="#FF3B30"
                onPress={() => setIsAddModalVisible(false)}
              />
            </View>
          </View>
        </View>
      </Modal>
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
    marginBottom: 10,
    textAlign: 'center',
  },
  searchBar: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  employeeCard: {
    padding: 15,
    borderRadius: 8,
    backgroundColor: '#fff',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  employeeName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  employeePosition: {
    fontSize: 16,
    color: '#555',
  },
  noEmployeesText: {
    textAlign: 'center',
    color: '#888',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    margin: 20,
    padding: 20,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  modalHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default EmployeePage;
