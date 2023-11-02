import React from 'react'
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const DoughnutChart = ({profile, BTCData, ETHData}) => {

  const chartData = {
    labels: [
      'USD',
      'BTC',
      'ETH'
    ],
    datasets: [{
      label: 'Cypto Assets Doughnut Chart',
      data: [profile.crypto.USD, profile.crypto.BTC*BTCData, profile.crypto.ETH*ETHData],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)'
      ],
      hoverOffset: 4
    }]
  };


  return (
    <div className='row justify-content-center align-items-center' style={{height: '54.5vh' }}>
      <Doughnut data={chartData} />
    </div>
  )
}

export default DoughnutChart