import { Text, View } from '@/components/Themed';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
	GoogleSignin,
	GoogleSigninButton,
	statusCodes,
} from '@react-native-google-signin/google-signin';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Image, Pressable, StyleSheet } from 'react-native';

export default function SignIn() {
	const [progress, setProgress] = useState<boolean>(false);
	const [loggedIn, setloggedIn] = useState(false);
	useEffect(() => {
		GoogleSignin.isSignedIn().then((res: any) => {
			AsyncStorage.getItem('user').then((user) => {
				console.log(
					'While running the UseEffect the user is:',
					user,
					'and he is logged in:',
					res
				);
				if (res && user) {
					router.replace('/(tabs)/movies');
				}
			});
		});
	}, []);
	const signIn = async () => {
		try {
			await GoogleSignin.hasPlayServices();
			const user = await GoogleSignin.signIn();
			console.log('User on Signin', user);
			await AsyncStorage.setItem('user', JSON.stringify(user))
				.catch((err) => {
					console.log(err);
				})
				.then(() => {
					setloggedIn(true);
					router.replace('/(tabs)/movies');
				});
		} catch (error: any) {
			if (error.code === statusCodes.SIGN_IN_CANCELLED) {
				// user cancelled the login flow
				alert('Cancel');
			} else if (error.code === statusCodes.IN_PROGRESS) {
				alert('Signin in progress');
				// operation (f.e. sign in) is in progress already
			} else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
				alert('PLAY_SERVICES_NOT_AVAILABLE');
				// play services not available or outdated
			} else {
				// some other error happened
			}
		}
	};

	return (
		<>
			<View style={styles.container}>
				<Image
					style={styles.image}
					source={require('./images/splash.png')}></Image>
				<View style={styles.signinContainer}>
					<Text
						onPress={signIn}
						disabled={progress}
						style={styles.googleButton}>
						<FontAwesome size={20} style={styles.icon} name='google' />

						<Text style={styles.googleText}> {'   '}Login with Google</Text>
					</Text>
				</View>
			</View>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#212121',
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold',
	},
	separator: {
		marginVertical: 30,
		height: 1,
		width: '80%',
	},
	image: {
		width: 500,
		height: 500,
	},
	signinContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
		backgroundColor: 'black',
		borderTopLeftRadius: 15,
		borderTopRightRadius: 15,
	},
	googleButton: {
		width: '80%',
		height: 50,
		color: 'white',
		borderRadius: 10,
		borderWidth: 0.5,
		borderColor: 'grey',
		textAlign: 'center',
		fontSize: 15,
		padding: 15,
	},
	googleText: {
		color: 'white',
		fontSize: 15,
		textAlign: 'center',
	},
	icon: { color: 'white', padding: 20 },
});
