import React, { Component } from 'react';
import { Text, View } from './Themed';
import { tabStyles } from '@/app/(tabs)/movies';
import { Image, ScrollView } from 'react-native';
import { useFonts } from 'expo-font';

export default function HorzintalScroll({
	movies,
	title,
}: {
	movies: any;
	title: string;
}) {
	const [loaded, error] = useFonts({
		SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
		PoppinsMedium: require('../assets/fonts/Poppins-Medium.ttf'),
		PoppinsBold: require('../assets/fonts/Poppins-Bold.ttf'),
		PoppinsRegular: require('../assets/fonts/Poppins-Regular.ttf'),
	});

	return (
		<View style={tabStyles.container}>
			<Text style={tabStyles.heading}>{title}</Text>
			<ScrollView
				horizontal={true}
				scrollEnabled={true}
				style={tabStyles.trendingView}>
				{movies?.results?.map((movie: any) => (
					<View key={movie?.id} style={tabStyles.movieContainer}>
						<Image
							style={tabStyles.imageCard}
							source={{
								uri: `http://image.tmdb.org/t/p/w500${movie?.backdrop_path}`,
							}}
						/>
						<View style={tabStyles.movieDetail}>
							<Text style={tabStyles.movieTitle}>{movie.original_title}</Text>
							<View style={tabStyles.movieRU}>
								<Text style={tabStyles.movieOL}>
									{movie.original_language.toUpperCase()} | {movie.vote_average}
								</Text>
								<Text style={movie.adult ? tabStyles.movieR : tabStyles.movieU}>
									{movie.adult ? '18+' : 'UA'}
								</Text>
							</View>
							
						</View>
					</View>
				))}
			</ScrollView>
		</View>
	);
}
