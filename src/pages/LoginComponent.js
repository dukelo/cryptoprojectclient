import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import authService from '../services/auth.service'

const LoginComponent = ({ currentUser, setCurrentUser}) => {

  const navigate = useNavigate()
  let [message, setMessage] = useState(null)
  let [email, setEmail] = useState('name@example.com')
  let [password, setPassword] = useState('Password')

  const handlerEmail = (e) => {
    setEmail(e.target.value)
  }

  const handlerPassword = (e) => {
    setPassword(e.target.value)
  }

  const handlerLogin = async() => {
    try {
      let response = await authService.login(email, password)
      // console.log(response)
      localStorage.setItem("user", JSON.stringify(response.data))
      setCurrentUser(authService.getCurrentUser())
      navigate('/profile')
    } catch(e) {
      setMessage(e.response.data)
    }
  }

  return (
    <div>
      <main>
        <div className="modal modal-sheet position-static d-block p-4 py-md-5" tabIndex="-1" role="dialog" id="modalSignin">
          <div className="modal-dialog" role="document">
            <div className="modal-content rounded-4 shadow">
              <div className="modal-header p-5 pb-4 border-bottom-0">
                <h1 className="fw-bold mb-0 fs-2">Login</h1>
              </div>
                
              <div className="modal-body p-5 pt-0">
                {message && <div className="alert alert-danger">{message}</div>}
                  <div className="form-floating mb-3">
                    <input type="email" className="form-control rounded-3" id="emailInput" placeholder={email} onChange={handlerEmail}/>
                    <label htmlFor="emailInput">Email address</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input type="password" className="form-control rounded-3" id="passwordInput" placeholder={password} onChange={handlerPassword}/>
                    <label htmlFor="passwordInput">Password</label>
                  </div>
                  <button className="w-100 mb-2 btn btn-lg rounded-3 btn-primary" type="submit" onClick={handlerLogin}>Login</button>
                  <small className="text-body-secondary">By clicking Login, you agree to the terms of use.</small>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default LoginComponent