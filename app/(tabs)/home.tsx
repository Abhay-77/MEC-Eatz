import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import "../../global.css";
import { Link } from "expo-router";
import { useAuth } from "@/context/AuthProvider";

const quickActions = [
  { icon: "📱", title: "QR Order" },
  { icon: "💳", title: "Add Money" },
  { icon: "📊", title: "History" },
  { icon: "🍽️", title: "Biometric" },
];

const popularItems = [
  { icon: "🍔", name: "Chicken Burger", price: "₹90" },
  { icon: "☕", name: "Hot Coffee", price: "₹35" },
  { icon: "🥪", name: "Veg Sandwich", price: "₹50" },
];

const menuItems = [
  { icon: "🍛", name: "Chicken Biriyani", price: "₹85" },
  { icon: "🍕", name: "Margherita Pizza", price: "₹120" },
  { icon: "🥗", name: "Caesar Salad", price: "₹65" },
];

export default function StudentScreen() {
  const { user } = useAuth();
  const [items, setItems] = useState<any[]>([])
  // Get username from auth context
  const username = user?.name || user?.email || "Guest";  

  return (
    <ScrollView className="flex-1 bg-slate-900 px-5">
      {/* Header with Gradient */}
      <LinearGradient
        colors={["#4f46e5", "#818cf8", "#6366f1"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="rounded-2xl p-6 mt-10 mb-6 shadow-2xl"
      >
        <View className="flex-row justify-between items-center">
          <View>
            <Text className="text-white text-2xl font-bold tracking-wide">
              Welcome to MEC Eatz!
            </Text>
            <Text className="text-indigo-200 text-lg mt-1 font-medium">
              Hello, {username} 👋
            </Text>
          </View>
          <View className="items-end">
            <Text className="text-indigo-200 text-sm font-medium">
              Current Balance
            </Text>
            <Text className="text-green-300 font-extrabold text-3xl mt-1 tracking-wider">
              ₹150
            </Text>
          </View>
        </View>
      </LinearGradient>

      {/* Hardcoded Quick Actions */}
      <View className="flex-row flex-wrap justify-between mb-6">
        {/* QR Order Button */}
        <Link
          href={{
            pathname: "/Cart/cart",
            params: { items: JSON.stringify(items) },
          }}
          asChild
        >
          <TouchableOpacity
            className="w-[48%] bg-white/10 rounded-xl p-5 items-center justify-center mb-3 border border-white/20 backdrop-blur-md shadow-lg"
            onPress={() => console.log("Order Pressed")}
          >
            <Text className="text-4xl mb-2">📱</Text>
            <Text className="font-semibold text-center text-white">Order</Text>
          </TouchableOpacity>
        </Link>

        {/* Add Money Button */}
        <Link href={"/Pay/paymentredirecting"} asChild>
          <TouchableOpacity className="w-[48%] bg-white/10 rounded-xl p-5 items-center justify-center mb-3 border border-white/20 backdrop-blur-md shadow-lg">
            <Text className="text-4xl mb-2">💳</Text>
            <Text className="font-semibold text-center text-white">
              Add Money
            </Text>
          </TouchableOpacity>
        </Link>

        {/* History Button */}
        <TouchableOpacity
          className="w-[48%] bg-white/10 rounded-xl p-5 items-center justify-center mb-3 border border-white/20 backdrop-blur-md shadow-lg"
          onPress={() => console.log("History Pressed")}
        >
          <Text className="text-4xl mb-2">📊</Text>
          <Text className="font-semibold text-center text-white">History</Text>
        </TouchableOpacity>

        {/* Biometric Button */}
        <TouchableOpacity
          className="w-[48%] bg-white/10 rounded-xl p-5 items-center justify-center mb-3 border border-indigo-400 backdrop-blur-md shadow-lg"
          onPress={() => console.log("Biometric Pressed")}
        >
          <Text className="text-4xl mb-2">🍽️</Text>
          <Text className="font-semibold text-center text-white">
            Biometric
          </Text>
        </TouchableOpacity>
      </View>

      {/* Popular Items Section */}
      <View className="mb-6">
        <Text className="text-xl font-bold mb-4 text-white">
          Popular Today 🔥
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="py-2"
        >
          {popularItems.map((item) => (
            <View
              key={item.name}
              className="bg-white/10 rounded-xl p-4 mr-4 shadow-lg w-40 items-center border border-white/20"
            >
              <Text className="text-4xl mb-2">{item.icon}</Text>
              <Text className="font-semibold text-center text-white">
                {item.name}
              </Text>
              <Text className="text-indigo-400 font-bold mt-1 text-lg">
                {item.price}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Today's Menu Section */}
      <View className="bg-white rounded-2xl p-6 mb-6 shadow-xl">
        <Text className="text-xl font-bold mb-4 text-gray-800">
          Today's Menu 🍽️
        </Text>
        {menuItems.map((item, index) => (
          <View
            key={item.name}
            className={`flex-row items-center justify-between py-3 ${
              index < menuItems.length - 1 ? "border-b border-gray-100" : ""
            }`}
          >
            <Text className="text-3xl mr-4">{item.icon}</Text>
            <View className="flex-1">
              <Text className="font-semibold text-lg text-gray-800">
                {item.name}
              </Text>
              <Text className="text-indigo-600 font-bold">{item.price}</Text>
            </View>
            <TouchableOpacity
              onPress={() => setItems([...items, item])}
              className="bg-indigo-600 rounded-full w-10 h-10 items-center justify-center"
            >
              <Text className="text-white text-2xl">+</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}