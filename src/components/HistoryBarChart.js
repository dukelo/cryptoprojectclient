import React, { useEffect, useState } from 'react'
import { Bar } from "react-chartjs-2";
import axios from 'axios';
import { Chart as ChartJS } from "chart.js/auto";

const BTCHourURL = 'https://min-api.cryptocompare.com/data/v2/histohour?fsym=BTC&tsym=USD&limit=10'
const BTCDailyURL = 'https://min-api.cryptocompare.com/data/v2/histoday?fsym=BTC&tsym=USD&limit=10'
const ETHHourURL = 'https://min-api.cryptocompare.com/data/v2/histohour?fsym=ETH&tsym=USD&limit=10'
const ETHDailyURL = 'https://min-api.cryptocompare.com/data/v2/histoday?fsym=ETH&tsym=USD&limit=10'

const HistoryBarChart = ({cryptoName, timeType}) => {

  let [barData, setBarData] = useState(null)
  let [options, setOptions] = useState(null)

  async function handleCrypto(cryptoName, timeType) {
    let URL = null
    if (cryptoName === 'BTC' && timeType === 'Hours') {
      URL = BTCHourURL
    }
    if (cryptoName === 'BTC' && timeType === 'Daily') {
      URL = BTCDailyURL
    }
    if (cryptoName === 'ETH' && timeType === 'Hours') {
      URL = ETHHourURL
    }
    if (cryptoName === 'ETH' && timeType === 'Daily') {
      URL = ETHDailyURL
    }
    // let URL = BTCHourURL  
    let cryptoData = (await axios.get(URL)).data.Data.Data
  
    // get data time
    let cryptoTime = cryptoData.map((row) => {
      let datetime = new Date(row.time*1000)
      if(URL.includes('histoday')) {
        return datetime.getDate()
      }  
      if(URL.includes('histohour')) {
        return datetime.getHours()
      }
    })

    // get volumne data
    let cryptoVolumeTo = cryptoData.map((row) => {
      return row.volumeto
    })

    // set Bar data
    let vBarData = {
      datasets: [{
          data: cryptoVolumeTo,
          label: cryptoName+'Volume',
          backgroundColor: 'rgba(153, 102, 255, 0.2)'
      }],
      labels: cryptoTime
    }

    // set Bar options
    let vBaroptions = {
			plugins: {
				legend: {
          display: true,
          labels: {
            color: 'black',
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
			aspectRatio:1,
			scales: {
				x: {
					border: {
						color: 'black'
					},
					grid: {
						color: 'rgb(75, 192, 192)'
					},
					title: {
						display: true,
						text: timeType,
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
					beginAtZero: true,
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
						}
					},
					ticks: {
						color: 'black',
					}
				}
			}
		}

    setBarData(vBarData)
    setOptions(vBaroptions)

  }

  useEffect(() => {
    handleCrypto(cryptoName, timeType)
  }, [cryptoName, timeType])


  return (
    <div style={{margin: '0px auto',width: '500px' }} className="text-center">
      {barData && <Bar data={barData} options={options} className="mx-auto"/>}
    </div>
  )
}

export default HistoryBarChart