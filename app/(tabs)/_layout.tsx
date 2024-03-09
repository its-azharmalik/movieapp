import React, { useEffect, useState } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Redirect, Tabs, router } from 'expo-router';
import { Pressable } from 'react-native';
import { GoHomeFill } from "react-icons/go";

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import { Text } from '@/components/Themed';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign, Entypo, Feather, MaterialIcons, Octicons } from '@expo/vector-icons';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
	name: React.ComponentProps<typeof FontAwesome>['name'] |  React.ComponentProps<typeof Feather>['name'] | React.ComponentProps<typeof Octicons>['name'] | React.ComponentProps<typeof MaterialIcons>['name'] | React.ComponentProps<typeof GoHomeFill>['name'] | string;
	color: string;
}) {
	switch (props.name) {
		case 'home':
			// @ts-ignore
			return <AntDesign size={28} style={{ marginBottom: -3 }} {...props} />;
		case 'account-circle':
			// @ts-ignore
			return <MaterialIcons size={28} style={{ marginBottom: -3 }} {...props} />;
		case 'video':
			// @ts-ignore
			return <Entypo size={28} style={{ marginBottom: -3 }} {...props} />;
		case 'tv':
			// @ts-ignore
			return <Feather size={28} style={{ marginBottom: -3 }} {...props} />;
		default:
			// @ts-ignore
			return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
	}
}

export default function TabLayout() {
	const colorScheme = useColorScheme();

	// logic to persist user
	const redirectFn = async () => {
		const user = await AsyncStorage.getItem('user');
		if (!user) router.replace('/signin');
	};

	useEffect((): any => {
		redirectFn();
	}, []);

	// This layout can be deferred because it's not the root layout.
	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
				tabBarStyle: {
					backgroundColor: 'rgba(32,33,35,0.5)',
					

					// borderBlockColor: Colors['dark'].background,
					// borderCurve: 'circular',
					// borderTopLeftRadius: 15,
					// borderTopRightRadius: 15,
					// paddingTop: 10,
				},
				tabBarLabelStyle: {
					display: 'none',
				},
				// Disable the static render of the header on web
				// to prevent a hydration error in React Navigation v6.
				headerShown: false,
			}}>
			<Tabs.Screen
				name='home'
				options={{
					// title: 'Home',
					tabBarIcon: ({ color }) => <TabBarIcon name='home' color={color} />,
				}}
			/>
			<Tabs.Screen
				name='movies'
				options={{
					title: 'Movies',
					tabBarIcon: ({ color }) => <TabBarIcon name='video' color={color} />,
				}}
			/>
			<Tabs.Screen
				name='tv'
				options={{
					title: 'Series',
					tabBarIcon: ({ color }) => <TabBarIcon name='tv' color={color} />,
				}}
			/>
			<Tabs.Screen
				name='profile'
				options={{
					title: 'Profile',
					tabBarIcon: ({ color }) => <TabBarIcon name='account-circle' color={color} />,
					headerRight: () => (
						<Link href='/modal' asChild>
							<Pressable>
								{({ pressed }) => (
									<FontAwesome
										name='info-circle'
										size={25}
										color={Colors[colorScheme ?? 'light'].text}
										style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
									/>
								)}
							</Pressable>
						</Link>
					),
				}}
			/>
		</Tabs>
	);
}
