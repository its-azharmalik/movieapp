import {
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
} from "react-native";

import { Text, View } from "@/components/Themed";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  RootState,
  fetchMoviesDiscover,
  fetchMoviesTrending,
  fetchTrendingMoviesToday,
} from "@/store";

import { AppDispatch } from "@/store";
import HorzintalScroll from "@/components/HorzintalScroll";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import HeroComponent from "@/components/HeroComponent";

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
    const userData = await AsyncStorage.getItem("user");
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
      discoverMovies.status != "loading" &&
      trendingMovies?.data &&
      trendingMovies.status != "loading" &&
      trendingMoviesToday?.data &&
      trendingMoviesToday.status != "loading"
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
		  <View style={{marginTop: -30, backgroundColor: 'transparent'}}>
				<HeroComponent movie={discoverMovies?.results[0]} />
			</View>
         
			<HorzintalScroll
              movies={trendingMoviesToday}
              title={"Trending Now"}
            />
            <HorzintalScroll
              movies={trendingMovies}
              title={"Best of this Week"}
            />
            <HorzintalScroll
              movies={discoverMovies}
              title={"Best Picks for You"}
            />
       
          </ScrollView>
        </SafeAreaView>
      )}
    </>
  );
}

export const tabStyles = StyleSheet.create({
  heroTabs: {
    paddingHorizontal: 20,
    paddingVertical: 1.5,
    color: "white",
    borderWidth: 0,
    borderColor: "white",
    fontSize: 12,
    fontFamily: "PoppinsMedium",
    backgroundColor: "rgba(255,255,255,0.1)",
    marginLeft: 10,
    paddingTop: 5,
    borderRadius: 5,
  },
  container: {
    flex: 1,
    backgroundColor: "#000000",
    paddingTop: 10,
  },
  title: {
    fontSize: 18,
  },
  heading: {
    fontSize: 12,
    marginLeft: 18,
    color: "#e5e5e5",
    borderBottomColor: "#a9a9a9",
    fontFamily: "PoppinsMedium",
  },
  imageCard: {
    width: 230,
    height: 130,
    // borderRadius: 10,
  },
  trendingView: {
    // marginTop: 15,
    marginLeft: 12,
    flexWrap: "wrap",
  },
  movieContainer: {
    margin: 5,
    // height: 230,
    backgroundColor: "#131820",
    // borderRadius: 12,
    padding: 4,
  },
  movieDetail: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 2,
    paddingBottom: 2,
  },
  movieTitle: {
    color: "#fff",
    fontSize: 10,
    marginTop: 5,
    display: "flex",
    flex: 1,
    fontFamily: "PoppinsMedium",
    marginLeft: 2,
  },
  movieOL: {
    color: "#FDFD96",
    fontSize: 8,
    marginTop: 5,
    borderWidth: 1,
    borderColor: "#FDFD96",
    borderRadius: 3,
    padding: 4,
    paddingVertical: 1,
    display: "flex",
    paddingTop: 4,
    textAlign: "center",
    fontFamily: "PoppinsMedium",
    marginRight: 4,
  },
  movieRU: {
    backgroundColor: "transparent",
    display: "flex",
    flexDirection: "row",
  },
  movieR: {
    color: "#FF6962",
    fontSize: 8,
    marginTop: 5,
    borderWidth: 1,
    borderColor: "#FF6962",
    borderRadius: 3,
    padding: 4,
    paddingVertical: 1,
    display: "flex",
    paddingTop: 4,
    textAlign: "center",
    fontFamily: "PoppinsMedium",
    marginRight: 4,
  },
  movieU: {
    color: "#77DD76",
    fontSize: 8,
    marginTop: 5,
    borderWidth: 1,
    borderColor: "#77DD76",
    borderRadius: 3,
    padding: 4,
    paddingVertical: 1,
    display: "flex",
    paddingTop: 4,
    textAlign: "center",
    fontFamily: "PoppinsMedium",
    marginRight: 4,
  },
});
