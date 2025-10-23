// import React from 'react';
// import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
// import { useLocalSearchParams } from 'expo-router';
// import { Link } from 'expo-router';

// export default function CartScreen() {
//   // Access the parameters
//   const params = useLocalSearchParams();

//   // Parse the items from URL params
//   const items = params.items ? JSON.parse(params.items as string) : [];

//   // Calculate total
//   const calculateTotal = () => {
//     return items.reduce((total: number, item: any) => {
//       const price = parseInt(item.price?.replace('₹', '') || '0');
//       return total + price;
//     }, 0);
//   };

//   // Remove item from cart
//   const removeFromCart = (index: number) => {
//     // Since we're using params, we can't modify the original array directly
//     // You might want to show a message that modification isn't possible
//     console.log('Remove item at index:', index);
//   };

//   if (items.length === 0) {
//     return (
//       <View className="flex-1 bg-slate-900 justify-center items-center p-6">
//         <Text className="text-white text-2xl font-bold mb-4">Your cart is empty</Text>
//         <Text className="text-gray-400 text-center mb-8">
//           Add some delicious items from the menu to get started!
//         </Text>
//         <Link href="/(tabs)/home" asChild>
//           <TouchableOpacity className="bg-indigo-600 px-6 py-3 rounded-full">
//             <Text className="text-white font-semibold text-lg">Browse Menu</Text>
//           </TouchableOpacity>
//         </Link>
//       </View>
//     );
//   }

//   return (
//     <ScrollView className="flex-1 bg-slate-900 p-6">
//       <Text className="text-white text-3xl font-bold mb-6">Your Order 🛒</Text>

//       {/* Debug: Show what's in params */}
//       {/* <Text className="text-white">Params: {JSON.stringify(params)}</Text> */}

//       {items.map((item: any, index: number) => (
//         <View
//           key={`${item.name}-${index}`}
//           className="bg-white/10 rounded-xl p-4 mb-3 flex-row items-center justify-between"
//         >
//           <View className="flex-row items-center flex-1">
//             <Text className="text-3xl mr-4">{item.icon}</Text>
//             <View className="flex-1">
//               <Text className="text-white font-semibold text-lg">
//                 {item.name}
//               </Text>
//               <Text className="text-indigo-400 font-bold">{item.price}</Text>
//             </View>
//           </View>

//           <TouchableOpacity
//             onPress={() => removeFromCart(index)}
//             className="bg-red-500 rounded-full w-8 h-8 items-center justify-center"
//           >
//             <Text className="text-white text-lg">−</Text>
//           </TouchableOpacity>
//         </View>
//       ))}

//       <View className="bg-white/10 rounded-xl p-4 mt-4">
//         <View className="flex-row justify-between mb-2">
//           <Text className="text-gray-300">Subtotal</Text>
//           <Text className="text-white font-bold">₹{calculateTotal()}</Text>
//         </View>
//         <View className="flex-row justify-between mb-4">
//           <Text className="text-gray-300">Tax (5%)</Text>
//           <Text className="text-white font-bold">
//             ₹{calculateTotal() * 0.05}
//           </Text>
//         </View>
//         <View className="flex-row justify-between border-t border-white/20 pt-2">
//           <Text className="text-white text-lg font-bold">Total</Text>
//           <Text className="text-green-400 text-lg font-bold">
//             ₹{calculateTotal() + calculateTotal() * 0.05}
//           </Text>
//         </View>
//       </View>

//       <Link
//         href={{
//           pathname: "/Pay/paymentredirecting",
//           params: {
//             price: JSON.stringify(calculateTotal() + calculateTotal() * 0.05),
//           },
//         }}
//         asChild
//       >
//         <TouchableOpacity className="bg-green-500 rounded-xl p-4 mt-6 items-center">
//           <Text className="text-white font-bold text-lg">
//             Proceed to Payment
//           </Text>
//         </TouchableOpacity>
//       </Link>

//       <Link href="/(tabs)/home" asChild>
//         <TouchableOpacity className="bg-indigo-600 rounded-xl p-4 mt-3 items-center">
//           <Text className="text-white font-bold text-lg">Add More Items</Text>
//         </TouchableOpacity>
//       </Link>
//     </ScrollView>
//   );
// }

import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Link } from "expo-router";

export default function CartScreen() {
  const params = useLocalSearchParams();
  const router = useRouter();

  // Use state to manage cart items for real-time updates
  const [cartItems, setCartItems] = useState<any[]>([]);

  // Initialize cart items from params when component mounts
  useEffect(() => {
    if (params.items) {
      setCartItems(JSON.parse(params.items as string));
    }
  }, [params.items]);

  // Calculate total
  const calculateTotal = () => {
    return cartItems.reduce((total: number, item: any) => {
      const price = parseInt(item.price?.replace("₹", "") || "0");
      return total + price;
    }, 0);
  };

  // Remove item from cart
  const removeFromCart = (index: number) => {
    setCartItems((prevItems) => {
      const newItems = [...prevItems];
      newItems.splice(index, 1);
      return newItems;
    });
  };

  // Clear all items
  const clearCart = () => {
    setCartItems([]);
  };

  // Handle "Add More Items" - clear current cart and navigate
  const handleAddMoreItems = () => {
    clearCart();
    router.push("/(tabs)/home");
  };

  // Handle "Proceed to Payment" - pass current cart state
  const handleProceedToPayment = () => {
    if (cartItems.length === 0) {
      Alert.alert(
        "Cart Empty",
        "Please add items to your cart before proceeding to payment."
      );
      return;
    }

    // The Link component will handle navigation with the current cartItems
  };

  if (cartItems.length === 0) {
    return (
      <View className="flex-1 bg-slate-900 justify-center items-center p-6">
        <Text className="text-white text-2xl font-bold mb-4">
          Your cart is empty empty
        </Text>
        <Text className="text-gray-400 text-center mb-8">
          Add some delicious items from the menu to get started!
        </Text>
        <TouchableOpacity
          className="bg-indigo-600 px-6 py-3 rounded-full"
          onPress={handleAddMoreItems}
        >
          <Text className="text-white font-semibold text-lg">Browse Menu</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const totalAmount = calculateTotal() + calculateTotal() * 0.05;

  return (
    <ScrollView className="flex-1 bg-slate-900 p-6">
      <View className="flex-row justify-between items-center mb-6">
        <Text className="text-white text-3xl font-bold">Your Order 🛒</Text>
        <TouchableOpacity
          onPress={clearCart}
          className="bg-red-500/20 border border-red-500 rounded-lg px-3 py-2"
        >
          <Text className="text-red-400 text-sm font-semibold">Clear All</Text>
        </TouchableOpacity>
      </View>

      {cartItems.map((item: any, index: number) => (
        <View
          key={`${item.name}-${index}`}
          className="bg-white/10 rounded-xl p-4 mb-3 flex-row items-center justify-between"
        >
          <View className="flex-row items-center flex-1">
            <Text className="text-3xl mr-4">{item.icon}</Text>
            <View className="flex-1">
              <Text className="text-white font-semibold text-lg">
                {item.name}
              </Text>
              <Text className="text-indigo-400 font-bold">{item.price}</Text>
            </View>
          </View>

          <TouchableOpacity
            onPress={() => removeFromCart(index)}
            className="bg-red-500 rounded-full w-8 h-8 items-center justify-center"
          >
            <Text className="text-white text-lg">−</Text>
          </TouchableOpacity>
        </View>
      ))}

      <View className="bg-white/10 rounded-xl p-4 mt-4">
        <View className="flex-row justify-between mb-2">
          <Text className="text-gray-300">Subtotal</Text>
          <Text className="text-white font-bold">₹{calculateTotal()}</Text>
        </View>
        <View className="flex-row justify-between mb-4">
          <Text className="text-gray-300">Tax (5%)</Text>
          <Text className="text-white font-bold">
            ₹{(calculateTotal() * 0.05).toFixed(2)}
          </Text>
        </View>
        <View className="flex-row justify-between border-t border-white/20 pt-2">
          <Text className="text-white text-lg font-bold">Total</Text>
          <Text className="text-green-400 text-lg font-bold">
            ₹{totalAmount.toFixed(2)}
          </Text>
        </View>
      </View>

      <Link
        href={{
          pathname: "/Pay/paymentredirecting",
          params: {
            price: JSON.stringify(totalAmount),
            items: JSON.stringify(cartItems), // Pass current cart items if needed
          },
        }}
        asChild
      >
        <TouchableOpacity
          className="bg-green-500 rounded-xl p-4 mt-6 items-center"
          onPress={handleProceedToPayment}
        >
          <Text className="text-white font-bold text-lg">
            Proceed to Payment - ₹{totalAmount.toFixed(2)}
          </Text>
        </TouchableOpacity>
      </Link>

      <TouchableOpacity
        className="bg-indigo-600 rounded-xl p-4 mt-3 items-center"
        onPress={handleAddMoreItems}
      >
        <Text className="text-white font-bold text-lg">Add More Items</Text>
      </TouchableOpacity>

      {/* Quick actions */}
      <View className="flex-row justify-between mt-4">
        <TouchableOpacity
          className="bg-white/10 rounded-lg p-3 flex-1 mr-2 items-center border border-white/20"
          onPress={() => {
            if (cartItems.length > 0) {
              removeFromCart(0);
            }
          }}
        >
          <Text className="text-white text-sm">Remove First</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-white/10 rounded-lg p-3 flex-1 ml-2 items-center border border-white/20"
          onPress={() => {
            if (cartItems.length > 0) {
              removeFromCart(cartItems.length - 1);
            }
          }}
        >
          <Text className="text-white text-sm">Remove Last</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}