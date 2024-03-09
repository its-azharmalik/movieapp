import React, { Component, useEffect, useState } from 'react';
import { Text, View } from './Themed';
import { Image, ImageBackground, Pressable, ScrollView } from 'react-native';
import { useFonts } from 'expo-font';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { tabStyles } from '@/app/styles';

export default function HeroComponent({ movie }: { movie: any }) {
	const [user, setUser] = useState<any>(null);

	useEffect(() => {
		getUser();
	}, []);

	const getUser = async () => {
		const userData = await AsyncStorage.getItem('user');
		let data;
		if (userData) data = JSON.parse(userData);
		console.log(data?.user);
		setUser(data);
	};

	return (
		<SafeAreaView>
			<View style={{ marginTop: 10 }}>
				<View style={{ display: 'flex' }}>
					<View
						style={{
							marginBottom: -40,
							zIndex: 2,
							paddingHorizontal: 15,
							backgroundColor: 'transparent',
							display: 'flex',
							flexDirection: 'row',
							justifyContent: 'space-between',
							flex: 1,
						}}>
						<Pressable
							onPress={() => router.replace('/(tabs)/home')}
							style={{
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								backgroundColor: 'transparent',
							}}>
							<Image
								style={{ width: 30, height: 30 }}
								source={require('./logo.webp')}
							/>
						</Pressable>
						<Pressable
							onPress={() => router.replace('/(tabs)/profile')}
							style={{
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								backgroundColor: 'transparent',
							}}>
							<Image
								style={{ width: 30, height: 30, borderRadius: 20 }}
								source={{
									uri: user?.user?.photo,
								}}
							/>
						</Pressable>
					</View>

					<View style={{ backgroundColor: '#000' }}>
						<ImageBackground
							style={{
								width: '100%',
								height: 350,
								zIndex: 1,
								marginBottom: 11,
							}}
							src={`http://image.tmdb.org/t/p/w500${movie?.backdrop_path}`}>
							<View
								style={{
									backgroundColor: 'transparent',
									display: 'flex',
									alignItems: 'center',
									flex: 1,
									justifyContent: 'flex-end',
									zIndex: 2,
								}}>
								<View
									style={{
										backgroundColor: 'transparent',
										marginLeft: 20,
										marginBottom: 10,
									}}>
									<Text
										style={{
											color: 'white',
											fontFamily: 'PoppinsMedium',
											fontSize: 28,
											textAlign: 'center',
											marginBottom: 5,
										}}>
										{movie?.original_name
											? movie?.original_name
											: movie?.original_title}
									</Text>
									<View
										style={{
											display: 'flex',
											flexDirection: 'row',
											backgroundColor: 'transparent',
										}}>
										<Text style={tabStyles.heroTabs}>EN</Text>
										<Text style={[tabStyles.heroTabs, { color: '#FDFD96' }]}>
											{movie?.vote_average}
										</Text>
										<Text
											style={[
												tabStyles.heroTabs,
												{ color: movie?.adult ? '#FF6962' : '#77DD76' },
											]}>
											{movie?.adult ? '18+' : 'UA'}
										</Text>
									</View>
								</View>
							</View>
						</ImageBackground>
					</View>
				</View>
			</View>
		</SafeAreaView>
	);
}
