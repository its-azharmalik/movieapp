import React, { Component } from 'react';
import { Text, View } from './Themed';
import { tabStyles } from '@/app/(tabs)/movies';
import { Image, ScrollView } from 'react-native';

export default function HorzintalScroll({
	movies,
	title,
}: {
	movies: any;
	title: string;
}) {
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
								uri: `http://image.tmdb.org/t/p/w500${movie?.poster_path}`,
							}}
						/>
						<View style={tabStyles.movieDetail}>
							<Text style={tabStyles.movieTitle}>{movie.original_title}</Text>
							<View style={tabStyles.movieRU}>
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
