import React from 'react'
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const HomePieChart = () => {

  const chartData = {
    labels: [
      'USD',
      'BTC',
      'ETH'
    ],
    datasets: [{
      label: 'Cypto Assets Doughnut Chart',
      data: [116086.87, 56085.78, 53044.45],
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
    <div className='row justify-content-center align-items-center' style={{height: '30vh' }}>
      <Pie data={chartData} />
  </div>
  )
}

export default HomePieChart