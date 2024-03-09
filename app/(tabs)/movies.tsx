import {
	Image,
	ImageBackground,
	Pressable,
	ScrollView,
	StyleSheet,
} from 'react-native';

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
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import HeroComponent from '@/components/HeroComponent';
import { tabStyles } from '../styles';

/**
 * Renders the Tab One screen.
 */
export default function TabTwoScreen() {
	const dispatch: AppDispatch = useDispatch();
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
	const { discoverMovies } = useSelector(
		(state: RootState) => state.discoverMovies
	);

	const { trendingMovies } = useSelector(
		(state: RootState) => state.trendingMovies
	);

	const { trendingMoviesToday } = useSelector(
		(state: RootState) => state.trendingMoviesToday
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
			trendingMovies?.data &&
			trendingMovies.status != 'loading' &&
			trendingMoviesToday?.data &&
			trendingMoviesToday.status != 'loading'
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
							title={'Trending Now'}
						/>
						<HorzintalScroll
							movies={trendingMovies}
							title={'Best of this Week'}
						/>
						<HorzintalScroll
							movies={discoverMovies}
							title={'Best Picks for You'}
						/>
					</ScrollView>
				</SafeAreaView>
			)}
		</>
	);
}
