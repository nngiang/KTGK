import React, { useState, useEffect } from 'react';
import { View, Text, Image, Dimensions, TouchableWithoutFeedback } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

const { width, height } = Dimensions.get('window');

const NowShowingScreen = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const subscriber = firestore()
      .collection('movies')
      .limit(5)
      .onSnapshot(querySnapshot => {
        if (querySnapshot) {
          const moviesData = [];

          querySnapshot.docs.forEach(documentSnapshot => {
            moviesData.push({
              ...documentSnapshot.data(),
              key: documentSnapshot.id,
            });
          });

          setMovies(moviesData);
          setLoading(false);
        } else {
          console.log('No data available');
        }
      });

    return () => subscriber();
  }, []);

  const handleClick = (itemId) => {
    // Navigate to MovieDetailScreen with the specific itemId
    navigation.navigate('MovieDetailScreen', { movieId: itemId });
  };

  const renderItem = ({ item }) => (
    <MovieCard item={item} handleClick={handleClick} />
  );

  return (
    <View style={{ marginBottom: 8 }}>
      <Text style={{ color: 'white', fontSize: 20, marginLeft: 8, marginBottom: 5 }}>
        Trending
      </Text>
      <Carousel
        data={iten} // Use the fetched data in Carousel
       
        renderItem={({item}) => (
          <View style={styles.PlaceContainer}>
            <Image style={styles.PlaceIMG} source={{uri: item.ImageURL}} />
            <Text style={styles.PlaceTitle}>{item.Title}</Text>
            <Text style={styles.PlacePrice}>{item.Price}</Text>
          </View>
        )}
      />
    </View>
  );
}

const MovieCard = ({ item, handleClick }) => (
  <TouchableWithoutFeedback onPress={() => handleClick(item.id)}>
    <Image
      source={{ uri: item.images }}
      style={{
        width: width * 0.6,
        height: height * 0.4,
        borderRadius: 20,
      }}
    />
  </TouchableWithoutFeedback>
);

export default NowShowingScreen;
