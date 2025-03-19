const App = (props) => {
    const {counter} = props
    return (
      <div>{counter}</div>
    )
  }
  
  export default App



//main.jsx

import ReactDOM from 'react-dom/client'

import App from './App'

let counter = 1

ReactDOM.createRoot(document.getElementById('root')).render(
  <App counter={counter} />
)
