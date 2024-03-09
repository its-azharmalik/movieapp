import { Image, ScrollView, StyleSheet } from 'react-native';

import { Text, View } from '@/components/Themed';
import { useEffect } from 'react';
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
import { tabStyles } from './movies';
import HorzintalScroll from '@/components/HorzintalScroll';

export default function TabTwoScreen() {
	const dispatch: AppDispatch = useDispatch();

	const { discoverSeries } = useSelector(
		(state: RootState) => state.discoverSeries
	);
	const { discoverMovies } = useSelector(
		(state: RootState) => state.discoverMovies
	);

	const { trendingMovies } = useSelector(
		(state: RootState) => state.trendingMovies
	);

	const { trendingSeries } = useSelector(
		(state: RootState) => state.trendingSeries
	);

	const { trendingMoviesToday } = useSelector(
		(state: RootState) => state.trendingMoviesToday
	);

	const { trendingSeriesToday } = useSelector(
		(state: RootState) => state.trendingSeriesToday
	);

	useEffect(() => {
		dispatch(fetchSeriesDiscover());
		dispatch(fetchMoviesDiscover());
		dispatch(fetchMoviesTrending());
		dispatch(fetchSeriesTrending());
		dispatch(fetchTrendingMoviesToday());
		dispatch(fetchTrendingSeriesToday());
	}, []);

	const dataCheck = () => {
		if (
			discoverSeries?.data &&
			discoverSeries.status != 'loading' &&
			discoverMovies?.data &&
			discoverMovies.status != 'loading' &&
			trendingMovies?.data &&
			trendingMovies.status != 'loading' &&
			trendingSeries?.data &&
			trendingSeries.status != 'loading' &&
			trendingMoviesToday?.data &&
			trendingMoviesToday.status != 'loading' &&
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
				<ScrollView>
					<HorzintalScroll
						movies={trendingMovies}
						title={'Trending Movies This Week'}
					/>
					<HorzintalScroll
						movies={trendingSeries}
						title={'Trending Series This Week'}
					/>
					<HorzintalScroll
						movies={trendingSeriesToday}
						title={'Trending Series Today'}
					/>
					<HorzintalScroll movies={discoverMovies} title={'Discover Movies '} />
					<HorzintalScroll movies={discoverSeries} title={'Latest TV Teries'} />
					<HorzintalScroll
						movies={trendingMoviesToday}
						title={'Trending Movies Today'}
					/>
				</ScrollView>
			)}
		</>
	);
}
