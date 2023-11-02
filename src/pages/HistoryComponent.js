import React, { useEffect, useState } from 'react'
import investService from '../services/invest.service'

const HistoryComponent = () => {

  let [depositR, setDepositR] = useState(null)
  let [takeOutR, setTakeOutR] = useState(null)
  let [tradeR, setTradeR] = useState(null)

  const handlerHistory = async () => {
    let deposit = (await investService.getDepositHistory()).data.sortData
    let takeout = (await investService.getTakeOutHistory()).data.sortData
    let trade = (await investService.getTradeHistory()).data.sortData

    setDepositR(deposit)
    setTakeOutR(takeout)
    setTradeR(trade)
  }

  useEffect(() => {
    handlerHistory()
  }, [])

  return (
    <div>
      <main>
      { depositR && takeOutR && tradeR &&(
        <div className="container mb-4">
          <div className="card mb-4 text-center">
            <h5 className="card-header">Function Description - Trade Recorder</h5>
            <div className="card-body">
              <p>1. Deposit and TakeOut Recorder</p>
              <p>2. buy or Sell for BTC and ETH Recorder</p>
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              Deposit(USD)
            </div>
            <div className="card-body">
              <table className="table table-striped">
                <thead>
                  <tr>
                  <th scope="col">#</th>
                  <th scope="col">Deposit</th>
                  <th scope="col">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {depositR.map((row, key) => {
                    return (                  
                    <tr key={key+1}>
                      <th scope="row">{key+1}</th>
                      <td>{row.deposit}</td>
                      <td>{row.date}</td>
                    </tr>)
                  })}
                </tbody>
              </table>    
            </div>
          </div>
          <hr />

          <div className="card">
            <div className="card-header">
              TakeOut(USD)
            </div>
            <div className="card-body">
              <table className="table table-striped">
                <thead>
                  <tr>
                  <th scope="col">#</th>
                  <th scope="col">TakeOut</th>
                  <th scope="col">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {takeOutR.map((row, key) => {
                    return (                  
                    <tr key={key+1}>
                      <th scope="row">{key+1}</th>
                      <td>{row.takeOut}</td>
                      <td>{row.date}</td>
                    </tr>)
                  })}
                </tbody>
              </table>    
            </div>
          </div>
          <hr />

          <div className="card">
            <div className="card-header">
              Trade
            </div>
            <div className="card-body">
              <table className="table table-striped">
                <thead>
                  <tr>
                  <th scope="col">#</th>
                  <th scope="col">Crypto</th>
                  <th scope="col">Trade</th>
                  <th scope="col">Price</th>
                  <th scope="col">Unit</th>
                  <th scope="col">Total</th>
                  <th scope="col">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {tradeR.map((row, key) => {
                    return (                  
                    <tr key={key+1}>
                      <th scope="row">{key+1}</th>
                      <td>{row.crypto}</td>
                      <td>{row.sellorbuy}</td>
                      <td>{row.price.toFixed(3)}</td>
                      <td>{row.unit.toFixed(3)}</td>
                      <td>{row.total.toFixed(3)}</td>
                      <td>{row.date}</td>
                    </tr>)
                  })}
                </tbody>
              </table>    
            </div>
          </div>
        </div>
      )}
      </main>
    </div>
  )
}

export default HistoryComponent