import React from "react";
import { Line, Pie, Bar } from "react-chartjs-2";
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
  ChartOptions,
} from "chart.js";

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

const SalesChart: React.FC = () => {
  // Line Chart Data
  const lineData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Sales Performance",
        data: [15000, 18000, 17000, 22000, 21000, 24000],
        borderColor: "blue",
        backgroundColor: "rgba(0, 123, 255, 0.5)",
        borderWidth: 2,
        pointBackgroundColor: "white",
        pointBorderColor: "blue",
        pointRadius: 5,
        tension: 0.4,
      },
    ],
  };

  const lineOptions: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      title: {
        display: true,
        text: "Monthly Sales Performance",
        font: {
          size: 16,
          weight: "bold",
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Month",
          font: {
            size: 12,
          },
        },
      },
      y: {
        title: {
          display: true,
          text: "Sales (in LKR)",
          font: {
            size: 12,
          },
        },
        ticks: {
          callback: (value: number | string) => `Rs ${value}`,
        },
      },
    },
  };

  // Pie Chart Data for Age Demographic
  const pieData = {
    labels: ["18-24", "25-34", "35-44", "45-54", "55+"],
    datasets: [
      {
        label: "Age Demographic",
        data: [30, 40, 15, 10, 5],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
        hoverBackgroundColor: [
          "#FF6384CC",
          "#36A2EBCC",
          "#FFCE56CC",
          "#4BC0C0CC",
          "#9966FFCC",
        ],
      },
    ],
  };

  const pieOptions: ChartOptions<"pie"> = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "right",
      },
      title: {
        display: true,
        text: "Age Demographic of Consumers",
        font: {
          size: 16,
          weight: "bold",
        },
      },
    },
  };

  // Bar Chart Data for Tax Collected Per Year
  const barData = {
    labels: ["2019", "2020", "2021", "2022", "2023"],
    datasets: [
      {
        label: "Tax Collected (LKR)",
        data: [12000, 15000, 18000, 20000, 25000],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
        borderColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
        borderWidth: 1,
      },
    ],
  };

  const barOptions: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      title: {
        display: true,
        text: "Tax Collected Per Year",
        font: {
          size: 16,
          weight: "bold",
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Year",
          font: {
            size: 12,
          },
        },
      },
      y: {
        title: {
          display: true,
          text: "Tax Collected (in LKR)",
          font: {
            size: 12,
          },
        },
        ticks: {
          callback: (value: number | string) => `Rs ${value}`,
        },
      },
    },
  };

  // Horizontal Bar Chart Data for Payment Method Breakdown
  const paymentData = {
    labels: ["Credit Card", "Debit Card", "PayPal", "Bank Transfer", "Cash"],
    datasets: [
      {
        label: "Payment Method Breakdown",
        data: [40, 30, 15, 10, 5],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
      },
    ],
  };

  const paymentOptions: ChartOptions<"bar"> = {
    responsive: true,
    indexAxis: 'y', // This makes the bar chart horizontal
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      title: {
        display: true,
        text: "Payment Method Breakdown",
        font: {
          size: 16,
          weight: "bold",
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Percentage (%)",
          font: {
            size: 12,
          },
        },
        ticks: {
          callback: (value: number | string) => `${value}%`,
        },
      },
      y: {
        title: {
          display: true,
          text: "Payment Method",
          font: {
            size: 12,
          },
        },
      },
    },
  };
  
  return (
    <div className="h-screen overflow-y-auto bg-gray-50">
      <h1 className="text-3xl font-bold text-center py-4">Retail Store Dashboard</h1>
      <div className="flex flex-col items-center space-y-6">
        <div className="w-[70%] sm:w-[90%] md:w-[80%] lg:w-[60%] bg-white p-4 rounded shadow">
          <Line data={lineData} options={lineOptions} />
        </div>
        <div className="w-[70%] sm:w-[90%] md:w-[60%] lg:w-[40%] bg-white p-4 rounded shadow">
          <Pie data={pieData} options={pieOptions} />
        </div>
        <div className="w-[70%] sm:w-[90%] md:w-[80%] lg:w-[60%] bg-white p-4 rounded shadow">
          <Bar data={barData} options={barOptions} />
        </div>
        <div className="w-[70%] sm:w-[90%] md:w-[80%] lg:w-[60%] bg-white p-4 rounded shadow">
          <Bar data={paymentData} options={paymentOptions} />
        </div>
      </div>
    </div>
  );
};

export default SalesChart;