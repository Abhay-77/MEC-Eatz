import "../../global.css";
import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";

export default function StudentScreen() {
  const quickActions = [
    { icon: "📱", title: "QR Order" },
    { icon: "💳", title: "Add Money" },
    { icon: "📊", title: "History" },
    { icon: "🍽️", title: "Biometric" },
  ];

  const menuItems = [
    { icon: "🍛", name: "Chicken Biriyani", price: "₹85" },
    { icon: "🍕", name: "Margherita Pizza", price: "₹120" },
    { icon: "🥗", name: "Caesar Salad", price: "₹65" },
  ];

  return (
    <ScrollView className="flex-1 bg-indigo-500 px-5">
      {/* Welcome Section */}
      <View className="bg-white/20 rounded-2xl p-6 mt-10 mb-6">
        <Text className="text-white text-xl font-bold">Hi, Ajay! 👋</Text>
        <Text className="text-white mt-1">
          Wallet Balance:{" "}
          <Text className="text-yellow-400 font-bold">₹750</Text>
        </Text>
      </View>

      {/* Quick Actions */}
      <View className="flex-row flex-wrap justify-between mb-6">
        {quickActions.map((a) => (
          <TouchableOpacity
            key={a.title}
            className="w-[48%] bg-white rounded-xl p-6 items-center mb-3"
          >
            <Text className="text-2xl mb-2">{a.icon}</Text>
            <Text className="font-semibold">{a.title}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Menu Section */}
      <View className="bg-white rounded-2xl p-6 mb-6">
        <Text className="text-lg font-bold mb-4">Today's Menu</Text>
        {menuItems.map((item) => (
          <View
            key={item.name}
            className="flex-row items-center justify-between mb-4"
          >
            <Text className="text-2xl mr-3">{item.icon}</Text>
            <View className="flex-1">
              <Text className="font-semibold text-base">{item.name}</Text>
              <Text className="text-indigo-600">{item.price}</Text>
            </View>
            <TouchableOpacity className="bg-indigo-600 rounded-md px-3 py-1">
              <Text className="text-white text-lg">+</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
