import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, FlatList, GestureResponderEvent } from 'react-native';

const CRMPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activePage, setActivePage] = useState('Dashboard');
  const [loyaltyMembers, setLoyaltyMembers] = useState([
    { id: 1, number: 'L12345', name: 'John Doe' },
    { id: 2, number: 'L67890', name: 'Jane Smith' },
  ]);
  const [isAddLoyaltyModalOpen, setIsAddLoyaltyModalOpen] = useState(false);
  const [newLoyaltyMember, setNewLoyaltyMember] = useState({ number: '', name: '' });

  const [vouchers, setVouchers] = useState([]);
  const [isVoucherModalOpen, setIsVoucherModalOpen] = useState(false);
  const [selectedVoucherAmount, setSelectedVoucherAmount] = useState('');

  const navigationItems = ['Dashboard', 'Campaigns', 'Loyalty Cards', 'Vouchers'];

  const handleAddLoyaltyMember = () => {
    setLoyaltyMembers((prev) => [
      ...prev,
      { id: Date.now(), number: newLoyaltyMember.number, name: newLoyaltyMember.name },
    ]);
    setNewLoyaltyMember({ number: '', name: '' });
    setIsAddLoyaltyModalOpen(false);
  };

  const handleDeleteLoyaltyMember = (id:any) => {
    setLoyaltyMembers((prev) => prev.filter((member) => member.id !== id));
  };

  

  const renderPageContent = () => {
    switch (activePage) {
      case 'Dashboard':
        return (
          <View className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <View className="bg-white p-6 shadow-md rounded-lg">
              <Text className="text-xl font-bold mb-4">Campaign Dashboard</Text>
              <Text>Monitor ongoing campaigns and analyze performance metrics.</Text>
              <TouchableOpacity className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg">
                <Text>View Campaigns</Text>
              </TouchableOpacity>
            </View>
            <View className="bg-white p-6 shadow-md rounded-lg">
              <Text className="text-xl font-bold mb-4">Loyalty Cards</Text>
              <Text>Manage customer loyalty programs and card rewards.</Text>
              <TouchableOpacity
                onPress={() => setActivePage('Loyalty Cards')}
                className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg"
              >
                <Text>Manage Cards</Text>
              </TouchableOpacity>
            </View>
            <View className="bg-white p-6 shadow-md rounded-lg">
              <Text className="text-xl font-bold mb-4">Issue Vouchers</Text>
              <Text>Generate and distribute vouchers to customers.</Text>
              <TouchableOpacity
                onPress={() => setActivePage('Vouchers')}
                className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded-lg"
              >
                <Text>Issue Voucher</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      case 'Loyalty Cards':
        return (
          <View>
            <Text className="text-2xl font-bold mb-4">Loyalty Cards</Text>
            <View className="overflow-auto border rounded-lg mb-4">
              <FlatList
                data={loyaltyMembers}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <View className="flex flex-row justify-between items-center border-b p-4">
                    <Text className="w-1/3">{item.number}</Text>
                    <Text className="w-1/3">{item.name}</Text>
                    <TouchableOpacity
                      onPress={() => handleDeleteLoyaltyMember(item.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg"
                    >
                      <Text>Delete</Text>
                    </TouchableOpacity>
                  </View>
                )}
              />
            </View>
            <TouchableOpacity
              onPress={() => setIsAddLoyaltyModalOpen(true)}
              className="bg-green-500 text-white px-4 py-2 rounded-lg"
            >
              <Text>Add New Loyalty Member</Text>
            </TouchableOpacity>
          </View>
        );
      case 'Vouchers':
        return (
          <View>
            <Text className="text-2xl font-bold mb-4">Vouchers</Text>
            <View className="mb-4">
              
            </View>
            <TouchableOpacity
              onPress={() => setIsVoucherModalOpen(true)}
              className="bg-yellow-500 text-white px-4 py-2 rounded-lg"
            >
              <Text>Issue New Voucher</Text>
            </TouchableOpacity>
          </View>
        );
      default:
        return null;
    }
  };

  function handleIssueVoucher(event: GestureResponderEvent): void {
    throw new Error('Function not implemented.');
  }

  return (
    <View style={{ padding: 16, backgroundColor: '#f9f9f9', flex: 1 }}>
      {/* Search Bar */}
      <TextInput
        placeholder="Search CRM..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        className="border rounded-lg p-3 mb-4"
      />

      {/* Navigation Menu */}
      <View className="flex flex-row space-x-4 mb-6">
        {navigationItems.map((item) => (
          <TouchableOpacity
            key={item}
            onPress={() => setActivePage(item)}
            className={`px-4 py-2 rounded-lg ${
              activePage === item ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
          >
            <Text>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Page Content */}
      {renderPageContent()}

      {/* Add Loyalty Member Modal */}
      <Modal
        transparent={true}
        visible={isAddLoyaltyModalOpen}
        animationType="slide"
        onRequestClose={() => setIsAddLoyaltyModalOpen(false)}
      >
        <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
          <View className="bg-white p-6 rounded-lg w-80">
            <Text className="text-xl font-bold text-center mb-4">Add Loyalty Member</Text>
            <TextInput
              placeholder="Loyalty Number"
              value={newLoyaltyMember.number}
              onChangeText={(text) => setNewLoyaltyMember((prev) => ({ ...prev, number: text }))}
              className="border rounded-lg p-3 mb-4"
            />
            <TextInput
              placeholder="Name"
              value={newLoyaltyMember.name}
              onChangeText={(text) => setNewLoyaltyMember((prev) => ({ ...prev, name: text }))}
              className="border rounded-lg p-3 mb-4"
            />
            <View className="flex flex-row justify-between">
              <TouchableOpacity
                onPress={() => setIsAddLoyaltyModalOpen(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg"
              >
                <Text>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleAddLoyaltyMember}
                className="bg-green-500 text-white px-4 py-2 rounded-lg"
              >
                <Text>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Issue Voucher Modal */}
      <Modal
        transparent={true}
        visible={isVoucherModalOpen}
        animationType="slide"
        onRequestClose={() => setIsVoucherModalOpen(false)}
      >
        <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
          <View className="bg-white p-6 rounded-lg w-80">
            <Text className="text-xl font-bold text-center mb-4">Issue Voucher</Text>
            <TouchableOpacity
              onPress={() => setSelectedVoucherAmount('500')}
              className="border rounded-lg p-3 mb-2 bg-gray-200"
            >
              <Text>Rs. 500</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setSelectedVoucherAmount('1000')}
              className="border rounded-lg p-3 mb-2 bg-gray-200"
            >
              <Text>Rs. 1000</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setSelectedVoucherAmount('5000')}
              className="border rounded-lg p-3 mb-2 bg-gray-200"
            >
              <Text>Rs. 5000</Text>
            </TouchableOpacity>
            <View className="flex flex-row justify-between mt-4">
              <TouchableOpacity
                onPress={() => setIsVoucherModalOpen(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg"
              >
                <Text>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleIssueVoucher}
                className="bg-yellow-500 text-white px-4 py-2 rounded-lg"
              >
                <Text>Issue</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CRMPage;
