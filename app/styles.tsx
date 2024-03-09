import { StyleSheet } from 'react-native';

export const tabStyles = StyleSheet.create({
	heroTabs: {
		paddingHorizontal: 20,
		paddingVertical: 1.5,
		color: 'white',
		borderWidth: 0,
		borderColor: 'white',
		fontSize: 12,
		fontFamily: 'PoppinsMedium',
		backgroundColor: 'rgba(0,0,0,0.5)',
		marginLeft: 10,
		paddingTop: 5,
		borderRadius: 5,
	},
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
		marginLeft: 2,
	},
	movieOL: {
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
		marginRight: 4,
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
		marginRight: 4,
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
		marginRight: 4,
	},
});