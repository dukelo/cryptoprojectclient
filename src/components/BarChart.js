import React from 'react'
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const BarChart = ({profile, pieBTCPrice, pieETHPrice}) => {

  const chartData = {
    labels: [
      'USD',
      'BTC',
      'ETH'
    ],
    datasets: [{
      label: 'Assets',
      data: [profile.crypto.USD, profile.crypto.BTC*pieBTCPrice, profile.crypto.ETH*pieETHPrice],
      // data: [300, 50, 100],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)'
      ],
      hoverOffset: 4
    }]
  };

  const options = {
    responsive: true,
    aspectRatio:1.5,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className='row justify-content-center align-items-center' style={{height: '52vh' }}>
      <Bar data={chartData} options={options} />
    </div>
  )
}

export default BarChart