import React, {useState, useEffect} from 'react'
import axios from 'axios';
import authService from '../services/auth.service'
import investService from '../services/invest.service';
// import { useNavigate } from 'react-router-dom'
import PieChart from '../components/PieChart'
import BarChart from '../components/BarChart'
import RealTimeLineChart from '../components/RealTimeLineChart';
import TradeBarChart from '../components/TradeBarChart'

const realTimeURL = 'https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH&tsyms=USD'

const InvestComponents = () => {

  let [profile, setProfile] = useState(null)
  let [pieBTCPrice, setPieBTCPrice] = useState(0)
  let [pieETHPrice, setPieETHPrice] = useState(0)
  let [deposit, setDeposit] = useState(0)
  let [takeOut, setTakeOut] = useState(0)

  let [BTClabels, setBTCLabels] = useState([0])
  let [BTCdata, setBTCData] = useState([0])
  let [ETHlabels, setETHLabels] = useState([0])
  let [ETHdata, setETHData] = useState([0])

  let [BTCBuyPrice, setBTCBuyPrice] = useState(0)
  let [BTCBuyQuantity, setBTCBuyQuantity] = useState(0)
  let [BTCSellPrice, setBTCSellPrice] = useState(0)
  let [BTCSellQuantity, setBTCSellQuantity] = useState(0)

  let [ETHBuyPrice, setETHBuyPrice] = useState(0)
  let [ETHBuyQuantity, setETHBuyQuantity] = useState(0)
  let [ETHSellPrice, setETHSellPrice] = useState(0)
  let [ETHSellQuantity, setETHSellQuantity] = useState(0)

  let [dtlabels, setDTLabels] = useState([0])
  let [depositdata, setDepositData] = useState([0])
  let [takeOutdata, setTakeOutData] = useState([0])
  let [depositTotal, setDepositTotal] = useState([0])
  let [takeOutTotal, setTakeOutTotal] = useState([0])

  let [BTClabelsh, setBTCLabelsh] = useState([0])
  let [BTCBuydatah, setBTCBuyDatah] = useState([0])
  let [BTCSelldatah, setBTCSellDatah] = useState([0])
  let [BTCBuyTotal, setBTCBuyTotal] = useState([0])
  let [BTCSellTotal, setBTCSellTotal] = useState([0])

  let [ETHlabelsh, setETHLabelsh] = useState([0])
  let [ETHBuydatah, setETHBuyDatah] = useState([0])
  let [ETHSelldatah, setETHSellDatah] = useState([0])
  let [ETHBuyTotal, setETHBuyTotal] = useState([0])
  let [ETHSellTotal, setETHSellTotal] = useState([0])

  // get cypto assets
  const handlerProfile = async () => {
    let user = await authService.getProfile()
    setProfile(user.data)
  }

  const initialPriceAll = async () => {
    let priceData = (await axios.get(realTimeURL)).data
    let BTCPrice = [priceData.BTC.USD]
    let ETHPrice = [priceData.ETH.USD]
    setPieBTCPrice(BTCPrice)
    setPieETHPrice(ETHPrice)
    setBTCData(BTCPrice)
    setETHData(ETHPrice)
  }

  const initialPricePie = async () => {
    let priceData = (await axios.get(realTimeURL)).data
    let BTCPrice = [priceData.BTC.USD]
    let ETHPrice = [priceData.ETH.USD]
    setPieBTCPrice(BTCPrice)
    setPieETHPrice(ETHPrice)
    // setBTCData(BTCPrice)
    // setETHData(ETHPrice)
  }

  const handlerData = async () => {
    let response = await investService.getCrypto()
    let depositUSD = response.data.depositUSD
    let takeOut = response.data.takeOut
    let buyBTC = response.data.buyBTC
    let sellBTC = response.data.sellBTC
    let buyETH = response.data.buyETH
    let sellETH = response.data.sellETH

    function mapData(Data) {
      let dataObj = Data.map(row => {
        return {
          x:row[1],
          y:row[0]
        }
      })
      return dataObj
    }

    function mapTime(Data) {
      let dataObj = Data.map(row => {
        return row[1]
      })
      return dataObj
    }

    function totalAsset(Data) {
      let total = 0
      let dataObj = Data.map(row => row[0])
      dataObj.forEach(row => {
        total = total + row
      })
      return total
    }

    // deposit && takeout
    let depopsitData = mapData(depositUSD)
    let depositTime = mapTime(depositUSD)
    let takeOutData = mapData(takeOut)
    let takeOutTime = mapTime(takeOut)
    let dtdate = depositTime.concat(takeOutTime)

    depopsitData.shift()
    takeOutData.shift()
    dtdate.sort().shift()
    dtdate.shift()

    setDepositTotal(totalAsset(depositUSD).toFixed(2))
    setTakeOutTotal(totalAsset(takeOut).toFixed(2))
    setDTLabels(dtdate)
    setDepositData(depopsitData)
    setTakeOutData(takeOutData)

    // BTC
    let buyBTCData = mapData(buyBTC)
    let buyBTCTime = mapTime(buyBTC)
    let sellBTCData = mapData(sellBTC)
    let sellBTCTime = mapTime(sellBTC)
    let BTCdate = buyBTCTime.concat(sellBTCTime)

    buyBTCData.shift()
    sellBTCData.shift()
    BTCdate.sort().shift()
    BTCdate.shift()

    setBTCBuyTotal(totalAsset(buyBTC).toFixed(6))
    setBTCSellTotal(totalAsset(sellBTC).toFixed(6))
    setBTCLabelsh(BTCdate)
    setBTCBuyDatah(buyBTCData)
    setBTCSellDatah(sellBTCData)

    // ETH
    let buyETHData = mapData(buyETH)
    let buyETHTime = mapTime(buyETH)
    let sellETHData = mapData(sellETH)
    let sellETHTime = mapTime(sellETH)
    let ETHdate = buyETHTime.concat(sellETHTime)

    buyETHData.shift()
    sellETHData.shift()
    ETHdate.sort().shift()
    ETHdate.shift()

    setETHBuyTotal(totalAsset(buyETH).toFixed(6))
    setETHSellTotal(totalAsset(sellETH).toFixed(6))
    setETHLabelsh(ETHdate)
    setETHBuyDatah(buyETHData)
    setETHSellDatah(sellETHData)

  }

  useEffect(() => {
    handlerProfile()
    initialPriceAll()
  }, [])

  useEffect(() => {
    handlerData()
  }, [profile])

  // BTC realTime data && labels listening [BTCtime, BTCdata, BTClabels]
  useEffect(function() {

    let BTCRealTime = setInterval(async () => {  
      let priceData = (await axios.get(realTimeURL)).data
      let BTCPrice = [priceData.BTC.USD]
      let ETHPrice = [priceData.ETH.USD]
      setBTCData(BTCdata.concat(BTCPrice[0]))
      setBTCLabels(BTClabels.concat((BTClabels.length)*3))
      setETHData(ETHdata.concat(ETHPrice[0]))
      setETHLabels(ETHlabels.concat((ETHlabels.length)*3))
      setBTCBuyPrice(BTCPrice)
      setBTCSellPrice(BTCPrice)
      setETHBuyPrice(ETHPrice)
      setETHSellPrice(ETHPrice)
    }, 3000)

    return () => {
      clearInterval(BTCRealTime);
    }
    
  }, [BTCdata, BTClabels, ETHdata, ETHlabels])

  // Deposit and Take Out
  const handlerDepositInput = (e) => {
    setDeposit(e.target.value)
  }

  const handlerTakeOutInput = (e) => {
    setTakeOut(e.target.value)
  }

  const handlerDeposit = async () => {
    await investService.depositIn(deposit)
    handlerProfile()
    initialPricePie()
    setDeposit(0)
  }
  
  const handlerTakeOut = async () => {
    await investService.take(takeOut)
    handlerProfile()
    initialPricePie()
    setTakeOut(0)
  }
  
  // BTC Buy and Sell
  const handlerBuyBTCQuantityInput = (e) => {
    setBTCBuyQuantity(e.target.value)
  }

  const handlerBuyBTC = async () => {
    await investService.buyBTC(BTCBuyPrice, BTCBuyQuantity)
    handlerProfile()
    setPieBTCPrice(BTCBuyPrice)
    setBTCBuyQuantity(0)
  }

  const handlerSellBTCQuantityInput = (e) => {
    setBTCSellQuantity(e.target.value)
  }

  const handlerSellBTC = async () => {
    await investService.sellBTC(BTCSellPrice, BTCSellQuantity)
    handlerProfile()
    setPieBTCPrice(BTCSellPrice)
    setBTCSellQuantity(0)
  }

    // ETH Buy and Sell
    const handlerBuyETHQuantityInput = (e) => {
      setETHBuyQuantity(e.target.value)
    }
  
    const handlerBuyETH = async () => {
      await investService.buyETH(ETHBuyPrice, ETHBuyQuantity)
      handlerProfile()
      setPieETHPrice(ETHBuyPrice)
      setETHBuyQuantity(0)
    }
  
    const handlerSellETHQuantityInput = (e) => {
      setETHSellQuantity(e.target.value)
    }
  
    const handlerSellETH = async () => {
      await investService.sellETH(ETHSellPrice, ETHSellQuantity)
      handlerProfile()
      setPieETHPrice(ETHSellPrice)
      setETHSellQuantity(0)
    }

  return (
    <div>
      <main>
      { profile && (
        <div className="container mb-4">
          <div className="card mb-4 text-center">
            <h5 className="card-header">Function Description - Trade</h5>
            <div className="card-body">
              <p>1. Deposit and TakeOut</p>
              <p>2. buy or Sell for BTC and ETH </p>
              <p>3. Demo Accumulate Data</p>
            </div>
          </div>

          <div className="row align-items-start justify-content-between">
            <div className="col-12 col-lg-3 mb-4">
              <div className="card mb-4" >
                <div className="card-header fw-bold">
                  Crypto Assets Information
                </div>
                <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between align-items-start">
                    <div className="ms-2 me-auto">
                      <div className="fw-bold">USD</div>
                      {profile.crypto.USD}
                    </div>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-start">
                    <div className="ms-2 me-auto">
                      <div className="fw-bold">BTC</div>
                      {profile.crypto.BTC}
                    </div>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-start">
                    <div className="ms-2 me-auto">
                      <div className="fw-bold">ETH</div>
                      {profile.crypto.ETH}
                    </div>
                  </li>
                </ul>
              </div>

              <div className="card mb-4" >
                  <div className="card-header fw-bold">
                    Deposit and Take Out
                  </div>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item justify-content-between align-items-start">
                      <div className="ms-2 me-auto">
                        <label htmlFor="inputDeposit" className="form-label fw-bold">Deposit</label>
                        <input type="number" id="inputDeposit" className="form-control" aria-describedby="depositHelpBlock" value={deposit} onChange={handlerDepositInput}/>
                        {/* <div id="usernameHelpBlock" className="form-text">
                          Your username must be 8-20 characters long.
                        </div> */}
                        <button type="button" className="btn btn-primary btn-sm mt-2" onClick={handlerDeposit}>Submit</button>
                      </div>
                    </li>
                    <li className="list-group-item justify-content-between align-items-start">
                      <div className="ms-2 me-auto">
                      <label htmlFor="inputTakeOut" className="form-label fw-bold">Take Out</label>
                        <input type="number" id="inputTakeOut" className="form-control" aria-describedby="TakeOutHelpBlock" value={takeOut} onChange={handlerTakeOutInput}/>
                        {/* <div id="emailHelpBlock" className="form-text">
                          Your password must be 8-20 characters long.
                        </div> */}
                        <button type="button" className="btn btn-primary btn-sm mt-2" onClick={handlerTakeOut}>Submit</button>
                      </div>
                    </li>
                  </ul>
                </div>
            </div>

            <div className="col-12 col-lg-4 mb-4">
              <div className="card">
                <h5 className="card-header">Crypto Assets Doughnut Chart</h5>
                <div className="card-body">
                  <PieChart profile={profile} pieBTCPrice={pieBTCPrice} pieETHPrice={pieETHPrice}/>
                </div>
              </div>
            </div>

            <div className="col-12 col-lg-5 mb-4">
              <div className="card">
                <h5 className="card-header">Crypto Assets Doughnut Chart</h5>
                <div className="card-body">
                  <BarChart profile={profile} pieBTCPrice={pieBTCPrice} pieETHPrice={pieETHPrice}/>
                </div>
              </div>
            </div>
          </div>
          <hr />

          <div className="row align-items-start justify-content-between">
            <div className="col-12 col-lg-6 row align-items-start justify-content-center mb-4">
              <div className="col-12 mb-3">
                <div className="card">
                  <h5 className="card-header">BTC RealTime Price</h5>
                  <div className="card-body">
                    <RealTimeLineChart  labels={BTClabels} data={BTCdata} />
                  </div>
                </div>
              </div>

              <div className="col-12">
                <div className="card mb-3 col-12" >
                  <div className="card-header fw-bold">
                    BTC Buy
                  </div>
                  <div className="card-body row align-items-start justify-content-center">
                    <div className="row align-items-center justify-content-center">
                      <div className='col'>
                        <div className="form-floating">
                          <input type="number" className="form-control rounded-3" id="BTCPriceInput" value={BTCBuyPrice} readOnly/>
                          <label htmlFor="BTCPriceInput">BTC Price</label>
                        </div>
                      </div>
                      <div className='col'>
                        <div className="form-floating">
                          <input type="number" className="form-control rounded-3" id="BTCQuantityInput" value={BTCBuyQuantity} onChange={handlerBuyBTCQuantityInput}/>
                          <label htmlFor="BTCQuantityInput">BTC Quantity</label>
                        </div>
                      </div>
                      <div className='col'>
                        <button type="button" className="btn btn-primary" onClick={handlerBuyBTC}>Buy BTC</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-12">
                <div className="card mb-3 col-12" >
                  <div className="card-header fw-bold">
                    BTC Sell
                  </div>
                  <div className="card-body row align-items-start justify-content-center">
                    <div className="row align-items-center justify-content-center">
                      <div className='col'>
                        <div className="form-floating">
                          <input type="number" className="form-control rounded-3" id="BTCPriceInputSell" value={BTCSellPrice} readOnly />
                          <label htmlFor="BTCPriceInputSell">BTC Price</label>
                        </div>
                      </div>
                      <div className='col'>
                        <div className="form-floating">
                          <input type="number" className="form-control rounded-3" id="BTCQuantityInputSell" value={BTCSellQuantity} onChange={handlerSellBTCQuantityInput}/>
                          <label htmlFor="BTCQuantityInputSell">BTC Quantity</label>
                        </div>
                      </div>
                      <div className='col'>
                        <button type="button" className="btn btn-primary" onClick={handlerSellBTC}>Sell BTC</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-lg-6 row align-items-start justify-content-center mb-4">
              <div className="col-12 mb-3">
                <div className="card">
                  <h5 className="card-header">ETH RealTime Price</h5>
                  <div className="card-body">
                    <RealTimeLineChart  labels={ETHlabels} data={ETHdata} />
                  </div>
                </div>
              </div>

              <div className="col-12">
                <div className="card mb-3 col-12" >
                  <div className="card-header fw-bold">
                    ETH Buy
                  </div>
                  <div className="card-body row align-items-start justify-content-center">
                    <div className="row align-items-center justify-content-center">
                      <div className='col'>
                        <div className="form-floating">
                          <input type="number" className="form-control rounded-3" id="ETHPriceInput" value={ETHBuyPrice} readOnly/>
                          <label htmlFor="ETHPriceInput">ETH Price</label>
                        </div>
                      </div>
                      <div className='col'>
                        <div className="form-floating">
                          <input type="number" className="form-control rounded-3" id="ETHQuantityInput" value={ETHBuyQuantity} onChange={handlerBuyETHQuantityInput}/>
                          <label htmlFor="ETHQuantityInput">ETH Quantity</label>
                        </div>
                      </div>
                      <div className='col'>
                        <button type="button" className="btn btn-primary" onClick={handlerBuyETH}>Buy ETH</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-12">
                <div className="card mb-3 col-12" >
                  <div className="card-header fw-bold">
                    ETH Sell
                  </div>
                  <div className="card-body row align-items-start justify-content-center">
                    <div className="row align-items-center justify-content-center">
                      <div className='col'>
                        <div className="form-floating">
                          <input type="number" className="form-control rounded-3" id="ETHPriceInputSell" value={ETHSellPrice} readOnly/>
                          <label htmlFor="ETHPriceInputSell">ETH Price</label>
                        </div>
                      </div>
                      <div className='col'>
                        <div className="form-floating">
                          <input type="number" className="form-control rounded-3" id="ETHQuantityInputSell" value={ETHSellQuantity} onChange={handlerSellETHQuantityInput}/>
                          <label htmlFor="ETHQuantityInputSell">ETH Quantity</label>
                        </div>
                      </div>
                      <div className='col'>
                        <button type="button" className="btn btn-primary" onClick={handlerSellETH}>Sell ETH</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr />

          <div className="row align-items-start justify-content-between">
            <div className="col-12 col-lg-4 align-items-start justify-content-center mb-4">
              <div className="card">
                <h5 className="card-header">Accumulate Deposit and TakeOut</h5>
                <div className="card-body">
                  <TradeBarChart labels={dtlabels} data1={depositdata} data2={takeOutdata} data1Name={'Deposit'} data2Name={'TakeOut'}/>
                  <div className="row align-items-center justify-content-center">
                    <div className='col'>
                      <div className="input-group input-group-sm mb-3">
                        <span className="input-group-text" id="inputGroup-sizing-sm">Deposit</span>
                        <input type="number" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" value={depositTotal} readOnly />
                      </div>
                    </div>
                    <div className='col'>
                      <div className="input-group input-group-sm mb-3">
                        <span className="input-group-text" id="inputGroup-sizing-sm">TakeOut</span>
                        <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" value={takeOutTotal} readOnly/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-lg-4 align-items-start justify-content-center mb-4">
              <div className="card">
                <h5 className="card-header">Accumulate BTC Buy and Sell</h5>
                <div className="card-body">
                  <TradeBarChart labels={BTClabelsh} data1={BTCBuydatah} data2={BTCSelldatah} data1Name={'BuyBTC'} data2Name={'SellBTC'}/> 
                  <div className="row align-items-center justify-content-center">
                    <div className='col'>
                      <div className="input-group input-group-sm mb-3">
                        <span className="input-group-text" id="inputGroup-sizing-sm">Buy</span>
                        <input type="number" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" value={BTCBuyTotal} readOnly />
                      </div>
                    </div>
                    <div className='col'>
                      <div className="input-group input-group-sm mb-3">
                        <span className="input-group-text" id="inputGroup-sizing-sm">Sell</span>
                        <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" value={BTCSellTotal} readOnly/>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            <div className="col-12 col-lg-4 align-items-start justify-content-center mb-4">
              <div className="card">
                <h5 className="card-header">Accumulate BTC Buy and Sell</h5>
                <div className="card-body">
                  <TradeBarChart labels={ETHlabelsh} data1={ETHBuydatah} data2={ETHSelldatah} data1Name={'BuyETH'} data2Name={'SellETH'}/> 
                  <div className="row align-items-center justify-content-center">
                    <div className='col'>
                      <div className="input-group input-group-sm mb-3">
                        <span className="input-group-text" id="inputGroup-sizing-sm">Buy</span>
                        <input type="number" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" value={ETHBuyTotal} readOnly />
                      </div>
                    </div>
                    <div className='col'>
                      <div className="input-group input-group-sm mb-3">
                        <span className="input-group-text" id="inputGroup-sizing-sm">Sell</span>
                        <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" value={ETHSellTotal} readOnly/>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      )}
      </main>
    </div>
  )
}

export default InvestComponents