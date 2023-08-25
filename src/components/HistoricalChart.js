import React, { useEffect, useState, useRef } from "react";
import Chart from "chart.js/auto";
import { fetchHistoricalData } from "../api"; // Adjust the path based on your project structure
import { useSelector } from "react-redux";

const HistoricalChart = ({ targetCurrencies, targetCurrency }) => {
  const chartRef = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);
  const [data, setData] = useState({});

  const { darkMode } = useSelector((state) => state.mode);

  useEffect(() => {
    const fetchHistoricalExchangeRates = async () => {
      const currentDate = new Date(); // Today's date

      const historicalDataPromises = [];
      const historicalDates = [];

      for (let i = 6; i >= 0; i--) {
        const date = new Date(currentDate);
        date.setDate(currentDate.getDate() - i); // Subtract days to get historical dates
        const dateStr = date.toISOString().split("T")[0];

        historicalDates.push(dateStr);
        historicalDataPromises.push(fetchHistoricalData(dateStr));
      }

      Promise.all(historicalDataPromises)
        .then((responses) => {
          const historicalRates = responses.map((response, index) => ({
            date: historicalDates[index], // Use the corresponding historical date
            rates: response.rates,
          }));
          setData(historicalRates);
        })
        .catch((error) => {
          console.error(error);
        });
    };

    fetchHistoricalExchangeRates();
  }, []);

  // useEffect(() => {
  //   console.log(targetCurrencies, "Somu");
  // }, [targetCurrencies]);

  useEffect(() => {
    if (data.length > 0) {
      const ctx = chartRef.current.getContext("2d");
      console.log(data, "###");

      if (chartInstance) {
        chartInstance.destroy();
      }

      const labels = data.map((entry) => entry.date); // Use dates as x-axis labels

      const datasets = targetCurrencies.map((currency) => {
        return {
          label: currency,
          data: data.map(
            (entry) =>
              parseFloat(entry.rates[targetCurrency]) /
              parseFloat(entry.rates[currency])
          ),
          borderColor: getRandomColor(),
          backgroundColor: "transparent",
          fill: true,
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
                text: `Value (in ${targetCurrency})`,
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
  }, [targetCurrencies, data, targetCurrency]);

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
    <div
      className={`bg-${
        darkMode ? "gray-800" : "gray"
      } p-4 min-w-[90vw] border rounded-lg drop-shadow-2xl`}
    >
      <h2
        className={`text-xl font-semibold  ${
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
