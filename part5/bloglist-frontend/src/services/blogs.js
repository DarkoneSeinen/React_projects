import axios from 'axios'
const baseUrl = 'https://literate-space-trout-979xvx5x4xgwf7vp5-3003.app.github.dev/api/blogs' // cámbialo por el correcto

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const config = { headers: { Authorization: token } }
  const response = await axios.get(baseUrl, config)
  return response.data
}

export default { getAll, setToken }
