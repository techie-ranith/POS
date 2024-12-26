import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Modal, ScrollView, GestureResponderEvent } from 'react-native';

const Inventory = () => {
  const [items, setItems] = useState([
    { id: '1', name: 'Item A', stock: 10 },
    { id: '2', name: 'Item B', stock: 5 },
    { id: '3', name: 'Item C', stock: 20 },
  ]);
  const [searchText, setSearchText] = useState('');
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [isAddModalVisible, setAddModalVisible] = useState(false);
  const [newItem, setNewItem] = useState({ id: '', name: '', stock: '' });

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleEdit = (item:any) => {
    setCurrentItem(item);
    setEditModalVisible(true);
  };

  /*const handleSaveEdit = () => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === currentItem.id ? currentItem : item
      )
    );
    setEditModalVisible(false);
  };*/

  /*const handleDelete = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const handleAdd = () => {
    setItems([...items, { ...newItem, id: String(items.length + 1) }]);
    setNewItem({ id: '', name: '', stock: '' });
    setAddModalVisible(false);
  };*/

  const closeEditModal = () => {
    setEditModalVisible(false);
    setCurrentItem(null);
  };

  const closeAddModal = () => {
    setAddModalVisible(false);
    setNewItem({ id: '', name: '', stock: '' });
  };

  function handleDelete(id: string): void {
    throw new Error('Function not implemented.');
  }

  function handleAdd(event: GestureResponderEvent): void {
    throw new Error('Function not implemented.');
  }

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: '#f9f9f9' }}>
      {/* Search Bar and Add Button */}
      <View style={{ flexDirection: 'row', marginBottom: 16 }}>
        <TextInput
          placeholder="Search items"
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
          onPress={() => setAddModalVisible(true)}
          style={{
            marginLeft: 8,
            backgroundColor: '#4CAF50',
            padding: 10,
            borderRadius: 8,
          }}
        >
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>Add Item</Text>
        </TouchableOpacity>
      </View>

      {/* Items Table */}
      <ScrollView>
        <View>
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
            <Text style={{ flex: 1, fontWeight: 'bold' }}>ItemID</Text>
            <Text style={{ flex: 2, fontWeight: 'bold' }}>Item Name</Text>
            <Text style={{ flex: 1, fontWeight: 'bold' }}>Stock</Text>
            <Text style={{ flex: 2, fontWeight: 'bold' }}>Actions</Text>
          </View>

          {/* Table Rows */}
          {filteredItems.map((item) => (
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
              <Text style={{ flex: 1 }}>{item.stock}</Text>
              <View style={{ flex: 2, flexDirection: 'row' }}>
                <TouchableOpacity
                  onPress={() => handleEdit(item)}
                  style={{
                    marginRight: 8,
                    backgroundColor: '#FFA500',
                    padding: 6,
                    borderRadius: 4,
                  }}
                >
                  <Text style={{ color: '#fff' }}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleDelete(item.id)}
                  style={{
                    backgroundColor: '#FF0000',
                    padding: 6,
                    borderRadius: 4,
                  }}
                >
                  <Text style={{ color: '#fff' }}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Edit Modal */}
      <Modal visible={isEditModalVisible} transparent animationType="slide">
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
              backgroundColor: '#fff',
              padding: 20,
              borderRadius: 8,
            }}
          >
            <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>Edit Item</Text>
            <TextInput
              placeholder="Item Name"
              
              style={{
                backgroundColor: '#f0f0f0',
                padding: 10,
                borderRadius: 8,
                marginBottom: 10,
              }}
            />
            <TextInput
              placeholder="Stock"
              
              style={{
                backgroundColor: '#f0f0f0',
                padding: 10,
                borderRadius: 8,
                marginBottom: 10,
              }}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <TouchableOpacity
                onPress={handleEdit}
                style={{
                  backgroundColor: '#4CAF50',
                  padding: 10,
                  borderRadius: 8,
                  flex: 1,
                  marginRight: 10,
                }}
              >
                <Text style={{ color: '#fff', textAlign: 'center' }}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={closeEditModal}
                style={{
                  backgroundColor: '#FF0000',
                  padding: 10,
                  borderRadius: 8,
                  flex: 1,
                }}
              >
                <Text style={{ color: '#fff', textAlign: 'center' }}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Add Modal */}
      <Modal visible={isAddModalVisible} transparent animationType="slide">
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
              backgroundColor: '#fff',
              padding: 20,
              borderRadius: 8,
            }}
          >
            <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>Add Item</Text>
            <TextInput
              placeholder="Item Name"
              value={newItem.name}
              onChangeText={(text) => setNewItem({ ...newItem, name: text })}
              style={{
                backgroundColor: '#f0f0f0',
                padding: 10,
                borderRadius: 8,
                marginBottom: 10,
              }}
            />
            <TextInput
              placeholder="Stock"
              value={newItem.stock}
              keyboardType="numeric"
              
              style={{
                backgroundColor: '#f0f0f0',
                padding: 10,
                borderRadius: 8,
                marginBottom: 10,
              }}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <TouchableOpacity
                onPress={handleAdd}
                style={{
                  backgroundColor: '#4CAF50',
                  padding: 10,
                  borderRadius: 8,
                  flex: 1,
                  marginRight: 10,
                }}
              >
                <Text style={{ color: '#fff', textAlign: 'center' }}>Add</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={closeAddModal}
                style={{
                  backgroundColor: '#FF0000',
                  padding: 10,
                  borderRadius: 8,
                  flex: 1,
                }}
              >
                <Text style={{ color: '#fff', textAlign: 'center' }}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Inventory;
