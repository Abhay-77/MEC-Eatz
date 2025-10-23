import "dotenv/config";

export default {
  expo: {
    name: "MEC Eatz",
    slug: "meceatz",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/mecEatzLogo.jpg",
    jsEngine: "hermes",
    scheme: "meceatz",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    ios: {
      supportsTablet: true,
    },
    android: {
      package: "com.abhaymuralim.meceatz",
      adaptiveIcon: {
        foregroundImage: "./assets/images/mecEatzLogo.jpg",
        backgroundColor: "#ffffff",
      },
      edgeToEdgeEnabled: true,
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/mecEatzLogo.jpg",
    },
    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./assets/images/mecEatzLogo.jpg",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#ffffff",
        },
      ],
      "expo-secure-store",
    ],
    experiments: {
      typedRoutes: true,
    },
    extra: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseAnonKey: process.env.SUPABASE_ANON_KEY,
      eas: {
        projectId: process.env.EAS_PROJECT_ID, // optional if you're using EAS
      },
    },
  },
};
