let timeoutId
const reducer = (state = '', action) => {
  switch (action.type) {
    case 'SET':
      return action.payload
    case 'CLEAR':
      return ''
    default:
      return state
  }
}

export const setNotification = (message, seconds) => {
  return dispatch => {
    dispatch({ type: 'SET', payload: message })
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => dispatch({ type: 'CLEAR' }), seconds * 1000)
  }
}

export default reducer
