// import { Link, useRouter } from "expo-router";
// import React, { useState } from "react";
// import { Text, TextInput, TouchableOpacity, View } from "react-native";
// import "../../global.css";
// import { useAuth } from "@/context/AuthProvider";

// export default function LoginScreen() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);

//   const router = useRouter();

//     const { login } = useAuth();
//   const handleLogin = async () => {
//     setLoading(true);
//     const res = await fetch("http://10.0.2.2:3000/api/login", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       credentials: "include",
//       body: JSON.stringify({
//         email: email,
//         password: password,
//       }),
//     });

//     const data = await res.json();

//     if (!res.ok || !data.success) {
//       alert("Login Error: " + (data.message || "Unknown error"));
//     } else {
//       router.replace("/(tabs)/profile");
//     }

//       setLoading(false);
//     };
//     // const handleLogin = async () => {
//     //   setLoading(true);
//     //   const res = await fetch("http://10.0.2.2:3000/api/login", {
//     //     method: "POST",
//     //     headers: { "Content-Type": "application/json" },
//     //     body: JSON.stringify({ email, password }),
//     //   });

//     //   const data = await res.json();

//     //   if (!res.ok || !data.success) {
//     //     alert("Login failed");
//     //   } else {
//     //     // Example: server returns user object { id, name, email }
//     //     await login({ id: data.id, name: data.name, email });
//     //     router.replace("/(tabs)/home");
//     //   }
//     //   setLoading(false);
//     // };

//   return (
//     <View className="flex-1 justify-center bg-indigo-500 px-5">
//       <View className="bg-white rounded-2xl p-6">
//         <Text className="text-4xl text-center mb-2">🍽️</Text>
//         <Text className="text-2xl font-bold text-center">
//           Login to MEC Eatz
//         </Text>
//         <Text className="text-gray-500 text-center mb-6">Welcome back!</Text>

//         <View className="mb-4">
//           <Text className="font-semibold">Email / Student ID</Text>
//           <TextInput
//             value={email}
//             onChangeText={setEmail}
//             autoCapitalize="none"
//             placeholder="Enter your email"
//             className="border border-gray-300 rounded-lg px-3 py-2 mt-1"
//           />
//         </View>

//         <View className="mb-4">
//           <Text className="font-semibold">Password</Text>
//           <TextInput
//             value={password}
//             onChangeText={setPassword}
//             secureTextEntry
//             placeholder="Enter password"
//             className="border border-gray-300 rounded-lg px-3 py-2 mt-1"
//           />
//         </View>

//         <TouchableOpacity
//           onPress={handleLogin}
//           disabled={loading}
//           className="bg-indigo-600 py-3 rounded-lg items-center mt-2"
//           >
//           <Text className="text-white font-semibold">
//             {loading ? "Logging in..." : "Login"}
//           </Text>
//         </TouchableOpacity>

//         <View className="flex-row justify-center mt-4">
//           <Text className="text-gray-500">New student? </Text>
//           <Link href="/(auth)/signup" asChild>
//             <TouchableOpacity>
//               <Text className="text-indigo-600 font-semibold">
//                 Register here
//               </Text>
//             </TouchableOpacity>
//           </Link>
//         </View>
//       </View>
//     </View>
//   );
// }

import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import "../../global.css";
import { useAuth } from "@/context/AuthProvider";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { login } = useAuth();

  // const handleLogin = async () => {
  //   if (!email || !password) {
  //     alert("Please enter both email and password");
  //     return;
  //   }

  //   setLoading(true);
  //   try {
  //     const res = await fetch("http://10.0.2.2:3000/api/login", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       credentials: "include",
  //       body: JSON.stringify({
  //         email: email,
  //         password: password,
  //       }),
  //     });

  //     const data = await res.json();

  //     if (!res.ok || !data.success) {
  //       alert("Login Error: " + (data.message || "Unknown error"));
  //     } else {
  //       // Use the login function from context to update the session
  //       // Make sure your API returns user data like { id, name, email }
  //       const userData = {
  //         id: data.user?.id || data.id || email, // fallback to email if no id
  //         name: data.user?.name || data.name || "User",
  //         email: data.user?.email || data.email || email,
  //       };

  //       await login(userData);
  //       // Navigation will be handled by the InitialLayout component
  //       // So we don't need to navigate manually here
  //     }
  //   } catch (error) {
  //     console.error("Login error:", error);
  //     alert("Network error. Please try again.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // In your login screen
  // const handleLogin = async () => {
  //   if (!email || !password) {
  //     alert("Please enter both email and password");
  //     return;
  //   }

  //   setLoading(true);
  //   try {
  //     const res = await fetch("http://10.0.2.2:3000/api/login", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       credentials: "include",
  //       body: JSON.stringify({
  //         email: email,
  //         password: password,
  //       }),
  //     });

  //     const data = await res.json();

  //     // Log the full API response to see what's available
  //     console.log("Login API Response:", data);

  //     if (!res.ok || !data.success) {
  //       alert("Login Error: " + (data.message || "Unknown error"));
  //     } else {
  //       // Use the actual user data from the API response
  //       const resp = await fetch("http://10.0.2.2:3000/api/me");
  //       if (!resp.ok) {
  //         alert("Please login again")
  //       }
  //       const data2 = await res.json()
  //       console.log(data2.user)
  //       const userData = {
  //         id: data2.user?.id || data2.id || email,
  //         name: data2.user?.name || data2.name || data2.username || "User", // Try multiple fields
  //       };

  //       console.log("User data to store:", userData);
  //       await login(userData);
  //     }
  //   } catch (error) {
  //     console.error("Login error:", error);
  //     alert("Network error. Please try again.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };
 const handleLogin = async () => {
   if (!email || !password) {
     alert("Please enter both email and password");
     return;
   }

   setLoading(true);
   try {
     // First API call - Login
     const loginRes = await fetch("http://10.0.2.2:3000/api/login", {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
       },
       credentials: "include",
       body: JSON.stringify({
         email: email,
         password: password,
       }),
     });

     const loginData = await loginRes.json();
     console.log("Login API Response:", loginData);

     if (!loginRes.ok || !loginData.success) {
       alert("Login Error: " + (loginData.message || "Unknown error"));
       return;
     }
    
     const profileData = loginData.user
     console.log(loginData)

     const userData = {
       id: profileData.id || email,
       name:
         profileData.name ||
         profileData.username ||
         "Guest",
     };

     console.log("User data to store:", userData);
     await login(userData);
   } catch (error) {
     console.error("Login error:", error);
     alert("Network error. Please try again.");
   } finally {
     setLoading(false);
   }
 };
  return (
    <View className="flex-1 justify-center bg-indigo-500 px-5">
      <View className="bg-white rounded-2xl p-6">
        <Text className="text-4xl text-center mb-2">🍽️</Text>
        <Text className="text-2xl font-bold text-center">
          Login to MEC Eatz
        </Text>
        <Text className="text-gray-500 text-center mb-6">Welcome back!</Text>

        <View className="mb-4">
          <Text className="font-semibold">Email / Student ID</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            placeholder="Enter your email"
            className="border border-gray-300 rounded-lg px-3 py-2 mt-1"
          />
        </View>

        <View className="mb-4">
          <Text className="font-semibold">Password</Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholder="Enter password"
            className="border border-gray-300 rounded-lg px-3 py-2 mt-1"
          />
        </View>

        <TouchableOpacity
          onPress={handleLogin}
          disabled={loading}
          className="bg-indigo-600 py-3 rounded-lg items-center mt-2"
        >
          <Text className="text-white font-semibold">
            {loading ? "Logging in..." : "Login"}
          </Text>
        </TouchableOpacity>

        <View className="flex-row justify-center mt-4">
          <Text className="text-gray-500">New student? </Text>
          <Link href="/(auth)/signup" asChild>
            <TouchableOpacity>
              <Text className="text-indigo-600 font-semibold">
                Register here
              </Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </View>
  );
}