const BASE_URL = 'http://localhost:8000/'

const auth = JSON.parse(localStorage.getItem('token'))

const GetAll = async (path, pagination) => {
  try {
    const data = await fetch(pagination ? pagination : `${BASE_URL}${path}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${auth.token}`,
      },
    })
    return data.json()
  } catch (error) {
    console.log(error)
  }
}

const Save = async (path, method, params) => {
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

const Delete = async path => {
  try {
    const data = await fetch(`${BASE_URL}${path}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${auth.token}`,
      },
    })
    return data.json()
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  GetAll,
  Save,
  Delete,
}
