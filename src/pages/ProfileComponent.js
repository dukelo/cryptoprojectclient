import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import authService from '../services/auth.service'
import DoughnutChart from '../components/DoughnutChart'

const realTimeURL = 'https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH&tsyms=USD'

const ProfileComponent = () => {

  const navigate = useNavigate()
  let [profile, setProfile] = useState(null)
  let [username, setUsername] = useState(null)
  let [email, setEmail] = useState(null)
  let [password, setPassword] = useState('reserve')
  let [_id, set_id] = useState(null)
  let [BTCData, setBTCData] = useState(0)
  let [ETHData, setETHData] = useState(0)
  
  // get cypto assets
  const handlerProfile = async () => {
    let user = await authService.getProfile()
    setProfile(user.data)
    setUsername(user.data.username)
    setEmail(user.data.email)
    set_id(user.data._id)
  }

  let initialPrice = async () => {
    let priceData = (await axios.get(realTimeURL)).data
    let BTCPrice = [priceData.BTC.USD]
    let ETHPrice = [priceData.ETH.USD]
    setBTCData(BTCPrice)
    setETHData(ETHPrice)
  }

  useEffect(() => {
    handlerProfile()
    initialPrice()
  }, [])

  const handlerUsername = (e) => {
    console.log(e.target.value)
    setUsername(e.target.value)
  }

  const handlerEmail = (e) => {
    console.log(e.target.value)
    setEmail(e.target.value)
  }

  const handlerPassword = (e) => {
    console.log(e.target.value)
    setPassword(e.target.value)
  }

  const handlerChangeSetting = async () => {
    await authService.changeProfile(_id, username, email, password)
    authService.logout()
    navigate('/login')
  }

  return (
    <div>
      <main>
        { profile && (
          <div className="container mb-4">
            <div className="card mb-4 text-center">
              <h5 className="card-header">Function Description - Crypto Assets && Personal Profile</h5>
              <div className="card-body">
                <p>1. Crypto Assets(USD, BTC, ETH)</p>
                <p>2. Personal Profile and Setting</p>
              </div>
            </div>

            <div className="row align-items-start justify-content-center">
              <div className="col-12 col-lg-4 mb-4">
                <div className="card mb-4" >
                  <div className="card-header fw-bold">
                    Personal Information
                  </div>
                  <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-between align-items-start">
                      <div className="ms-2 me-auto">
                        <div className="fw-bold">ID</div>
                          <p style={{wordBreak: 'break-all'}}>{profile._id}</p>
                      </div>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-start">
                      <div className="ms-2 me-auto">
                        <div className="fw-bold">Username</div>
                        {profile.username}
                      </div>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-start">
                      <div className="ms-2 me-auto">
                        <div className="fw-bold">Email</div>
                        {profile.email}
                      </div>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-start">
                      <div className="ms-2 me-auto">
                        <div className="fw-bold">Register Date</div>
                        {profile.date}
                      </div>
                    </li>
                  </ul>

                </div>
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
              </div>

              <div className="col-12 col-lg-8 mb-4">
                <div className="card">
                  <h5 className="card-header">Crypto Assets Doughnut Chart</h5>
                  <div className="card-body">
                    <DoughnutChart profile={profile} BTCData={BTCData} ETHData={ETHData}/>
                  </div>
                </div>
              </div>
            </div>

            <div className="row align-items-start justify-content-start">
              <div className="col-12">
                <div className="card mb-4" >
                  <div className="card-header fw-bold">
                    Setting Personal Information
                  </div>
                  <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-between align-items-start">
                      <div className="ms-2 me-auto">
                        <div className="fw-bold">ID</div>
                          <p style={{wordBreak: 'break-all'}}>{profile._id}</p>
                      </div>
                    </li>
                    <li className="list-group-item justify-content-between align-items-start">
                      <div className="ms-2 me-auto">
                        <label htmlFor="inputUsername" className="form-label fw-bold">User Name</label>
                        <input type="text" id="inputUsername" className="form-control" aria-describedby="usernameHelpBlock" value={profile.username} onChange={handlerUsername}/>
                        <div id="usernameHelpBlock" className="form-text">
                          Your username must be 8-20 characters long.
                        </div>
                      </div>
                    </li>
                    <li className="list-group-item justify-content-between align-items-start">
                      <div className="ms-2 me-auto">
                      <label htmlFor="inputEmail" className="form-label fw-bold">Email</label>
                        <input type="email" id="inputEmail" className="form-control" aria-describedby="emailHelpBlock" value={profile.email} onChange={handlerEmail}/>
                        <div id="emailHelpBlock" className="form-text">
                          Your password must be 8-20 characters long.
                        </div>
                      </div>
                    </li>
                    <li className="list-group-item justify-content-between align-items-start">
                      <div className="ms-2 me-auto">
                      <label htmlFor="inputPassword5" className="form-label fw-bold">Password</label>
                        <input type="password" id="inputPassword5" className="form-control" aria-describedby="passwordHelpBlock" value='reserve' onChange={handlerPassword}/>
                        <div id="passwordHelpBlock" className="form-text">
                          Your password must be 8-20 characters long.
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
                <div>
                  <button type="button" className="btn btn-primary" onClick={handlerChangeSetting}>Change Setting Submit</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default ProfileComponent