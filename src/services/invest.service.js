import axios from 'axios'

const URL = 'http://localhost:8080'

class InvestService {

  depositIn(deposit) {
    let token = null

    if (localStorage.getItem('user')) {
      token = JSON.parse(localStorage.getItem('user')).token
    } else {
      token = ''
    }
    
    return axios.post(URL+'/invest/api/invest/deposit', {deposit}, {
      headers: {
        Authorization: token
      }
    })
  }

  take(takeOut) {
    console.log('takeOut')
    let token = null

    if (localStorage.getItem('user')) {
      token = JSON.parse(localStorage.getItem('user')).token
    } else {
      token = ''
    }

    return axios.post(URL+'/invest/api/invest/takeout', {takeOut}, {
      headers: {
        Authorization: token
      }
    })

  }

  buyBTC(price, unit) {
    let token = null

    if (localStorage.getItem('user')) {
      token = JSON.parse(localStorage.getItem('user')).token
    } else {
      token = ''
    }
    
    return axios.get(URL+'/invest/api/invest/buy/BTC', {
      params: 
        { price: price, 
          unit: unit,
        },
      headers: {
        Authorization: token
      }
    })
  }

  sellBTC(price, unit) {

    let token = null

    if (localStorage.getItem('user')) {
      token = JSON.parse(localStorage.getItem('user')).token
    } else {
      token = ''
    }


    
    return axios.get(URL+'/invest/api/invest/sell/BTC', {
      params: 
        { price: price, 
          unit: unit,
        },
      headers: {
        Authorization: token
      }
    })
  }

  buyETH(price, unit) {
    let token = null

    if (localStorage.getItem('user')) {
      token = JSON.parse(localStorage.getItem('user')).token
    } else {
      token = ''
    }
    
    return axios.get(URL+'/invest/api/invest/buy/ETH', {
      params: 
        { price: price, 
          unit: unit,
        },
      headers: {
        Authorization: token
      }
    })
  }

  sellETH(price, unit) {
    let token = null

    if (localStorage.getItem('user')) {
      token = JSON.parse(localStorage.getItem('user')).token
    } else {
      token = ''
    }
    
    return axios.get(URL+'/invest/api/invest/sell/ETH', {
      params: 
        { price: price, 
          unit: unit,
        },
      headers: {
        Authorization: token
      }
    })
  }

  getCrypto() {
    let token = null

    if (localStorage.getItem('user')) {
      token = JSON.parse(localStorage.getItem('user')).token
    } else {
      token = ''
    }

    return axios.get(URL+'/invest/api/invest/now', {
      headers: {
        Authorization: token
      }
    })
  }

  getDepositHistory() {
    let token = null

    if (localStorage.getItem('user')) {
      token = JSON.parse(localStorage.getItem('user')).token
    } else {
      token = ''
    }

    return axios.get(URL+'/invest/api/invest/deposit', {
      headers: {
        Authorization: token
      }
    })
  }

  getTakeOutHistory() {
    let token = null

    if (localStorage.getItem('user')) {
      token = JSON.parse(localStorage.getItem('user')).token
    } else {
      token = ''
    }

    return axios.get(URL+'/invest/api/invest/takeout', {
      headers: {
        Authorization: token
      }
    })
  }

  getTradeHistory() {
    let token = null

    if (localStorage.getItem('user')) {
      token = JSON.parse(localStorage.getItem('user')).token
    } else {
      token = ''
    }

    return axios.get(URL+'/invest/api/invest/trade/recorder', {
      headers: {
        Authorization: token
      }
    })
  }

}


let investService = new InvestService()

export default investService