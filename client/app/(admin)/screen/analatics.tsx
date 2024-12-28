import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Line, Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement
);

const Analytics = () => {
  // Line Chart Data
  const lineData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Sales Performance',
        data: [15000, 18000, 17000, 22000, 21000, 24000],
        borderColor: 'blue',
        backgroundColor: 'rgba(0, 123, 255, 0.5)',
        borderWidth: 2,
        pointBackgroundColor: 'white',
        pointBorderColor: 'blue',
        pointRadius: 5,
        tension: 0.4,
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Monthly Sales Performance',
      },
    },
  };

  // Pie Chart Data
  const pieData = {
    labels: ['18-24', '25-34', '35-44', '45-54', '55+'],
    datasets: [
      {
        data: [30, 40, 15, 10, 5],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'right' as const,
      },
      title: {
        display: true,
        text: 'Age Demographic of Consumers',
      },
    },
  };

  // Bar Chart Data
  const barData = {
    labels: ['2019', '2020', '2021', '2022', '2023'],
    datasets: [
      {
        label: 'Tax Collected (LKR)',
        data: [12000, 15000, 18000, 20000, 25000],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
        borderWidth: 1,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Tax Collected Per Year',
      },
    },
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Analytics</Text>
      <View style={styles.chartsContainer}>
        <View style={styles.chartBox}>
          <Line data={lineData} options={lineOptions} />
        </View>
        <View style={styles.chartBox}>
          <Pie data={pieData} options={pieOptions} />
        </View>
        <View style={styles.chartBox}>
          <Bar data={barData} options={barOptions} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  chartsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  chartBox: {
    width: '45%', // Adjust to ensure all charts fit on one screen
    height: 200,
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
});

export default Analytics;