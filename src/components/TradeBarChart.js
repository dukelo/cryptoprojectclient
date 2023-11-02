import React from 'react'
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const TradeBarChart = ({labels, data1, data2, data1Name, data2Name}) => {

  const options = {
    plugins: {
      // title: {
      //   display: true,
      //   text: 'Chart.js Bar Chart - Stacked',
      // },
      legend: {
        labels: {
          display: false
        }
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
    labels,
    datasets: [
      {
        label: data1Name,
        data: data1,
        backgroundColor: 'rgb(75, 192, 192)',
      },
      {
        label: data2Name,
        data: data2,
        backgroundColor: 'rgb(255, 99, 132)',
      },
    ],
  };


  return (
    <div className='row justify-content-center align-items-center' style={{height: '25vh' }}>
      <Bar options={options} data={data}/>
    </div>
  )
}

export default TradeBarChart