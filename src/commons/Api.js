const BASE_URL = 'https://18.204.20.100/'

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

export const SaveUser = async (path, method, params, token) => {
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

export const GetAll = (url, data) => requestApi(url, 'GET', data)
export const Save = (url, method, data) => requestApi(url, method, data)
export const Delete = (url, data) => requestApi(url, 'DELETE', data)
