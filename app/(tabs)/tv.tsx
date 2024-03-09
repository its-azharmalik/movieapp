import { Image, ScrollView, StyleSheet } from 'react-native';

import { Text, View } from '@/components/Themed';
import { useEffect } from 'react';
import { AppDispatch, RootState, fetchSeriesDiscover } from '@/store';
import { useDispatch, useSelector } from 'react-redux';
import { tabStyles } from './movies';
import HorzintalScroll from '@/components/HorzintalScroll';

export default function TabTwoScreen() {
	const dispatch: AppDispatch = useDispatch();
	const { discoverSeries } = useSelector(
		(state: RootState) => state.discoverSeries
	);

	useEffect(() => {
		dispatch(fetchSeriesDiscover());
	}, []);

	return (
		<>
			{discoverSeries?.data && discoverSeries.status === 'loading' ? (
				<View style={tabStyles.container}>
					<Text style={tabStyles.title}>Loading...</Text>
				</View>
			) : (
				<HorzintalScroll movies={discoverSeries} title='Discover TV Series' />
			)}
		</>
	);
}
