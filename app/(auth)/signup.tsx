import "../../global.css";
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { Link } from "expo-router";

export default function SignUpScreen() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    setLoading(true);
    // const { error } = await supabase.auth.signUp({
    //   email,
    //   password,
    // });

    // if (error) {
    //   Alert.alert("Sign Up Error", error.message);
    // } else {
    //   Alert.alert(
    //     "Success!",
    //     "Please check your email for a confirmation link.",
    //   );
    // }
    const res = await fetch("https://mec-eatz.onrender.com/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
      }),
    });

    const data = await res.json();

    if (!res.ok || !data.success) {
      alert("Signup Error: " + (data.message || "Unknown error"));
    } else {
      alert("Signup successful!");
    }
    setLoading(false);
  };

  return (
    <View className="flex-1 justify-center bg-indigo-500 px-5">
      <View className="bg-white rounded-2xl p-6">
        <Text className="text-4xl text-center mb-2">🚀</Text>
        <Text className="text-2xl font-bold text-center">Create Account</Text>
        <Text className="text-gray-500 text-center mb-6">
          Join the smart canteen experience.
        </Text>

        <View className="mb-4">
          <Text className="font-semibold">Username</Text>
          <TextInput
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
            placeholder="Enter your username"
            className="border border-gray-300 rounded-lg px-3 py-2 mt-1"
          />
        </View>

        <View className="mb-4">
          <Text className="font-semibold">Email / Student ID</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            placeholder="Enter your college email"
            className="border border-gray-300 rounded-lg px-3 py-2 mt-1"
          />
        </View>

        <View className="mb-4">
          <Text className="font-semibold">Password</Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholder="Create a strong password"
            className="border border-gray-300 rounded-lg px-3 py-2 mt-1"
          />
        </View>

        <TouchableOpacity
          onPress={handleSignUp}
          disabled={loading}
          className="bg-indigo-600 py-3 rounded-lg items-center mt-2"
        >
          <Text className="text-white font-semibold">
            {loading ? "Creating Account..." : "Sign Up"}
          </Text>
        </TouchableOpacity>

        <View className="flex-row justify-center mt-4">
          <Text className="text-gray-500">Already have an account? </Text>
          <Link href="/(auth)/login" asChild>
            <TouchableOpacity>
              <Text className="text-indigo-600 font-semibold">Login here</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </View>
  );
}
