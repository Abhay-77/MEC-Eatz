import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView, Linking } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import "../../global.css";
import { supabase } from "@/lib/supabase";

const UPIPaymentScreen = () => {
  const [upiId, setUpiId] = useState("ajaykrishna2405@okhdfcbank");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("Payment");

  const initiateUPIPayment = async () => {
    if (!upiId || !amount) {
      Alert.alert("Error", "Please enter both UPI ID and amount.");
      return;
    }

    const name = "MEC Eatz";
    const upiUrl = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(name)}&am=${amount}&tn=${encodeURIComponent(
      note
    )}&cu=INR`;

     try {
      const supported = await Linking.canOpenURL(upiUrl);
      if (supported) {
        await Linking.openURL(upiUrl);

        // Ask user for manual confirmation
        Alert.alert(
          "Payment Initiated",
          "Did the payment succeed?",
          [
            { text: "No", onPress: () => console.log("Payment failed") },
            { text: "Yes", onPress: () => saveTransaction(amount) },
          ]
        );
      } else {
        Alert.alert("Error", "No UPI app found on this device.");
      }
    } catch (error) {
      Alert.alert(
        "Error",
        "Failed to open UPI app: " + (error instanceof Error ? error.message : "Unknown error")
      );
    }
  };

  interface TransactionData {
    user_id: string;
    price: number;
    created_at: string;
  }

  const saveTransaction = async (amount: string): Promise<void> => {
    try {
      // Insert into transaction_history table
      const user = await supabase.auth.getUser();
      const userId = user.data.user?.id;
      
      if (!userId) {
        Alert.alert("Error", "User not authenticated.");
        return;
      }
      
      const transactionData: TransactionData = {
        user_id: userId,
        price: parseFloat(amount),
        created_at: new Date().toISOString()
      };

      await supabase.from("Transaction_History").insert(transactionData);

      Alert.alert("Success", "Transaction recorded successfully!");
      setAmount("");  // Reset input
      setNote("Payment");
    } catch (error) {
      Alert.alert("Error", "Failed to save transaction: " + (error instanceof Error ? error.message : "Unknown error"));
    }
  };

  return (
    <ScrollView className="flex-1 bg-slate-900 px-6">
      {/* Header Gradient */}
      {/* <LinearGradient
        colors={["#4f46e5", "#818cf8", "#6366f1"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="rounded-2xl p-6 mt-10 mb-8 shadow-2xl"
      >
        <Text className="text-white text-3xl font-extrabold tracking-wide text-center">
          💸 UPI Payment
        </Text>
        <Text className="text-indigo-200 text-center mt-2 text-base">
          Send money securely through your favorite UPI app
        </Text>
      </LinearGradient> */}

      {/* Form Card */}
      <View className="bg-white/10 border border-white/20 backdrop-blur-md rounded-2xl p-6 shadow-lg mt-20">
        <Text className="text-white text-lg font-semibold mb-4 text-center">
          Enter Payment Details
        </Text>

        {/* Amount Input */}
        <View className="mb-5">
          <Text className="text-indigo-300 mb-2 font-medium">Amount (INR)</Text>
          <TextInput
            className="bg-white/15 text-white rounded-xl p-4 text-base border border-white/20"
            placeholder="Enter amount"
            placeholderTextColor="#9ca3af"
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
          />
        </View>

        {/* Note Input */}
        <View className="mb-6">
          <Text className="text-indigo-300 mb-2 font-medium">Payment Note (optional)</Text>
          <TextInput
            className="bg-white/15 text-white rounded-xl p-4 text-base border border-white/20"
            placeholder="For snacks / lunch..."
            placeholderTextColor="#9ca3af"
            value={note}
            onChangeText={setNote}
          />
        </View>

        {/* Pay Button with Gradient */}
        <TouchableOpacity onPress={initiateUPIPayment} activeOpacity={0.9}>
          <LinearGradient
            colors={["#6366f1", "#4f46e5"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="rounded-xl py-4 items-center shadow-lg"
          >
            <Text className="text-white text-xl font-semibold tracking-wide">
              Pay ₹{amount || "0.00"} via UPI
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {/* Info Section */}
      <View className="mt-8 items-center">
        <Text className="text-indigo-300 text-sm text-center leading-5">
          Your UPI app will open automatically for confirmation.{"\n"}
          Please ensure your UPI ID and amount are correct.
        </Text>
      </View>
    </ScrollView>
  );
};

export default UPIPaymentScreen;
