import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Line, Bar, Pie, Doughnut, Radar, PolarArea } from 'react-chartjs-2';
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
  RadialLinearScale,
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
  BarElement,
  RadialLinearScale
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

  // Doughnut Chart: Monthly Gross Profit Margin
  const doughnutData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        data: [40, 50, 60, 70, 65, 75],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'right' as const,
      },
      title: {
        display: true,
        text: 'Monthly Gross Profit Margin (%)',
      },
    },
  };

  // Radar Chart: Net Sales by Gross Profit
  const radarData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Net Sales',
        data: [12000, 15000, 17000, 21000, 19000, 22000],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 2,
      },
      {
        label: 'Gross Profit',
        data: [8000, 10000, 12000, 14000, 13000, 16000],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 2,
      },
    ],
  };

  const radarOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'right' as const,
      },
      title: {
        display: true,
        text: 'Net Sales by Gross Profit',
      },
    },
  };

  // Polar Area Chart: Net Sales by Gross Profit Category
  const polarData = {
    labels: ['Category A', 'Category B', 'Category C', 'Category D'],
    datasets: [
      {
        data: [20000, 15000, 25000, 18000],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
      },
    ],
  };

  const polarOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'right' as const,
      },
      title: {
        display: true,
        text: 'Net Sales by Gross Profit Category',
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
        <View style={styles.chartBox}>
          <Doughnut data={doughnutData} options={doughnutOptions} />
        </View>
        <View style={styles.chartBox}>
          <Radar data={radarData} options={radarOptions} />
        </View>
        <View style={styles.chartBox}>
          <PolarArea data={polarData} options={polarOptions} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 1,
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
    width: '30%', // Adjust to ensure all charts fit on one screen
    height: 350,
    margin:7,
    backgroundColor: 'white',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
});

export default Analytics;
