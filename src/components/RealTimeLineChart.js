import React, { useEffect, useState } from 'react'
// import axios from 'axios';
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const RealTimeLineChart = ({data, labels}) => {

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Price",
        data: data,
        borderColor: 'rgb(75, 192, 192)',
        borderWidth: 2,
        pointBorderWidth: 0,
        pointRadius: 0
      }
    ]
  }

  const options = {
    plugins: {
      legend: {
          display: false,
          labels: {
              color: 'black',
              boxWidth: 0,
              boxHeight: 0,
              font: {
                size: 16,
                weight: 'bold'
              }
          }
      }
    },
    layout: {
      padding: 20
    },
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio:2,
    scales: {
      x: {
        border: {
          color: 'black'
        },
        title: {
          display: true,
          text: 'Time',
          color: 'black',
          font: {
            size: 16,
            weight: 'bold'
          }
        },
        ticks: {
          color: 'black',
        }
      },
      y: {
        border: {
          color: 'black'
        },
        title: {
          display: true,
          text: 'USD',
          color: 'black',
          font: {
            size: 16,
            weight: 'bold'
          },
        },
        ticks: {
          color: 'black',
        }
      },
    }
  }

  return (
    <div className='row justify-content-center align-items-center' style={{height: '35vh' }}>
      <Line data={chartData} options={options} />
    </div>
  )
}

export default RealTimeLineChart