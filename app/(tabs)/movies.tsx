import {
	Button,
	Image,
	ScrollView,
	StyleSheet,
	TouchableOpacity,
} from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	RootState,
	fetchMoviesDiscover,
	fetchMoviesTrending,
	fetchTrendingMoviesToday,
} from '@/store';

import { AppDispatch } from '@/store';
import HorzintalScroll from '@/components/HorzintalScroll';

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
				<ScrollView>
					<View
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
					</View>
					<HorzintalScroll movies={discoverMovies} title={'Discover Movies'} />
					<HorzintalScroll
						movies={trendingMoviesToday}
						title={'Discover Movies'}
					/>
					<HorzintalScroll
						movies={trendingMovies}
						title={'Trending Movies Today'}
					/>
				</ScrollView>
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
		backgroundColor: '#090E12',
		paddingTop: 10,
	},
	title: {
		fontSize: 18,
	},
	heading: {
		fontSize: 18,
		marginLeft: 16,
		paddingBottom: -10,
		color: '#a9a9a9',
		borderBottomColor: '#a9a9a9',
	},
	imageCard: {
		width: 150,
		height: 230,
		borderRadius: 10,
	},
	trendingView: {
		marginTop: 15,
		marginLeft: 12,
		flexWrap: 'wrap',
	},
	movieContainer: {
		margin: 5,
		// height: 230,
		backgroundColor: '#131820',
		borderRadius: 12,
		padding: 6,
	},
	movieDetail: {
		display: 'flex',
		flexDirection: 'row',
		backgroundColor: 'transparent',
		justifyContent: 'center',
		alignItems: 'center',
		paddingVertical: 2,
	},
	movieTitle: {
		color: '#fff',
		fontSize: 12,
		marginTop: 5,
		display: 'flex',
		flex: 1,
	},
	movieRU: {
		backgroundColor: 'transparent',
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
		textAlign: 'center',
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
		textAlign: 'center',
	},
});
