// src/App.jsx
import React from 'react'
import { Provider, useDispatch, useSelector } from 'react-redux'
import store from "./store"


const AppContent = () => {
  const { good, ok, bad } = useSelector(state => state)
  const dispatch = useDispatch()

  return (
    <div>
      <button onClick={() => dispatch({ type: 'GOOD' })}>good</button>
      <button onClick={() => dispatch({ type: 'OK' })}>ok</button>
      <button onClick={() => dispatch({ type: 'BAD' })}>bad</button>
      <button onClick={() => dispatch({ type: 'ZERO' })}>reset stats</button>

      <p>good {good}</p>
      <p>ok {ok}</p>
      <p>bad {bad}</p>
    </div>
  )
}

const App = () => (
  <Provider store={store}>
    <AppContent />
  </Provider>
)

export default App
