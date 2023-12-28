import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import firestore from '@react-native-firebase/firestore';
import { useRoute } from '@react-navigation/native';

const PaymentScreen = () => {
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [qrCodeData, setQRCodeData] = useState('');
  const route = useRoute();
  const [movieDetails, setMovieDetails] = useState(null);
  const { movieTitle, selectedSeats, movieIMG } = route.params;
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedBank, setSelectedBank] = useState(null);

  useEffect(() => {
    const calculateTotalPrice = () => {
      return selectedSeats.reduce((acc, seat) => {
        switch (seat.type) {
          case 'VIP':
            return acc + 179000;
          case 'Low':
            return acc + 110000;
          default:
            return acc + 139000;
        }
      }, 0);
    };

    setTotalPrice(calculateTotalPrice());
  }, [selectedSeats]);

  const generateQRCodeData = () => {
    const randomNumber = Math.floor(Math.random() * 1000000) + 1;
    return `${randomNumber}`;
  };

  const handlePayment = () => {
    const generatedQRCodeData = generateQRCodeData();
    setQRCodeData(generatedQRCodeData);
    setPaymentCompleted(true);
  };

  return (
    <View style={styles.container}>
      {paymentCompleted ? (
        <View>
          <Image source={{ uri: movieIMG }} style={styles.image} />
          <Text style={styles.headerText}>Thông tin đặt vé</Text>
          <View style={styles.paymentDetails}>
            <Text style={styles.detailTitle}>Tên Phim:</Text>
            <Text style={styles.detailText}>{movieTitle}</Text>
            <Text style={styles.detailTitle}>Ghế Đã Chọn:</Text>
            {selectedSeats.map((seat, index) => (
              <Text key={index} style={styles.detailText}>{`${seat.row}${seat.number}`}</Text>
            ))}
            <Text style={styles.detailTitle}>Tổng Cộng:</Text>
            <Text style={styles.detailText}>{totalPrice.toLocaleString('en-US')} VND</Text>
            <Text style={styles.detailTitle}>Mã Code:</Text>
            <Text style={styles.detailText}>{qrCodeData}</Text>
            <QRCode value={qrCodeData} size={200} />
          </View>
        </View>
      ) : (
        <View>
          <View style={styles.bankButtonsContainer}>
            <TouchableOpacity
              style={[
                styles.bankButton,
                selectedBank === 'Vietcombank' && styles.selectedBank,
              ]}
              onPress={() => setSelectedBank('Vietcombank')}>
              <Text style={styles.bankButtonText}>Vietcombank</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.bankButton,
                selectedBank === 'BIDV' && styles.selectedBank,
              ]}
              onPress={() => setSelectedBank('BIDV')}>
              <Text style={styles.bankButtonText}>BIDV</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.bankButton,
                selectedBank === 'Techcombank' && styles.selectedBank,
              ]}
              onPress={() => setSelectedBank('Techcombank')}>
              <Text style={styles.bankButtonText}>Techcombank</Text>
            </TouchableOpacity>
          </View>
          
          <Text style={styles.headerText}>Thanh Toán</Text>
          <TouchableOpacity style={styles.payButton} onPress={handlePayment}>
            <Text style={styles.payButtonText}>Thanh Toán Ngay</Text>
          </TouchableOpacity>
        </View>
      )}
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
  paymentDetails: {
    width: '80%',
  },
  detailTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  detailText: {
    marginBottom: 5,
  },
  payButton: {
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  payButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  bankButtonsContainer: {

    justifyContent: 'space-around',
    marginTop: 20,
    width: '80%',
  },
  bankButton: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    width: '30%',
  },
  bankButtonText: {
    fontWeight: 'bold',
  },
  selectedBank: {
    backgroundColor: 'blue',
  },
});

export default PaymentScreen;
