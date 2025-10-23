// import { Stack, router, useSegments } from "expo-router";
// import React, { useEffect } from "react";
// import { AuthProvider, useAuth } from "../context/AuthProvider";
// import { ActivityIndicator, View } from "react-native";

// // This component handles the redirection logic
// const InitialLayout = () => {
//   const { session, loading } = useAuth();
//   const segments = useSegments();

//   useEffect(() => {
//     // If loading, do nothing yet
//     if (loading) return;

//     const inAuthGroup = segments[0] === "(auth)";

//     // If there's a session and user is not in the main app group, redirect
//     if (session && inAuthGroup) {
//       router.replace("/(tabs)/home");
//     } else if (!session && !inAuthGroup) {
//       router.replace("/(auth)");
//     }
//   }, [session, loading, segments]);

//   // Show a loading indicator while the session is being checked
//   if (loading) {
//     return (
//       <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//         <ActivityIndicator size="large" />
//       </View>
//     );
//   }

//   return (
//     <Stack>
//       <Stack.Screen name="(auth)" options={{ headerShown: false }} />
//       <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
//     </Stack>
//   );
// };

// // This is the root layout component
// export default function RootLayout() {
//   return (
//     <AuthProvider>
//       <InitialLayout />
//     </AuthProvider>
//   );
// }

import { Stack, router, useSegments } from "expo-router";
import React, { useEffect } from "react";
import { AuthProvider, useAuth } from "../context/AuthProvider";
import { ActivityIndicator, View } from "react-native";

const InitialLayout = () => {
  const { session, loading } = useAuth();
  const segments = useSegments();

  useEffect(() => {
    if (loading) return;

    const currentRoute = segments[0];
    const isAuthRoute = currentRoute === "(auth)";

    // Check if we're at the root by seeing if segments[0] is undefined
    const isRoot = !currentRoute;

    console.log("Current route:", currentRoute, "Session:", !!session);

    if (session) {
      // Redirect to home if user is logged in and on auth pages or root
      if (isAuthRoute || isRoot) {
        router.replace("/(tabs)/home");
      }
    } else {
      // Redirect to login if user is not logged in and not on auth pages
      if (!isAuthRoute && !isRoot) {
        router.replace("/(auth)/login");
      }
    }
  }, [session, loading, segments]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#4F46E5" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
};

export default function RootLayout() {
  return (
    <AuthProvider>
      <InitialLayout />
    </AuthProvider>
  );
}