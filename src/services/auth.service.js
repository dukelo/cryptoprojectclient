import axios from 'axios'

// const URL = 'http://localhost:8080'
const URL = 'https://cryptoprojectbackend.onrender.com'

class AuthService {

  login(email, password) {
    return axios.post(URL+'/auth/api/login', {
      email,
      password
    })
  }

  logout() {
    localStorage.removeItem('user')
  }

  register(username, email, password) {
    return axios.post(URL+'/auth/api/register', {
      username,
      email,
      password
    })
  }

  getProfile() {
    let token = null
    // console.log('localStorage')
    // console.log(localStorage.getItem('user'))
    if (localStorage.getItem('user')) {
      token = JSON.parse(localStorage.getItem('user')).token
    } else {
      token = ''
    }

    return axios.get(URL+'/invest/api/invest/profile', {
      headers: {
        Authorization: token
      }
    })
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'))
  }

  changeProfile(_id, username, email, password) {
    console.log('change profile')
    let token = null

    if (localStorage.getItem('user')) {
      token = JSON.parse(localStorage.getItem('user')).token
    } else {
      token = ''
    }

    return axios.patch(URL+'/invest/api/invest/profile/change', {
      _id, username, email, password
    }, {
      headers: {
        Authorization: token
      }
    })
  }
}


let authService = new AuthService()

export default authService

