import {
	Button,
	Image,
	ImageBackground,
	ScrollView,
	StyleSheet,
	TouchableOpacity,
} from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	RootState,
	fetchMoviesDiscover,
	fetchMoviesTrending,
	fetchTrendingMoviesToday,
} from '@/store';

import { AppDispatch } from '@/store';
import HorzintalScroll from '@/components/HorzintalScroll';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';

/**
 * Renders the Tab One screen.
 */
export default function TabOneScreen() {
	const dispatch: AppDispatch = useDispatch();
	const { discoverMovies } = useSelector(
		(state: RootState) => state.discoverMovies
	);
	const { trendingMoviesToday } = useSelector(
		(state: RootState) => state.trendingMoviesToday
	);
	const { trendingMovies } = useSelector(
		(state: RootState) => state.trendingMovies
	);

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

	useEffect(() => {
		dispatch(fetchMoviesDiscover());
		dispatch(fetchMoviesTrending());
		dispatch(fetchTrendingMoviesToday());
	}, []);

	const dataCheck = () => {
		if (
			discoverMovies?.data &&
			discoverMovies.status != 'loading' &&
			trendingMoviesToday?.data &&
			trendingMoviesToday.status != 'loading' &&
			trendingMovies?.data &&
			trendingMovies.status != 'loading'
		) {
			return true;
		}
		return false;
	};
	return (
		<>
			{dataCheck() ? (
				<View style={tabStyles.container}>
					<Text style={tabStyles.title}>Loading...</Text>
				</View>
			) : (
				<SafeAreaView>
					<ScrollView>
					
					<View style={{marginTop: 0}}>
						<View style={{display: 'flex'}}>
							<View style={{marginBottom: -40, zIndex: 2, paddingHorizontal: 15, backgroundColor: 'transparent', display: 'flex', flexDirection: 'row', flex: 1}}>
							<View style={{display: 'flex', flex: 1,backgroundColor: 'transparent'}}>
								<Image style={{width: 70, height: 30}} source={{uri: "https://upload.wikimedia.org/wikipedia/commons/f/fd/Netflix-Logo.png"}} />
							</View>
							<View style={{
								
								display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent'}}>
								<Image style={{width: 25, height: 25}} source={{uri: "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"}} />
							</View>
						</View>
						<ImageBackground style={{width: '100%', height: 275, zIndex:1}} source={{uri: 'https://i0.wp.com/thinkmonsters.com/speakinghuman/media/wp-content/uploads/John-Wick-Posters-Rule.jpg?fit=1280%2C640&ssl=1'}} >
							<View style={{backgroundColor: 'transparent', display: 'flex', flex: 1, justifyContent: 'flex-end'}}>
								<View style={{backgroundColor: 'transparent', marginLeft:20, marginBottom: 20}}>
									<Text style={{color: 'white', fontFamily: 'PoppinsBold', fontSize:18}}>John Wick</Text>
									<View style={{display: 'flex', flexDirection: 'row', backgroundColor: 'transparent'}}>
										<Text style={{paddingHorizontal: 20, paddingVertical: 1.5, color: 'white', borderWidth: 1, borderColor: 'white', fontSize: 12, fontFamily: 'PoppinsMedium', display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: 5}}>EN | 7.2</Text>
										<Text  style={{paddingHorizontal: 20, paddingVertical: 1.5, color: 'white', borderWidth: 1, borderColor: 'white', fontSize: 12, fontFamily: 'PoppinsMedium', marginLeft: 10, paddingTop: 5}}>UA</Text>
									</View>
								</View>
							</View>
						</ImageBackground>
						</View>
					</View>
						
					{/* <View
						style={{
							backgroundColor: 'transparent',
							borderColor: '#1C2128',
							borderWidth: 1,
							display: 'flex',
							flexDirection: 'row',
							marginTop: 40,
							marginHorizontal: 10,
							padding: 3,
							borderRadius: 10,
						}}>
						<TouchableOpacity
							style={{
								display: 'flex',
								justifyContent: 'center',
								flex: 1,
								backgroundColor: '#1C2128',
								padding: 10,
								borderRadius: 6,
							}}>
							<Text
								style={{ color: 'white', fontSize: 12, textAlign: 'center' }}>
								Movies
							</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={{ display: 'flex', justifyContent: 'center', flex: 1 }}>
							<Text
								style={{ color: 'white', fontSize: 12, textAlign: 'center' }}>
								Series
							</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={{ display: 'flex', justifyContent: 'center', flex: 1 }}>
							<Text
								style={{ color: 'white', fontSize: 12, textAlign: 'center' }}>
								Anime
							</Text>
						</TouchableOpacity>
					</View> */}
					<HorzintalScroll movies={discoverMovies} title={'Top Trending'} />
					<HorzintalScroll
						movies={trendingMoviesToday}
						title={'Fresh Picks for You'}
					/>
					<HorzintalScroll
						movies={trendingMovies}
						title={'Best of Decade'}
					/>
				</ScrollView>
				</SafeAreaView>
				// <ScrollView>
				// 	<HorzintalScroll movies={discoverMovies} title={'Discover Movies'} />
				// 	<HorzintalScroll
				// 		movies={trendingMoviesToday}
				// 		title={'Discover Movies'}
				// 	/>
				// 	<HorzintalScroll
				// 		movies={trendingMovies}
				// 		title={'Trending Movies Today'}
				// 	/>
				// </ScrollView>
			)}
		</>
	);
}

export const tabStyles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#000000',
		paddingTop: 10,
	},
	title: {
		fontSize: 18,
	},
	heading: {
		fontSize: 12,
		marginLeft: 18,
		color: '#e5e5e5',
		borderBottomColor: '#a9a9a9',
		fontFamily: 'PoppinsMedium',
	},
	imageCard: {
		width: 230,
		height: 130,
		// borderRadius: 10,
	},
	trendingView: {
		// marginTop: 15,
		marginLeft: 12,
		flexWrap: 'wrap',
	},
	movieContainer: {
		margin: 5,
		// height: 230,
		backgroundColor: '#131820',
		// borderRadius: 12,
		padding: 4,
	},
	movieDetail: {
		display: 'flex',
		flexDirection: 'row',
		backgroundColor: 'transparent',
		justifyContent: 'center',
		alignItems: 'center',
		paddingVertical: 2,
		paddingBottom: 2,
	},
	movieTitle: {
		color: '#fff',
		fontSize: 10,
		marginTop: 5,
		display: 'flex',
		flex: 1,
		fontFamily: 'PoppinsMedium',
		marginLeft: 2
	},
	movieOL:{
		color: '#FDFD96',
		fontSize: 8,
		marginTop: 5,
		borderWidth: 1,
		borderColor: '#FDFD96',
		borderRadius: 3,
		padding: 4,
		paddingVertical: 1,
		display: 'flex',
		paddingTop: 4,
		textAlign: 'center',
		fontFamily: 'PoppinsMedium',
		marginRight: 4
	},
	movieRU: {
		backgroundColor: 'transparent',
		display: 'flex',
		flexDirection: 'row',
	},
	movieR: {
		color: '#FF6962',
		fontSize: 8,
		marginTop: 5,
		borderWidth: 1,
		borderColor: '#FF6962',
		borderRadius: 3,
		padding: 4,
		paddingVertical: 1,
		display: 'flex',
		paddingTop: 4,
		textAlign: 'center',
		fontFamily: 'PoppinsMedium',
		marginRight: 4
	},
	movieU: {
		color: '#77DD76',
		fontSize: 8,
		marginTop: 5,
		borderWidth: 1,
		borderColor: '#77DD76',
		borderRadius: 3,
		padding: 4,
		paddingVertical: 1,
		display: 'flex',
		paddingTop: 4,
		textAlign: 'center',
		fontFamily: 'PoppinsMedium',
		marginRight: 4
	},
});
