import { Stack, router, useSegments } from "expo-router";
import React, { useEffect } from "react";
import { AuthProvider, useAuth } from "../context/AuthProvider";
import { ActivityIndicator, View } from "react-native";

// This component handles the redirection logic
const InitialLayout = () => {
  const { session, loading } = useAuth();
  const segments = useSegments();

  useEffect(() => {
    // If loading, do nothing yet
    if (loading) return;

    const inAuthGroup = segments[0] === "(auth)";

    // If there's a session and user is not in the main app group, redirect
    if (session && inAuthGroup) {
      router.replace("/(tabs)");
    } else if (!session && !inAuthGroup) {
      router.replace("/(auth)");
    }
  }, [session, loading, segments]);

  // Show a loading indicator while the session is being checked
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack>
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
};

// This is the root layout component
export default function RootLayout() {
  return (
    <AuthProvider>
      <InitialLayout />
    </AuthProvider>
  );
}
