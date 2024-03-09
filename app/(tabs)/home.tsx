import {
	Image,
	ImageBackground,
	Pressable,
	ScrollView,
	StyleSheet,
} from 'react-native';

import { Text, View } from '@/components/Themed';
import { useEffect, useState } from 'react';
import {
	AppDispatch,
	RootState,
	fetchMoviesDiscover,
	fetchMoviesTrending,
	fetchSeriesDiscover,
	fetchSeriesTrending,
	fetchTrendingMoviesToday,
	fetchTrendingSeriesToday,
} from '@/store';
import { useDispatch, useSelector } from 'react-redux';

import HorzintalScroll from '@/components/HorzintalScroll';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import HeroComponent from '@/components/HeroComponent';
import { tabStyles } from '../styles';

export default function TabTwoScreen() {
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

	const { discoverSeries } = useSelector(
		(state: RootState) => state.discoverSeries
	);

	const { trendingSeriesToday } = useSelector(
		(state: RootState) => state.trendingSeriesToday
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
		dispatch(fetchSeriesDiscover());
		dispatch(fetchTrendingSeriesToday());
	}, []);

	const dataCheck = () => {
		if (
			discoverMovies?.data &&
			discoverMovies.status != 'loading' &&
			trendingMoviesToday?.data &&
			trendingMoviesToday.status != 'loading' &&
			trendingMovies?.data &&
			trendingMovies.status != 'loading' &&
			discoverSeries?.data &&
			discoverSeries.status != 'loading' &&
			trendingSeriesToday?.data &&
			trendingSeriesToday.status != 'loading'
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
						<View style={{ marginTop: -30, backgroundColor: 'transparent' }}>
							<HeroComponent movie={discoverMovies?.results[0]} />
						</View>

						<HorzintalScroll
							movies={trendingMoviesToday}
							title={'Top Trending Movies'}
						/>
						<HorzintalScroll
							movies={discoverMovies}
							title={'Fresh Picks for You'}
						/>
						<HorzintalScroll
							movies={discoverSeries}
							title={'Latest TV Shows'}
						/>
						<HorzintalScroll
							movies={trendingSeriesToday}
							title={'Best of Week'}
						/>
					</ScrollView>
				</SafeAreaView>
			)}
		</>
	);
}
