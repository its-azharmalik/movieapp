export default {
	expo: {
		name: 'MovieApp',
		slug: 'movieApp',
		version: '2.0.0',
		orientation: 'portrait',
		icon: './assets/images/logo.png',
		scheme: 'myapp',
		userInterfaceStyle: 'automatic',
		splash: {
			image: './assets/images/logo.png',
			resizeMode: 'contain',
			backgroundColor: '#ffffff',
		},
		assetBundlePatterns: ['**/*'],
		ios: {
			supportsTablet: true,
			bundleIdentifier: 'com.movieapp.firebase',
			googleServicesFile: process.env.GOOGLE_SERVICES_INFOPLIST,
		},
		android: {
			adaptiveIcon: {
				foregroundImage: './assets/images/logo.png',
				backgroundColor: '#ffffff',
			},
			package: 'com.movieapp.firebase',
			googleServicesFile: process.env.GOOGLE_SERVICES_JSON,
			emulator: true,
		},
		web: {
			bundler: 'metro',
			output: 'static',
			favicon: './assets/images/favicon.png',
		},
		plugins: ['expo-router', '@react-native-google-signin/google-signin'],
		experiments: {
			typedRoutes: true,
		},
		extra: {
			router: {
				origin: false,
			},
			eas: {
				projectId: 'b52ba664-3774-499b-b4b6-5e0f056fb999',
			},
		},
	},
};
