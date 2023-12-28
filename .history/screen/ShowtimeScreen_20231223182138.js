import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';

const ShowtimeScreen = () => {
  const [showtimes, setShowtimes] = useState([]);
  const navigation = useNavigation(); // Sử dụng hook useNavigation

  useEffect(() => {
    const fetchShowtimes = async () => {
      try {
        const showtimesSnapshot = await firestore().collection('showtimes').get();
        const showtimesData = showtimesSnapshot.docs.map(doc => doc.data());
        setShowtimes(showtimesData);
      } catch (error) {
        console.error('Error fetching showtimes:', error);
      }
    };

    fetchShowtimes();
  }, []);

  const handleBookTickets = (movieId, movieTitle, movieIMG) => {
    // Điều hướng đến màn hình đặt vé (BookingScreen) và chuyển dữ liệu
    navigation.navigate('BookingScreen', { movieId, movieTitle, movieIMG });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Danh sách suất chiếu</Text>
      <FlatList
        data={showtimes}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.showtimeItem}>
            <Text style={styles.showtimeText}>{`Rạp: ${item.cinema}`}</Text>
            <Text style={styles.showtimeText}>{`Ngày: ${item.date}`}</Text>
            <Text style={styles.showtimeText}>{`Giờ: ${item.time}`}</Text>
            
          </View>
          <View><
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  showtimeItem: {
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  showtimeText: {
    fontSize: 16,
    marginBottom: 5,
  },
  bookButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  bookButtonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default ShowtimeScreen;
