import React from 'react'
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const PieChart = ({profile, pieBTCPrice, pieETHPrice}) => {

  const chartData = {
    labels: [
      'USD',
      'BTC',
      'ETH'
    ],
    datasets: [{
      label: 'Cypto Assets Doughnut Chart',
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

  return (
    <div className='row justify-content-center align-items-center' style={{height: '52vh' }}>
      <Pie data={chartData} />
    </div>
  )
}

export default PieChart