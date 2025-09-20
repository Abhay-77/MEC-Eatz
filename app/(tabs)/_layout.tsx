import { Text, TouchableOpacity, View } from "react-native";
import { Tabs } from "expo-router";
import { House, User } from "lucide-react-native";
import { useState } from "react";

export default function Layout() {
  const [activeTab, setActiveTab] = useState("index");

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "transparent",
          position: "absolute",
          borderTopWidth: 0,
          elevation: 0,
        },
      }}
      tabBar={({ state, descriptors, navigation }) => {
        return (
          <View
            style={{
              flexDirection: "row",
              marginHorizontal: 20,
              marginBottom: 40,
              borderRadius: 40,
              backgroundColor: "white",
            }}
          >
            {state.routes.map((route, index) => {
              const { options } = descriptors[route.key];
              const isFocused = state.index === index;

              return (
                <TouchableOpacity
                  key={route.key}
                  style={{
                    flex: 1,
                    padding: 6,
                    alignItems: "center",
                    borderRadius: 40,
                    backgroundColor: isFocused ? "#4F46E5" : "transparent",
                  }}
                  onPress={() => {
                    setActiveTab(route.name);
                    navigation.navigate(route.name);
                  }}
                >
                  {options.tabBarIcon &&
                    options.tabBarIcon({
                      focused: isFocused,
                      color: isFocused ? "white" : "#666",
                      size: 20,
                    })}
                  <Text
                    style={{
                      color: isFocused ? "white" : "#666",
                      fontWeight: isFocused ? "600" : "400",
                      fontSize: 12,
                      marginTop: 4,
                    }}
                  >
                    {options.title}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        );
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <House size={20} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => <User size={20} color={color} />,
        }}
      />
    </Tabs>
  );
}
