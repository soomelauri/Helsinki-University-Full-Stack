import React from 'react'
import ReactDOM from 'react-dom/client'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import App from './App'
import noteReducer from './reducers/noteReducer'

const store = createStore(noteReducer)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)

// main.jsx is responsible for defining the store by:

// import {createStore}, import { Provider }
// const store = createStore(reducer)

// <Provider store={store} />
  // <App />
// </Provider>
