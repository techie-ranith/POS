import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, FlatList } from 'react-native';

const DiscountPage = () => {
  const [discounts, setDiscounts] = useState([
    { id: 1, type: 'Percentage', productName: 'Product A', price: 100, discount: 10 },
    { id: 2, type: 'Flat Amount', productName: 'Product B', price: 150, discount: 20 },
    { id: 3, type: 'Percentage', productName: 'Product C', price: 200, discount: 0 },
  ]);
  const [selectedDiscount, setSelectedDiscount] = useState(null);
  const [newDiscount, setNewDiscount] = useState('');
  const [newDiscountType, setNewDiscountType] = useState('Percentage');
  const [isEditing, setIsEditing] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const discountTypes = ['Percentage', 'Flat Amount'];

  const handleEditDiscount = (discount:any) => {
    setSelectedDiscount(discount);
    setNewDiscount(discount.discount.toString());
    setNewDiscountType(discount.type);
    setIsEditing(true);
  };

  

  const handleRemoveDiscount = (discountId:any) => {
    setDiscounts((prevDiscounts) =>
      prevDiscounts.map((discount) =>
        discount.id === discountId ? { ...discount, discount: 0 } : discount
      )
    );
  };

  const renderDropdown = () => {
    if (!dropdownVisible) return null;

    return (
      <View className="absolute top-12 left-0 bg-white border rounded-md shadow-lg z-10">
        {discountTypes.map((type) => (
          <TouchableOpacity
            key={type}
            onPress={() => {
              setNewDiscountType(type);
              setDropdownVisible(false);
            }}
            className="px-4 py-2 hover:bg-gray-200"
          >
            <Text>{type}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <View style={{ padding: 16, backgroundColor: '#f9f9f9', flex: 1 }}>
      

      {/* Product Table */}
      <View className="bg-white shadow-md rounded-lg">
        <View className="flex flex-row p-4 bg-gray-200 font-bold">
          <Text className="flex-1 text-center">Discount ID</Text>
          <Text className="flex-1 text-center">Discount Type</Text>
          <Text className="flex-1 text-center">Product Name</Text>
          <Text className="flex-1 text-center">Price</Text>
          <Text className="flex-1 text-center">Discount</Text>
          <Text className="flex-1 text-center">Actions</Text>
        </View>
        {discounts.map((discount) => (
          <View key={discount.id} className="flex flex-row p-4 border-b">
            <Text className="flex-1 text-center">{discount.id}</Text>
            <Text className="flex-1 text-center">{discount.type}</Text>
            <Text className="flex-1 text-center">{discount.productName}</Text>
            <Text className="flex-1 text-center">${discount.price.toFixed(2)}</Text>
            <Text className="flex-1 text-center">{discount.discount}%</Text>
            <View className="flex-1 flex flex-row justify-center space-x-2">
              <TouchableOpacity
                onPress={() => handleEditDiscount(discount)}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              >
                <Text>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleRemoveDiscount(discount.id)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
              >
                <Text>Remove</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>

      {/* Edit Discount Modal */}
      <Modal
        transparent={true}
        visible={isEditing}
        animationType="slide"
        onRequestClose={() => setIsEditing(false)}
      >
        <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
          <View className="bg-white p-6 rounded-lg w-80 relative">
            

            {/* Custom Dropdown for Discount Type */}
            <Text className="font-semibold mb-2">Discount Type</Text>
            <TouchableOpacity
              onPress={() => setDropdownVisible(!dropdownVisible)}
              className="border p-2 rounded-md mb-4 relative"
            >
              <Text>{newDiscountType}</Text>
            </TouchableOpacity>
            {renderDropdown()}

            {/* Discount Value Input */}
            <Text className="font-semibold mb-2">Discount Value</Text>
            <TextInput
              value={newDiscount}
              onChangeText={setNewDiscount}
              keyboardType="numeric"
              placeholder="Enter Discount (%) or Amount"
              className="border p-2 rounded-md mb-4"
            />

            {/* Save & Cancel Buttons */}
            <View className="flex flex-row justify-between">
              <TouchableOpacity
                onPress={() => setIsEditing(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg"
              >
                <Text>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleRemoveDiscount}
                className="bg-green-500 text-white px-4 py-2 rounded-lg"
              >
                <Text>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default DiscountPage;
