const BASE_URL = 'http://localhost:8000/'

const auth = JSON.parse(localStorage.getItem('token'))

const requestApi = async (path, method, params) => {
  try {
    const data = await fetch(`${BASE_URL}${path}`, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${auth.token}`,
      },
      body: JSON.stringify(params),
    })
    return data.json()
  } catch (error) {
    console.log(error)
  }
}

const SaveUser = async (path, method, params, token) => {
  try {
    const data = await fetch(`${BASE_URL}${path}`, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(params),
    })
    return data.json()
  } catch (error) {
    console.log(error)
  }
}

const GetAll = (url, data) => requestApi(url, 'GET', data)
const Save = (url, method, data) => requestApi(url, method, data)
const Delete = (url, data) => requestApi(url, 'DELETE', data)

module.exports = {
  GetAll,
  SaveUser,
  Save,
  Delete,
}
