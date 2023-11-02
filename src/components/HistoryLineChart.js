import React, { useEffect, useState } from 'react'
import { Line } from "react-chartjs-2";
import axios from 'axios';
import { Chart as ChartJS } from "chart.js/auto";

const BTCHourURL = 'https://min-api.cryptocompare.com/data/v2/histohour?fsym=BTC&tsym=USD&limit=10'
const BTCDailyURL = 'https://min-api.cryptocompare.com/data/v2/histoday?fsym=BTC&tsym=USD&limit=10'
const ETHHourURL = 'https://min-api.cryptocompare.com/data/v2/histohour?fsym=ETH&tsym=USD&limit=10'
const ETHDailyURL = 'https://min-api.cryptocompare.com/data/v2/histoday?fsym=ETH&tsym=USD&limit=10'

const HistoryLineChart = ({cryptoName, timeType}) => {

  let [chartData, setChartData] = useState(null)
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
  
    // get price data
    let cryptoClosePrice = cryptoData.map((row) => {
      return row.close
    })

    // determine y-axes
    let priceTotal = 0
    cryptoClosePrice.forEach(element => {
      priceTotal = element + priceTotal
    });
    
    // get average price
    let priceAverage = priceTotal/cryptoClosePrice.length
    let stepSize
  
    // setting unit scale(stepSize)
    if (priceAverage/100 < 1000 && priceAverage/100 > 100) {
      priceAverage = Math.round(priceAverage/1000)*1000
      // console.log(priceAverage)
      stepSize = 200
    } else if ((priceAverage/100 < 100 && priceAverage/100 > 10)) {
      priceAverage = Math.round(priceAverage/100)*100		
      // console.log(priceAverage)
      stepSize = 20
    }
  
    // setting min, max for scale
    let suggestedMin = priceAverage-stepSize*10
    let suggestedMax = priceAverage+stepSize*10

    // set Line data
    let vChartData = {
      datasets: [{
          data: cryptoClosePrice,
          label: cryptoName+'Price',
          borderColor: 'rgba(54, 162, 235)',
          borderWidth: 2
      }],
      labels: cryptoTime
    }

    // set Line options
    let vOptions = {
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
      aspectRatio:2,
      scales: {
        x: {
          border: {
            color: 'black'
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
          suggestedMin: suggestedMin,
          suggestedMax: suggestedMax,
          ticks: {
            stepSize: stepSize
          },
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

    setChartData(vChartData)
    setOptions(vOptions)

  }

  useEffect(() => {
    handleCrypto(cryptoName, timeType)
  }, [cryptoName, timeType])


  return (
    <div style={{margin: '0px auto',width: '600px' }}>
      {chartData && <Line data={chartData} options={options} />}
    </div>
  )
}

export default HistoryLineChart