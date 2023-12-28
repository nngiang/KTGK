import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const MovieDetailScreen = ({ route }) => {
  const [movie, setMovie] = useState(null);
  const movieId = route.params.movieId;

  useEffect(() => {
    const unsubscribe = firestore().collection('movies')
      .doc(movieId)
      .onSnapshot((doc) => {
        if (doc.exists) {
          setMovie(doc.data());
        } else {
          console.log('No such document!');
        }
      });

    return () => unsubscribe();
  }, [movieId]);

  if (!movie) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: movie.image }} style={styles.image} />
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{movie.title}</Text>
        <Text style={styles.director}>Director: {movie.director}</Text>
        <Text style={styles.year}>Year: {movie.year}</Text>
        <Text style={styles.description}>{movie.description}</Text>
        {/* Hiển thị các thông tin khác về bộ phim tại đây nếu cần */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  detailsContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  director: {
    fontSize: 18,
    marginBottom: 5,
  },
  year: {
    fontSize: 16,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },
});

export default MovieDetailS;
