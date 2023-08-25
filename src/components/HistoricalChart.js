import React, { useEffect, useState, useRef } from "react";
import Chart from "chart.js/auto";
import { fetchHistoricalData } from "../api"; // Adjust the path based on your project structure
import { useSelector } from "react-redux";

const HistoricalChart = ({ targetCurrencies }) => {
  const chartRef = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);
  const [data, setData] = useState({});

  const { darkMode } = useSelector((state) => state.mode);

  useEffect(() => {
    const fetchHistoricalExchangeRates = async () => {
      const currentDate = new Date(); // Today's date

      const historicalDataPromises = [];
      for (let i = 0; i < 7; i++) {
        const date = new Date(currentDate);
        date.setDate(currentDate.getDate() - i); // Subtract days to get historical dates
        const dateStr = date.toISOString().split("T")[0];

        const historicalData = fetchHistoricalData(dateStr);
        historicalDataPromises.push(historicalData);
      }

      Promise.all(historicalDataPromises)
        .then((responses) => {
          const historicalRates = responses.map((response) => ({
            date: response.date,
            rates: response.rates,
          }));
          setData(historicalRates);
        })
        .catch((error) => {
          console.error(error);
        });
    };
    // fetchHistoricalExchangeRates();
  }, []);

  // useEffect(() => {
  //   console.log(targetCurrencies, "Somu");
  // }, [targetCurrencies]);

  useEffect(() => {
    if (data.length > 0) {
      const ctx = chartRef.current.getContext("2d");

      if (chartInstance) {
        chartInstance.destroy();
      }

      const labels = data.map((entry) => entry.date); // Use dates as x-axis labels

      const datasets = targetCurrencies.map((currency) => {
        return {
          label: currency,
          data: data.map(
            (entry) =>
              parseFloat(entry.rates["INR"]) / parseFloat(entry.rates[currency])
          ), // Use rates for the selected currency as y-axis data
          borderColor: getRandomColor(),
          backgroundColor: "transparent",
          fill: false,
          lineTension: 0.3,
        };
      });

      const newChartInstance = new Chart(ctx, {
        type: "line",
        data: {
          labels: labels,
          datasets: datasets,
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              display: true,
              title: {
                display: true,
                text: "Date",
                font: {
                  size: 16,
                  weight: "bold",
                },
              },
              ticks: {
                font: {
                  size: 14,
                  weight: "bold",
                },
              },
            },
            y: {
              display: true,
              title: {
                display: true,
                text: "Value (in INR)",
                font: {
                  size: 16,
                  weight: "bold",
                },
              },
              ticks: {
                font: {
                  size: 14,
                  weight: "normal",
                },
              },
            },
          },
        },
      });

      setChartInstance(newChartInstance);
    }
  }, [targetCurrencies, data]);

  // Helper function to generate a random color
  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <div className={`bg-${darkMode ? "gray-800" : "white"} p-4`}>
      <h2
        className={`text-xl font-semibold ${
          darkMode ? "text-white" : "text-black"
        }`}
      >
        Historical Chart
      </h2>
      <div
        className={`h-96 relative ${darkMode ? "text-white" : "text-black"}`}
      >
        <canvas ref={chartRef} />
      </div>
    </div>
  );
};

export default HistoricalChart;
