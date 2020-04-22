import React, { useState, useEffect } from "react";
import { fetchDailyData } from "../../api";
import { Line, Bar } from "react-chartjs-2";

import styles from "./Chart.module.css";

const Chart = ({ data: { confirmed, recovered, deaths }, country }) => {
  const [dailyData, setDailyData] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      setDailyData(await fetchDailyData());
    };

    fetchAPI();
  }, []);

  const lineChart = dailyData.length ? (
    <Line
      data={{
        labels: dailyData.map(({ date }) => date),
        datasets: [
          {
            data: dailyData.map(({ confirmed }) => confirmed),
            label: "Infected",
            borderColor: "#3333ff",
            fill: true
          },
          {
            data: dailyData.map(({ deaths }) => deaths),
            label: "Deaths",
            borderColor: "red",
            backgroundColor: "rgba(255,0,0,0.5)",
            fill: true
          }
        ]
      }}
      options={{
        scales: {
          xAxes: [
            {
              gridLines: {
                color: "rgba(255,255,255, .6)"
              },
              ticks: {
                fontColor: "white",
                fontSize: 13
              }
            }
          ],
          yAxes: [
            {
              gridLines: {
                color: "rgba(255,255,255, .6)"
              },
              ticks: {
                fontColor: "white",
                fontSize: 15,
                callback: function(value, index, values) {
                  return value.toLocaleString();
                }
              },
              scaleLabel: {
                display: true,
                labelString: "# of People",
                fontColor: "white",
                fontSize: 20
              }
            }
          ]
        },
        legend: {
          display: false
        },
        title: {
          display: true,
          fontColor: "white",
          text: "Global COVID-19 Cases",
          fontSize: 30
        }
      }}
    />
  ) : null;

  const barChart = confirmed ? (
    <Bar
      data={{
        labels: ["Infected", "Recovered", "Deaths"],
        datasets: [
          {
            label: "People",
            backgroundColor: [
              "rgba(0, 0, 255, .9)",
              "rgba(0, 255, 0, .9)",
              "rgba(255, 0, 0, .9)"
            ],
            data: [confirmed.value, recovered.value, deaths.value]
          }
        ]
      }}
      options={{
        scales: {
          xAxes: [
            {
              gridLines: {
                color: "rgba(255,255,255, 1)"
              },
              ticks: {
                fontColor: "white",
                fontSize: 20
              }
            }
          ],
          yAxes: [
            {
              gridLines: {
                color: "rgba(255,255,255, .6)"
              },
              ticks: {
                fontColor: "white",
                fontSize: 15,
                callback: function(value, index, values) {
                  return value.toLocaleString();
                }
              },
              scaleLabel: {
                display: true,
                labelString: "# of People",
                fontColor: "white",
                fontSize: 20
              }
            }
          ]
        },
        legend: {
          display: false
        },
        title: {
          display: true,
          fontColor: "white",
          text: `${country} COVID-19 Cases`,
          fontSize: 30
        }
      }}
    />
  ) : null;

  return (
    <div className={styles.container}>{country ? barChart : lineChart}</div>
  );
};

export default Chart;
