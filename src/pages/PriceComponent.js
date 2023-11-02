import React, { useEffect, useState } from 'react'
import axios from 'axios';
import RealTimeLineChart from '../components/RealTimeLineChart';
import HistoryLineChart from '../components/HistoryLineChart';
import HistoryBarChart from '../components/HistoryBarChart';

const realTimeURL = 'https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH&tsyms=USD'

const PriceComponent = () => {

  // real time
  // realTime useState
  // BTC && ETH realTime inital value -> render first component
  let [BTClabels, setBTCLabels] = useState([0])
  let [BTCdata, setBTCData] = useState([0])
  let [BTCtime, setBTCTime] = useState(-1)

  let [ETHlabels, setETHLabels] = useState([0])
  let [ETHdata, setETHData] = useState([0])
  let [ETHtime, setETHTime] = useState(-1)

  // After first render -> update first value from API -> update state -> render component again
  useEffect(() => {
    let initialPrice = async () => {
      let priceData = (await axios.get(realTimeURL)).data
      let BTCPrice = [priceData.BTC.USD]
      let ETHPrice = [priceData.ETH.USD]
      setBTCData(BTCPrice)
      setETHData(ETHPrice)
    }
    initialPrice()
  }, [])

  // BTC realTime data && labels listening [BTCtime, BTCdata, BTClabels]
  useEffect(function() {
    // console.log('time' + BTCtime)
    if (BTCtime !== 0 && BTCtime !== -1) {
      let BTCRealTime = setInterval(async () => {  
        let priceData = (await axios.get(realTimeURL)).data
        let price = [priceData.BTC.USD]
        setBTCData(BTCdata.concat(price[0]))
        setBTCLabels(BTClabels.concat((BTClabels.length)*BTCtime))
        // console.log('interval')
        // console.log(BTCdata)
      }, BTCtime*1000)

      return () => {
        clearInterval(BTCRealTime);
      }
    }

    if (BTCtime === 0) {
      console.log('BTCdata finish1')
      console.log(BTCdata)
      if (BTCdata.length === 1 && BTClabels.length === 1){
        console.log('finsih')
      } else {
        console.log('setfinsih')
      }
    }
  }, [BTCtime, BTCdata, BTClabels])

  // BTC realTime handler
  const handleBTCRealTime = (time) => {
    let initialPrice = async () => {
      let priceData = (await axios.get(realTimeURL)).data
      let price = [priceData.BTC.USD]
      setBTCData(price)
      setBTCLabels([0])
    }
    initialPrice()
    setBTCTime(time)
  }

  // ETH realTime data && labels listening [ETHtime, ETHdata, ETHlabels]
  useEffect(function() {
    // console.log('time' + BTCtime)
    if (ETHtime !== 0 && ETHtime !== -1) {
      let ETHRealTime = setInterval(async () => {  
        let priceData = (await axios.get(realTimeURL)).data
        let price = [priceData.ETH.USD]
        setETHData(ETHdata.concat(price[0]))
        setETHLabels(ETHlabels.concat((ETHlabels.length)*ETHtime))
        // console.log('interval')
        // console.log(BTCdata)
      }, ETHtime*1000)

      return () => {
        clearInterval(ETHRealTime);
      }
    }

    if (ETHtime === 0) {
      console.log('ETHdata finish1')
      console.log(ETHdata)
      if (ETHdata.length === 1 && ETHlabels.length === 1){
        console.log('finsih')
      } else {
        console.log('setfinsih')
      }
    }
  }, [ETHtime, ETHdata, ETHlabels])

  // ETH realTime handler
  const handleETHRealTime = (time) => {
    let initialPrice = async () => {
      let priceData = (await axios.get(realTimeURL)).data
      let price = [priceData.ETH.USD]
      setETHData(price)
      setETHLabels([0])
    }
    initialPrice()
    setETHTime(time)
  }

  // history
  // history useState
  // BTC && ETH history inital value -> render first component
  let [BTCTimeType, setBTCTimeType] = useState('Hours')
  let [ETHTimeType, setETHTimeType] = useState('Hours')

  // BTC history handler
  const handleBTCHistory = (timeType) => {
    setBTCTimeType(timeType)
  }

  // ETH history handler
  const handleETHHistory = (timeType) => {
    setETHTimeType(timeType)
  }

  return (
    <div>
      <main>
        <div className="container text-center mb-5">
          <div className="card mb-4">
            <h5 className="card-header">Function Description - Get immediately Price</h5>
            <div className="card-body">
              {/* <h5 className="card-title mb-4">Simulate - Crypto Assets managenemt</h5> */}
              <p>1. Click 1s, 5s, or 10s button(time-step) to get immediately BTC or ETH price</p>
              <p>2. Click Monitor Stop to stop get BTC or ETH price</p>
              <p>3. Click Day button to get BTC or ETH history data (hours)</p>
              <p>4. Click Day button to get BTC or ETH history data (hours)</p>  
              
            </div>
          </div>

          <div className="row">
            <div className="col mb-3">
              <div className="card text-center">
                <div className="card-header">
                  <button type="button" className="btn btn-success">BTC Instant Price</button>
                </div>
                <div className="card-body">
                  <div className="chart-container">
                    {BTCdata[0] !== 0 && <RealTimeLineChart  labels={BTClabels} data={BTCdata} />}
                  </div>
                </div>
                <div className="card-footer text-body-secondary">
                  <div className="row justify-content-between" style={{margin: '0px auto',width: '600px' }}>
                    <div className="col">
                      <button type="button" className="btn btn-primary btn-sm mx-1" onClick={() => {handleBTCRealTime(1)}}>1s</button>
                      <button type="button" className="btn btn-primary btn-sm mx-1" onClick={() => {handleBTCRealTime(5)}}>5s</button>
                      <button type="button" className="btn btn-primary btn-sm mx-1" onClick={() => {handleBTCRealTime(10)}}>10s</button>
                    </div>
                    <div className="col">
                      <button type="button" className="btn btn-secondary btn-sm" onClick={() => {handleBTCRealTime(0)}}>Monitor Stop</button>            
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col mb-3">
              <div className="card text-center">
                <div className="card-header">
                  <button type="button" className="btn btn-success">ETH Instant Price</button>
                </div>
                <div className="card-body">
                  <div className="chart-container">
                    {ETHdata[0] !== 0 && <RealTimeLineChart  labels={ETHlabels} data={ETHdata} />}
                    {/* <RealTimeLineChart  labels={ETHlabels} data={ETHdata} /> */}
                  </div>
                </div>
                <div className="card-footer text-body-secondary">
                  <div className="row justify-content-between" style={{margin: '0px auto',width: '600px' }}>
                    <div className="col">
                      <button type="button" className="btn btn-primary btn-sm mx-1" onClick={() => {handleETHRealTime(1)}}>1s</button>
                      <button type="button" className="btn btn-primary btn-sm mx-1" onClick={() => {handleETHRealTime(5)}}>5s</button>
                      <button type="button" className="btn btn-primary btn-sm mx-1" onClick={() => {handleETHRealTime(10)}}>10s</button>
                    </div>
                    <div className="col">
                      <button type="button" className="btn btn-secondary btn-sm" onClick={() => {handleETHRealTime(0)}}>Monitor Stop</button>            
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mb-5">
          <div className="card">
            <div className="card-header text-center">
              <button type="button" className="btn btn-success">BTC History</button>
            </div>
            <div className="card-body">
              <div className="row align-items-center">
                <div className="col">
                  <div className="chart-container">
                    <HistoryLineChart cryptoName={'BTC'} timeType={BTCTimeType} />
                  </div>
                </div>
                <div className="col">
                  <div className="chart-container height: 80vh">
                    <HistoryBarChart cryptoName={'BTC'} timeType={BTCTimeType} />
                  </div>
                </div>
              </div>
            </div>
            <div className="card-footer text-body-secondary">
              <button type="button" className="btn btn-primary btn-sm mx-1" onClick={() => {handleBTCHistory('Daily')}}>Day</button>
              <button type="button" className="btn btn-primary btn-sm mx-1" onClick={() => {handleBTCHistory('Hours')}}>Hour</button>
            </div>
          </div>
        </div>

        <div className="container mb-5">
          <div className="card">
            <div className="card-header text-center">
              <button type="button" className="btn btn-success">ETH History</button>
            </div>
            <div className="card-body">
              <div className="row align-items-center">
                <div className="col">
                  <div className="chart-container">
                    <HistoryLineChart cryptoName={'ETH'} timeType={ETHTimeType} />
                  </div>
                </div>
                <div className="col">
                  <div className="chart-container height: 80vh">
                    <HistoryBarChart cryptoName={'ETH'} timeType={ETHTimeType} />
                  </div>
                </div>
              </div>
            </div>
            <div className="card-footer text-body-secondary">
              <button type="button" className="btn btn-primary btn-sm mx-1" onClick={() => {handleETHHistory('Daily')}}>Day</button>
              <button type="button" className="btn btn-primary btn-sm mx-1" onClick={() => {handleETHHistory('Hours')}}>Hour</button>
            </div>
          </div>
        </div>  
      </main>
    </div>
  )
}

export default PriceComponent