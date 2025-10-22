import "../../global.css";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Link } from "expo-router";

export default function OnboardingScreen() {
  return (
    <View className="flex-1 justify-around items-center bg-indigo-500 px-5">
      <View className="items-center">
        <Text className="text-8xl">🍽️</Text>
        <Text className="text-4xl font-bold text-white mt-4">
          Welcome to {"\n"} MEC Eatz
        </Text>
        <Text className="text-lg text-white/80 text-center mt-10">
          Your smart solution for canteen orders. Quick, easy, and cashless.
        </Text>
      </View>

      <View className="w-full">
        <Link href="/(auth)/login" asChild>
          <TouchableOpacity className="bg-white py-4 rounded-lg items-center">
            <Text className="text-indigo-600 font-bold text-lg">
              Get Started
            </Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}
