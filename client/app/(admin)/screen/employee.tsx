
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, Modal, Button } from 'react-native';

const Employee = () => {
  const [employees, setEmployees] = useState([
    {
      id: '1',
      name: 'John Doe',
      address: '123 Main St',
      email: 'john@example.com',
      sales: 10,
      contact: '123-456-7890',
    },
    {
      id: '2',
      name: 'Jane Smith',
      address: '456 Elm St',
      email: 'jane@example.com',
      sales: 15,
      contact: '987-654-3210',
    },
    // Add more employees if necessary
  ]);
  const [searchText, setSearchText] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);

  const addEmployee = () => {
    const newEmployee = {
      id: (employees.length + 1).toString(),
      name: 'New Employee',
      address: 'New Address',
      email: 'new@example.com',
      sales: 0,
      contact: '000-000-0000',
    };
    setEmployees([...employees, newEmployee]);
  };

  const deleteEmployee = (id:any) => {
    Alert.alert('Confirm Deletion', 'Are you sure you want to delete this employee?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        onPress: () => setEmployees(employees.filter((employee) => employee.id !== id)),
      },
    ]);
  };

  const editEmployee = (id:any) => {
    const employee = employees.find((emp) => emp.id === id);
    //setEditingEmployee({ ...employee });
    setIsModalVisible(true);
  };

  const handleSave = () => {
    
    
  };

  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: '#f9f9f9' }}>
      {/* Search Bar and Add Button */}
      <View style={{ flexDirection: 'row', marginBottom: 16 }}>
        <TextInput
          placeholder="Search by name"
          value={searchText}
          onChangeText={setSearchText}
          style={{
            flex: 1,
            backgroundColor: '#fff',
            padding: 10,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: '#ccc',
          }}
        />
        <TouchableOpacity
          onPress={addEmployee}
          style={{
            marginLeft: 8,
            backgroundColor: '#4CAF50',
            padding: 10,
            borderRadius: 8,
          }}
        >
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>Add</Text>
        </TouchableOpacity>
      </View>

      {/* Employee Table */}
      <ScrollView contentContainerStyle={{ flex: 1 }}>
        {/* Table Header */}
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: '#ddd',
            padding: 8,
            borderRadius: 8,
            marginBottom: 8,
          }}
        >
          <Text style={{ flex: 1, fontWeight: 'bold' }}>ID</Text>
          <Text style={{ flex: 2, fontWeight: 'bold' }}>Name</Text>
          <Text style={{ flex: 2, fontWeight: 'bold' }}>Address</Text>
          <Text style={{ flex: 2, fontWeight: 'bold' }}>Email</Text>
          <Text style={{ flex: 1, fontWeight: 'bold' }}>Sales</Text>
          <Text style={{ flex: 2, fontWeight: 'bold' }}>Contact</Text>
          <Text style={{ flex: 2, fontWeight: 'bold' }}>Actions</Text>
        </View>

        {/* Table Rows */}
        {filteredEmployees.map((item) => (
          <View
            key={item.id}
            style={{
              flexDirection: 'row',
              padding: 8,
              borderBottomWidth: 1,
              borderColor: '#ccc',
              backgroundColor: '#fff',
            }}
          >
            <Text style={{ flex: 1 }}>{item.id}</Text>
            <Text style={{ flex: 2 }}>{item.name}</Text>
            <Text style={{ flex: 2 }}>{item.address}</Text>
            <Text style={{ flex: 2 }}>{item.email}</Text>
            <Text style={{ flex: 1 }}>{item.sales}</Text>
            <Text style={{ flex: 2 }}>{item.contact}</Text>
            <View style={{ flex: 2, flexDirection: 'row' }}>
              <TouchableOpacity
                onPress={() => editEmployee(item.id)}
                style={{
                  backgroundColor: '#FF9800',
                  padding: 8,
                  borderRadius: 8,
                  marginRight: 8,
                }}
              >
                <Text style={{ color: '#fff', fontWeight: 'bold' }}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => deleteEmployee(item.id)}
                style={{
                  backgroundColor: '#F44336',
                  padding: 8,
                  borderRadius: 8,
                }}
              >
                <Text style={{ color: '#fff', fontWeight: 'bold' }}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Edit Modal */}
      {!editingEmployee && (
        <Modal
          visible={isModalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setIsModalVisible(true)}
        >
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            }}
          >
            <View
              style={{
                width: '80%',
                padding: 16,
                backgroundColor: '#fff',
                borderRadius: 8,
              }}
            >
              <Text>Edit Employee</Text>
              <TextInput
                placeholder="Name"
            
                style={{
                  backgroundColor: '#f0f0f0',
                  padding: 8,
                  borderRadius: 8,
                  marginBottom: 8,
                }}
              />
              <TextInput
                placeholder="Address"
                
                style={{
                  backgroundColor: '#f0f0f0',
                  padding: 8,
                  borderRadius: 8,
                  marginBottom: 8,
                }}
              />
              <TextInput
                placeholder="Email"
                
                style={{
                  backgroundColor: '#f0f0f0',
                  padding: 8,
                  borderRadius: 8,
                  marginBottom: 8,
                }}
              />
              <TextInput
                placeholder="Sales"
                
                keyboardType="numeric"
                style={{
                  backgroundColor: '#f0f0f0',
                  padding: 8,
                  borderRadius: 8,
                  marginBottom: 8,
                }}
              />
              <TextInput
                placeholder="Contact"
               
                style={{
                  backgroundColor: '#f0f0f0',
                  padding: 8,
                  borderRadius: 8,
                  marginBottom: 8,
                }}
              />
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Button title="Cancel" onPress={() => setIsModalVisible(false)} />
                <Button title="Save" onPress={handleSave} />
              </View>
            </View>
          </View>
        </Modal>
      )}


 



