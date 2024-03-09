import React, { useEffect, useState } from 'react';
import { Image, StyleSheet } from 'react-native';

import { MonoText } from './StyledText';
import { Text, View } from './Themed';

import Colors from '@/constants/Colors';
import {
	GoogleSignin,
	statusCodes,
} from '@react-native-google-signin/google-signin';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function EditScreenInfo({ path }: { path: string }) {
	const logout = async () => {
		try {
			await GoogleSignin.signOut().then(async () => {
				await GoogleSignin.isSignedIn().then((res: any) => {
					console.log('After the Logout the user login status is:', res);
					if (!res) router.replace('/signin');
				});
			});
		} catch (e: any) {
			console.log('Error in the Logout Block', e);
			if (e.code == statusCodes.SIGN_IN_REQUIRED) router.replace('/signin');
		}
	};

	const [user, setUser] = useState<any>(null);

	useEffect(() => {
		getUser();
	}, []);

	const getUser = async () => {
		const userData = await AsyncStorage.getItem('user');
		let data;
		if (userData) data = JSON.parse(userData);
		console.log(data.user);
		setUser(data);
	};

	return (
		<View>
			<View style={styles.helpContainer}>
				{user != '' && user != null && (
					<>
						<Image style={styles.userPic} source={{ uri: user?.user?.photo }} />
						<Text style={styles.getStartedText}>{user.user.name}</Text>
						<Text style={styles.getStartedText}>{user.user.email}</Text>
					</>
				)}
				<Text style={styles.logoutBtn} onPress={logout}>
					Logout
				</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	getStartedContainer: {
		alignItems: 'center',
		marginHorizontal: 50,
		justifyContent: 'center',
	},

	getStartedText: {
		fontSize: 17,
		lineHeight: 24,
		textAlign: 'center',
	},
	helpContainer: {
		marginTop: 15,
		marginHorizontal: 20,
		alignItems: 'center',
	},

	userPic: {
		width: 100,
		height: 100,
		borderRadius: 50,
		margin: 20,
	},
	logoutBtn: {
		color: 'red',
		marginTop: 15,
		borderColor: 'red',
		borderWidth: 1,
		width: 100,
		textAlign: 'center',
		padding: 5,
		height: 30,
		borderRadius: 10,
	},
});
