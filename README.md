# React Native TikTok Business

TikTok Business SDK for React Native.

## Installation

```bash
npm install react-native-tiktok-business
yarn add react-native-tiktok-business
bun add react-native-tiktok-business
```

## Expo config plugin:

For Expo apps, you'll need to add both the plugin configuration and the required iOS privacy permission:

```json
{
  "expo": {
    "plugins": [
      [
        "react-native-tiktok-business",
        {
          "ios": {
            "appId": "YOUR_APP_ID",
            "tiktokAppId": "YOUR_TIKTOK_APP_ID",
            "disableAppTrackingDialog": true // Optional, defaults to false
          },
          "android": {
            "appId": "YOUR_APP_ID",
            "tiktokAppId": "YOUR_TIKTOK_APP_ID"
          },
          "debug": true // Optional, defaults to false
        }
      ]
    ],
    "ios": {
      "infoPlist": {
        "NSUserTrackingUsageDescription": "This identifier will be used to provide a more personalized experience for you."
      }
    }
  }
}
```

The `NSUserTrackingUsageDescription` is required for iOS devices to request tracking authorization. Without this permission string, the tracking dialog will not be shown to users.

## Usage

```typescript
import TiktokBusiness from "react-native-tiktok-business";

// Identify a user
TiktokBusiness.identify("user-external-id", "username", "phone", "email");

// Clear user identification
TiktokBusiness.logout();

// Request tracking authorization (iOS only)
const status = await TiktokBusiness.requestTrackingAuthorization();

// Check if debug mode is enabled
const isDebug = TiktokBusiness.isDebugMode();

// Manually flush events (iOS only)
TiktokBusiness.flush();

// Track a simple event
TiktokBusiness.trackEvent("purchase");

// Track event with custom data
TiktokBusiness.trackEvent("purchase_completed", "order-123", [
  { key: "currency", value: "USD" },
  { key: "value", value: "99.99" },
  { key: "quantity", value: "1" },
  { key: "price", value: "99.99" },
]);
```
