import React from 'react'
import { Line } from 'react-chartjs-2';

const HomeLineChart = () => {

  const options = {
    responsive: true,
    plugins: {
      // legend: {
      //   position: 'top' as const,
      // },
      // title: {
      //   display: true,
      //   text: 'Chart.js Line Chart',
      // },
    },
  };
  
  const labels = ['5', '10', '15', '20', '25', '30', '35'];
  
  const data = {
    labels,
    datasets: [
      {
        label: 'BTC Price',
        data: [34525.55, 34528.01, 34528.01, 34525.57, 34526.19, 34521.37, 34526.73],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  return (
    <div className='row justify-content-center align-items-center' style={{height: '20vh' }}>
      <Line options={options} data={data} />
    </div>
  )
}

export default HomeLineChart