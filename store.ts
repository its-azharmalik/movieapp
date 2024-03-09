import { GoogleSignin } from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
	configureStore,
	createAsyncThunk,
	createSlice,
} from '@reduxjs/toolkit';
import { router } from 'expo-router';
import axios from 'axios';

type Movie = {
	adult: boolean;
	backdrop_path: string;
	genre_ids: Array<number>;
	id: number;
	original_language: string;
	original_title: string;
	overview: string;
	popularity: number;
	poster_path: string;
	release_date: string;
	title: string;
	video: boolean;
	vote_average: number;
	vote_count: number;
};

type MoviesResponse = {
	page: number;
	results: Array<Movie>;
};

type Series = {
	adult: boolean;
	backdrop_path: string;
	first_air_date: string;
	genre_ids: Array<number>;
	id: number;
	name: string;
	origin_country: Array<string>;
	original_language: string;
	original_name: string;
	overview: string;
	popularity: number;
	poster_path: string;
	vote_average: number;
	vote_count: number;
};

type SeriesResponse = {
	page: number;
	results: Array<Series>;
};

export type StateTypes = {
	discoverMovies: MoviesResponse | null;
	discoverSeries: SeriesResponse | null;
	trendingMovies: MoviesResponse | null;
	trendingSeries: SeriesResponse | null;
	trendingMoviesToday: MoviesResponse | null;
	trendingSeriesToday: SeriesResponse | null;
	status: 'idle' | 'loading' | 'succeeded' | 'failed';
	error: string | undefined;
};

const initialState: StateTypes = {
	discoverMovies: null,
	discoverSeries: null,
	trendingMovies: null,
	trendingMoviesToday: null,

	trendingSeries: null,
	trendingSeriesToday: null,

	status: 'idle',
	error: undefined,
};

const BEARER_TOKEN =
	'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMWQ3NDk4ZGJkNGMyMTAzNTNiOTJkOTNmZTUzNGZiMCIsInN1YiI6IjY1ZWI3NmM5OTUxMmUxMDEzMGYxMzllNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gCO5kuhf9TFa9GG0eDTHMkIxNbCQbcEEkcQ6lF357Hc'; // replace with your bearer token

// Discover Movies and Series
export const fetchMoviesDiscover = createAsyncThunk('fetchMovies', async () => {
	const response = await axios.get(
		'https://api.themoviedb.org/3/discover/movie',
		{
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${BEARER_TOKEN}`,
			},
		}
	);

	return response.data;
});

export const fetchSeriesDiscover = createAsyncThunk('fetchSeries', async () => {
	const response = await axios.get('https://api.themoviedb.org/3/discover/tv', {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${BEARER_TOKEN}`,
		},
	});
	return response.data;
});

// Trending Movies and Series This Week
export const fetchMoviesTrending = createAsyncThunk('fetchMovies', async () => {
	const response = await axios.get(
		'https://api.themoviedb.org/3/trending/movie/week',
		{
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${BEARER_TOKEN}`,
			},
		}
	);
	return response.data;
});

export const fetchSeriesTrending = createAsyncThunk('fetchSeries', async () => {
	const response = await axios.get(
		'https://api.themoviedb.org/3/trending/tv/week',
		{
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${BEARER_TOKEN}`,
			},
		}
	);
	return response.data;
});

// Trending Movies and Series Today
export const fetchTrendingMoviesToday = createAsyncThunk(
	'fetchTrendingMoviesToday',
	async () => {
		const response = await axios.get(
			'https://api.themoviedb.org/3/trending/movie/day',
			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${BEARER_TOKEN}`,
				},
			}
		);
		return response.data;
	}
);

export const fetchTrendingSeriesToday = createAsyncThunk(
	'fetchTrendingSeriesToday',
	async () => {
		const response = await axios.get(
			'https://api.themoviedb.org/3/trending/tv/day',
			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${BEARER_TOKEN}`,
				},
			}
		);
		return response.data;
	}
);

export const fetchTopRatedMovies = createAsyncThunk(
	'fetchTopRatedMovies',
	async () => {
		const response = await axios.get(
			'https://api.themoviedb.org/3/movie/top_rated',
			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${BEARER_TOKEN}`,
				},
			}
		);
		return response.data;
	}
);

export const fetchUpcomingMovies = createAsyncThunk(
	'fetchUpcomingMovies',
	async () => {
		const response = await axios.get(
			'https://api.themoviedb.org/3/movie/upcoming',
			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${BEARER_TOKEN}`,
				},
			}
		);
		return response.data;
	}
);

const createCustomSlice = (
	name: string,
	initialState: any,
	reducers: any,
	payload: any,
	fetchFunction: any
) => {
	return createSlice({
		name,
		initialState,
		reducers,
		extraReducers: (builder) => {
			builder
				.addCase(fetchFunction.pending, (state) => {
					state.status = 'loading';
				})
				.addCase(fetchFunction.fulfilled, (state, action) => {
					state.status = 'succeeded';
					state[payload] = action.payload;
				})
				.addCase(fetchFunction.rejected, (state, action) => {
					state.status = 'failed';
					state.error = action.error.message;
				});
		},
	});
};

const discoverMoviesSlice = createCustomSlice(
	'discoverMovies',
	initialState,
	{},
	'discoverMovies',
	fetchMoviesDiscover
);

const discoverSeriesSlice = createCustomSlice(
	'discoverSeries',
	initialState,
	{},
	'discoverSeries',
	fetchSeriesDiscover
);

const trendingMoviesSlice = createCustomSlice(
	'trendingMovies',
	initialState,
	{},
	'trendingMovies',
	fetchMoviesTrending
);

const trendingSeriesSlice = createCustomSlice(
	'trendingSeries',
	initialState,
	{},
	'trendingSeries',
	fetchSeriesTrending
);

const trendingMoviesTodaySlice = createCustomSlice(
	'trendingMoviesToday',
	initialState,
	{},
	'trendingMoviesToday',
	fetchTrendingMoviesToday
);

const trendingSeriesTodaySlice = createCustomSlice(
	'trendingSeriesToday',
	initialState,
	{},
	'trendingSeriesToday',
	fetchTrendingSeriesToday
);

const topRatedMoviesSlice = createCustomSlice(
	'topRatedMovies',
	initialState,
	{},
	'topRatedMovies',
	fetchTopRatedMovies
);

const upcomingMoviesSlice = createCustomSlice(
	'upcomingMovies',
	initialState,
	{},
	'upcomingMovies',
	fetchUpcomingMovies
);

export const store = configureStore({
	reducer: {
		discoverMovies: discoverMoviesSlice.reducer,
		discoverSeries: discoverSeriesSlice.reducer,
		trendingMovies: trendingMoviesSlice.reducer,
		trendingSeries: trendingSeriesSlice.reducer,
		trendingMoviesToday: trendingMoviesTodaySlice.reducer,
		trendingSeriesToday: trendingSeriesTodaySlice.reducer,
		topRatedMovies: topRatedMoviesSlice.reducer,
		upcomingMovies: upcomingMoviesSlice.reducer,
	},
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
