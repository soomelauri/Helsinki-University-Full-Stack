import React from 'react'
import ReactDOM from 'react-dom/client'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { createNote } from './reducers/noteReducer'
import { filterChange } from './reducers/filterReducer'

// Learned the difference between default imports and named imports

import App from './App'
import noteReducer from './reducers/noteReducer'
import filterReducer from './reducers/filterReducer'

const reducer = combineReducers({
  notes: noteReducer,
  filter: filterReducer
})

const store = createStore(reducer)

// let's log all the actions to the console when anything changes using the store.subscribe
store.subscribe(() => console.log(store.getState()))

store.dispatch(createNote('combineReducers forms one reducer from many simple reducers'))

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App/>
  </Provider>
)

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <Provider store={store}>
//     <App />
//   </Provider>
// )

// main.jsx is responsible for defining the store by:

// import {createStore}, import { Provider }
// const store = createStore(reducer)

// <Provider store={store} />
  // <App />
// </Provider>
