import React, { useState, useEffect } from "react";
import { fetchDailyData } from "../../api";
import { Doughnut } from "react-chartjs-2";

import styles from "./Doughnut.module.css";

const DoughnutChart = ({ data: { confirmed, recovered, deaths }, country }) => {
  const [dailyData, setDailyData] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      setDailyData(await fetchDailyData());
    };

    fetchAPI();
  }, []);

  const doughnutChart = dailyData.length ? (
    <Doughnut
      data={{
        labels: ["Infected", "Recovered", "Deaths"],
        datasets: [
          {
            data: [confirmed.value, recovered.value, deaths.value],
            backgroundColor: [
              "rgba(0, 100, 255, 0.8)",
              "rgba(100, 255, 0, 0.8)",
              "rgba(255, 0, 100, 0.8)"
            ],
            borderColor: [
              "rgba(0, 0, 255, 0.1)",
              "rgba(0, 255, 0, 0.1)",
              "rgba(255, 0, 0, 0.1)"
            ],
            borderWidth: 1
          }
        ]
      }}
      options={{
        tooltips: {
          callbacks: {
            label: function(tooltipItem, data) {
              const dataset = data.datasets[tooltipItem.datasetIndex];
              const meta = dataset._meta[Object.keys(dataset._meta)[0]];
              const total = meta.total;
              const currentValue = dataset.data[tooltipItem.index];
              const percentage = parseFloat(
                ((currentValue / total) * 100).toFixed(1)
              );
              return percentage + "%";
            },
            title: function(tooltipItem, data) {
              return data.labels[tooltipItem[0].index];
            }
          }
        },
        title: {
          display: true,
          fontColor: "white",
          text: `Current cases`,
          fontSize: 30
        },
        legend: {
          display: true,
          labels: {
            fontSize: 20
          }
        }
      }}
    />
  ) : null;

  return <div className={styles.container}>{doughnutChart}</div>;
};

export default DoughnutChart;
