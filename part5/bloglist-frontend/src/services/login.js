import axios from 'axios'
const baseUrl = 'https://literate-space-trout-979xvx5x4xgwf7vp5-3003.app.github.dev/api/login'

const login = async credentials => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

export default { login }
