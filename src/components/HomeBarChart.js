import React from 'react'
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const HomeBarChart = () => {

  let labels = [
    '2023-10-29T06:21:36.203Z', 
    '2023-10-29T06:21:45.430Z', 
    '2023-10-29T06:21:41.919Z', 
    '2023-10-29T06:24:22.403Z', 
    '2023-10-30T08:35:24.482Z', 
    '2023-10-30T08:48:15.969Z',
    '2023-10-30T08:48:18.865Z', 
    '2023-10-30T08:48:25.903Z'
  ]

  let data1 = [
    {y: 1, x:'2023-10-29T06:21:36.203Z'},
    {y: 0.5, x:'2023-10-29T06:21:41.919Z'},
    {y: 0.3, x:'2023-10-29T06:24:22.403Z'},
    {y: 0.4, x:'2023-10-30T08:48:25.903Z'},
  ]

  let data2 = [
    {y: 0.5, x:'2023-10-29T06:21:45.430Z'},
    {y: 1, x:'2023-10-30T08:35:24.482Z'},
    {y: 0.1, x:'2023-10-30T08:48:15.969Z'},
    {y: 0.2, x:'2023-10-30T08:48:18.865Z'},
  ]

  const options = {
    plugins: {
      legend: {
        // labels: {
        //   display: false
        // }
      }
    },
    responsive: true,
    scales: {
      x: {
        display: false
      },

    },
  };

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'BTC Buy',
        data: data1,
        backgroundColor: 'rgb(75, 192, 192)',
      },
      {
        label: 'BTC Sell',
        data: data2,
        backgroundColor: 'rgb(255, 99, 132)',
      },
    ],
  };



  return (
    <div className='row justify-content-center align-items-center' style={{height: '20vh' }}>
      <Bar options={options} data={data}/>
    </div>
  )
}

export default HomeBarChart