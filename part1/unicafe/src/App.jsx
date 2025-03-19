import { useState } from 'react'

const Button = ({ onClick, text}) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const StatisticLine = ({ text, value, unit }) => {
  return (
    <tr>
      <td>{text}:</td>
      <td>{value}{unit}</td>
    </tr>
  )
}

const Statistics = ({ good, neutral, bad, positive, average, total }) => {
  if (total === 0) {
    return (
      <div>
        <h2>statistics:</h2>
        <p>No feedback given</p>
      </div>
    )
  } else {
    return (
      <div>
        <h2>statistics:</h2>
        <table>
          <tbody>
          <StatisticLine text="good" value = {good} />
          <StatisticLine text="neutral" value = {neutral} />
          <StatisticLine text="bad" value = {bad} />
          <StatisticLine text="average" value = {average} />
          <StatisticLine text="positive" value = {positive} unit="%" />
          <StatisticLine text="total" value = {total} />
          </tbody>
        </table>
      </div>
    )
  }
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [positive, setPositive] = useState(0)
  const [average, setAverage] = useState(0)


  const handleGoodClick = () => {
    const updatedGood = good + 1
    setGood(updatedGood)

    const updatedTotal = updatedGood + neutral + bad
    setTotal(updatedTotal)

    const updatedPositive =  ((updatedGood / updatedTotal) * 100)
    setPositive(updatedPositive)

    const updatedAverage = ((updatedGood - bad) / updatedTotal)
    setAverage(updatedAverage)
  }

  const handleNeutralClick = () => {
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)

    const updatedTotal = updatedNeutral + good + bad
    setTotal(updatedTotal)

    const updatedPositive =  ((good / updatedTotal) * 100)
    setPositive(updatedPositive)

    const updatedAverage = ((good - bad) / updatedTotal)
    setAverage(updatedAverage)
  }

  const handleBadClick = () => {
    const updatedBad = bad + 1
    setBad(updatedBad)

    const updatedTotal = updatedBad + good + neutral
    setTotal(updatedTotal)

    const updatedPositive =  ((good / updatedTotal) * 100)
    setPositive(updatedPositive)

    const updatedAverage = ((good - updatedBad) / updatedTotal)
    setAverage(updatedAverage)

  }

  return (
    <div>
      <h2>give feedback</h2>
      <Button onClick={handleGoodClick} text='Good' />
      <Button onClick={handleNeutralClick} text='Neutral' />
      <Button onClick={handleBadClick} text='Bad' />

      <Statistics good={good}
      neutral={neutral}
      bad={bad}
      average={average}
      positive={positive} 
      total={total} />

    </div>
  )
}

export default App
