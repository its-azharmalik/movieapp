import {
  Image,
  ImageBackground,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from "react-native";

import { Text, View } from "@/components/Themed";
import { useEffect, useState } from "react";
import {
  AppDispatch,
  RootState,
  fetchSeriesDiscover,
  fetchSeriesTrending,
  fetchTrendingSeriesToday,
} from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { tabStyles } from "./movies";
import HorzintalScroll from "@/components/HorzintalScroll";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HeroComponent from "@/components/HeroComponent";

export default function TabTwoScreen() {
  const dispatch: AppDispatch = useDispatch();



  const { discoverSeries } = useSelector(
    (state: RootState) => state.discoverSeries
  );

  const { trendingSeriesToday } = useSelector(
    (state: RootState) => state.trendingSeriesToday
  );

  const { trendingSeries } = useSelector(
    (state: RootState) => state.trendingSeries
  );

  useEffect(() => {
    dispatch(fetchSeriesDiscover());
    dispatch(fetchTrendingSeriesToday());
    dispatch(fetchSeriesTrending());
  }, []);

  const dataCheck = () => {
    if (
      discoverSeries?.data &&
      discoverSeries.status != "loading" &&
      trendingSeriesToday?.data &&
      trendingSeriesToday.status != "loading" &&
      trendingSeries?.data &&
      trendingSeries.status != "loading"
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
			<HeroComponent movie={discoverSeries?.results[0]} />
            <HorzintalScroll
              movies={trendingSeriesToday}
              title="Trending Now"
            />
            <HorzintalScroll
              movies={discoverSeries}
              title="Best Picks for You"
            />
            <HorzintalScroll
              movies={trendingSeries}
              title="Best of this Week"
            />
          </ScrollView>
        </SafeAreaView>
      )}
    </>
  );
}
