import loginService from '../services/loginService'

const userReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.payload
    case 'LOGOUT':
      return null
    default:
      return state
  }
}

export const setUser = (user) => {
  return {
    type: 'SET_USER',
    payload: user
  }
}

export const loginUser = (credentials) => {
  return async (dispatch) => {
    const user = await loginService.login(credentials)
    window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
    dispatch(setUser(user))
  }
}

export const logoutUser = () => {
  return {
    type: 'LOGOUT'
  }
}

export default userReducer
