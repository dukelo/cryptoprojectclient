import React from 'react'
// import TradeBarChart from '../components/TradeBarChart'
// import investService from '../services/invest.service'
import HomeLineChart from '../components/HomeLineChart'
import HomePieChart from '../components/HomePieChart'
import HomeBarChart from '../components/HomeBarChart'

const HomeComponent = () => {

  return (
    <div >
      <main>
        <div className="container mb-4">
          <div className="row align-items-start justify-content-center">
            <div className="col-12 col-lg-9 mb-4">
              <div className="card">
                <h5 className="card-header">Side Project - MERN Project</h5>
                <div className="card-body">
                <h5 className="card-title">Simulate - Crypto Assets managenemt</h5>
                <p className="card-text">
                  This side project is simulation for Crypto Assets Management. This project is MERN project that bulid by express for back-end and rect for front-end
                  and DB is mongoDB. The project feature is including monitor BTC, ETH price immediately, and buy or sell by price, trading recorder, and personal crypto assets data visualization.
                </p>
                </div>
              </div>
            </div>

            <div className="col-12 col-lg-3 mb-4">
              <div className="card">
                <h5 className="card-header">Test Account</h5>
                <div className="card-body">
                  {/* <h5 className="card-title">Special title treatment</h5> */}
                  <p className="card-text">You can register new account or login account as below:</p>
                  <ul className="list-group mb-3">
                    <li className="list-group-item active" aria-current="true">email</li>
                    <li className="list-group-item">tom@gmail.com</li>
                  </ul>
                  <ul className="list-group mb-3">
                    <li className="list-group-item active" aria-current="true">password</li>
                    <li className="list-group-item">tom1234</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="row align-items-start justify-content-center">
            <div className="col-12 col-lg-3 mb-4">
              <div className="card">
                <h5 className="card-header">Package for this project</h5>
                <div className="card-body">
                  <ul className="list-group mb-3">
                    <li className="list-group-item active" aria-current="true">Main Package</li>
                    <li className="list-group-item">express - for backend</li>
                    <li className="list-group-item">mongoose - for ODM</li>
                    <li className="list-group-item">jsonwebtoken - for JWT</li>
                    <li className="list-group-item">passport for - login</li>
                    <li className="list-group-item">axios</li>
                    <li className="list-group-item">react for - frontend</li>
                    <li className="list-group-item">react-chartjs-2 - for data visualization</li>
                  </ul>

                  <ul className="list-group mb-3">
                    <li className="list-group-item active" aria-current="true">DataBase and Tool</li>
                    <li className="list-group-item">MongoDB Atlas</li>
                    <li className="list-group-item">MongoDB Compass</li>
                  </ul>

                  <ul className="list-group">
                    <li className="list-group-item active" aria-current="true">CDN</li>
                    <li className="list-group-item">Bootstrap</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-12 col-lg-3 mb-4">
              <div className="card mb-3">
                <h5 className="card-header">Project Feature</h5>
                <div className="card-body">
                  {/* <h5 className="card-title">Simulate - Crypto Assets managenemt</h5> */}
                  {/* <p className="card-text">This side project is simulation for Crypto Assets. Including monitor BTC, ETH price immediately, and buy or sell trading recorder, and personal crypto assets data visualization.</p> */}
                  <ul className="list-group mb-3">
                    <li className="list-group-item active" aria-current="true">Feature</li>
                    <li className="list-group-item">
                      <h6 className='fw-semibold'>Monitor</h6>
                      <p>monitor BTC, ETH price immediately</p>
                    </li>
                    <li className="list-group-item">
                      <h6 className='fw-semibold'>Buy or Sell</h6>
                      <p>Simulate buy or sell for BTC && ETH</p>
                    </li>
                    <li className="list-group-item">
                      <h6 className='fw-semibold'>Visualization</h6>
                      <p>personal crypto assets data visualization</p>
                    </li>
                    <li className="list-group-item">
                      <h6 className='fw-semibold'>Recorder</h6>
                      <p>Trade recorder for deposit, takeOut, buy or sell</p>
                    </li>
                  </ul>
                </div>
              </div>

            </div>

            <div className="col-12 col-lg-3 mb-4">
              <div className="col-12 mb-4">
                <div className="card">
                  <h5 className="card-header">Crypto Price</h5>
                  <div className="card-body">
                    {/* <h5 className="card-title">Special title treatment</h5>
                    <p className="card-text">With supporting text below as a natural lead-in to additional content.</p> */}
                    <HomeLineChart />
                  </div>
                </div>
              </div>

              <div className="col-12 mb-4">
                <div className="card">
                  <h5 className="card-header">Crypto Assets</h5>
                  <div className="card-body">
                    {/* <h5 className="card-title">Special title treatment</h5>
                    <p className="card-text">With supporting text below as a natural lead-in to additional content.</p> */}
                    <HomePieChart />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-lg-3 mb-4">
              <div className="col-12 mb-4">
                <div className="card">
                  <h5 className="card-header">Trade Recorder</h5>
                  <div className="card-body">
                    {/* <h5 className="card-title">Special title treatment</h5>
                    <p className="card-text">With supporting text below as a natural lead-in to additional content.</p> */}
                    <HomeBarChart />
                  </div>
                </div>
              </div>

              <div className="col-12 mb-4">
                <div className="card">
                  <h5 className="card-header">Trade History</h5>
                  <div className="card-body">
                    {/* <h5 className="card-title">Special title treatment</h5>
                    <p className="card-text">With supporting text below as a natural lead-in to additional content.</p> */}
                    <table className="table table-striped" style={{ wordBreak: 'break-all'}}>
                      <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Deposit</th>
                        <th scope="col">Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th scope="row">1</th>
                          <td>56000</td>
                          <td>2023-10-29T06:16:55.840Z</td>
                        </tr>
                        <tr>
                          <th scope="row">2</th>
                          <td>100</td>
                          <td>2023-10-29T06:26:57.534Z</td>
                        </tr>
                        <tr>
                          <th scope="row">3</th>
                          <td>3000</td>
                          <td>2023-10-29T06:26:57.534Z</td>
                        </tr>
                      </tbody>
                    </table> 
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default HomeComponent