import FontAwesome from '@expo/vector-icons/FontAwesome';
import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider,
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, router } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

import { useColorScheme } from '@/components/useColorScheme';
import { Provider } from 'react-redux';
import { store } from '@/store';
import {
	GoogleSignin,
	statusCodes,
} from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';

export {
	// Catch any errors thrown by the Layout component.
	ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
	// Ensure that reloading on `/modal` keeps a back button present.
	initialRouteName: '/signin',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const [loaded, error] = useFonts({
		SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
		PoppinsMedium: require('../assets/fonts/Poppins-Medium.ttf'),
		PoppinsBold: require('../assets/fonts/Poppins-Bold.ttf'),
		PoppinsRegular: require('../assets/fonts/Poppins-Regular.ttf'),
		...FontAwesome.font,
	});

	// Expo Router uses Error Boundaries to catch errors in the navigation tree.
	useEffect(() => {
		if (error) throw error;
	}, [error]);

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
		}
	}, [loaded]);

	if (!loaded) {
		return null;
	}

	return <RootLayoutNav />;
}

function RootLayoutNav() {
	useEffect(() => {
		GoogleSignin.configure({
			webClientId:
				'542153129272-pg68l3i3fml0rohq5dvvldi50kbbjj8h.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
		});
	}, []);

	return (
		<Provider store={store}>
			<ThemeProvider value={DarkTheme}>
				<Stack initialRouteName='signin'>
					<Stack.Screen name='signin' options={{ headerShown: false }} />
					<Stack.Screen name='(tabs)' options={{ headerShown: false }} />
					<Stack.Screen name='modal' options={{ presentation: 'modal' }} />
				</Stack>
			</ThemeProvider>
		</Provider>
	);
}
