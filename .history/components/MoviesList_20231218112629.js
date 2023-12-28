// File: MovieList.js
import React, { useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import MovieData from './MovieData'; // Import thành phần MovieData

const MovieList = () => {
  const [movies, setMovies] = useState([]);

  // Hàm này được sử dụng để cập nhật state với dữ liệu phim từ MovieData
  const onDataReceived = (moviesData) => {
    setMovies(moviesData);
  };

  return (
    <View>
      {/* Thành phần MovieData để lấy dữ liệu */}
      <MovieData onDataReceived={onDataReceived} />

      {/* Hiển thị danh sách các bộ phim */}
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text>{item.title}</Text>
            {/* Hiển thị các thông tin khác của bộ phim */}
          </View>
        )}
      />
    </View>
  );
};

export default MovieList;
