# React Native TikTok Business

TikTok Business SDK for React Native.

## Installation

```bash
npm install react-native-tiktok-business
yarn add react-native-tiktok-business
bun add react-native-tiktok-business
```

## Expo config plugin:

```tsx
	plugins: [
		[
		'react-native-tiktok-business',
		{
			ios: {
				appId: 'YOUR_APP_ID',
				tiktokAppId: 'YOUR_TIKTOK_APP_ID',
				disableTrackingDialog: true, // Optional, defaults to false
			},
			android: {
				appId: 'YOUR_APP_ID',
				tiktokAppId: 'YOUR_TIKTOK_APP_ID',
			},
			debug: true, // Optional, defaults to false
		},
		]
	],
```
