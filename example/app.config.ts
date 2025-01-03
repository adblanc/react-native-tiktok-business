import { ExpoConfig, ConfigContext } from "expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "react-native-tiktok-business-example",
  slug: "react-native-tiktok-business-example",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "light",
  newArchEnabled: true,
  splash: {
    image: "./assets/splash-icon.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },
  ios: {
    supportsTablet: true,
    bundleIdentifier: "expo.modules.tiktokbusiness.example",
    infoPlist: {
      NSUserTrackingUsageDescription:
        "This identifier will be used to provide a more personalized experience for you.",
    },
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#ffffff",
    },
    package: "expo.modules.tiktokbusiness.example",
  },
  web: {
    favicon: "./assets/favicon.png",
  },
  plugins: [
    [
      "../app.plugin.js",
      {
        ios: {
          appId: process.env.EXPO_PUBLIC_IOS_APP_ID,
          tiktokAppId: process.env.EXPO_PUBLIC_IOS_TIKTOK_APP_ID,
          disableAppTrackingDialog: true,
        },
        android: {
          appId: process.env.EXPO_PUBLIC_ANDROID_APP_ID,
          tiktokAppId: process.env.EXPO_PUBLIC_ANDROID_TIKTOK_APP_ID,
        },
      },
    ],
  ],
});
