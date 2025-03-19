import { useState } from 'react'

const Button = ({ onClick, text}) => (
  <button onClick={onClick}>
    {text}
  </button>
)

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

    const updatedPositive = positive + 1
    setPositive(updatedPositive)

    const updatedTotal = updatedGood + neutral + bad
    setTotal(updatedTotal)

    const updatedAverage = ((updatedGood - bad) / updatedTotal)
    setAverage(updatedAverage)
  }

  const handleNeutralClick = () => {
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)

    const updatedTotal = updatedNeutral + good + bad
    setTotal(updatedTotal)

    const updatedAverage = ((good - bad) / updatedTotal)
    setAverage(updatedAverage)
  }

  const handleBadClick = () => {
    const updatedBad = bad + 1
    setBad(updatedBad)

    const updatedTotal = updatedBad + good + neutral
    setTotal(updatedTotal)

    const updatedAverage = ((good - updatedBad) / updatedTotal)
    setAverage(updatedAverage)

  }

  return (
    <div>
      <h2>give feedback</h2>
      <Button onClick={handleGoodClick} text='Good' />
      <Button onClick={handleNeutralClick} text='Neutral' />
      <Button onClick={handleBadClick} text='Bad' />

      <h2>statistics</h2>
      <p>good: {good}</p>
      <p>neutral: {neutral}</p>
      <p>bad: {bad}</p>
      <p>average: {average}</p>
      <p>total: {total}</p>
    </div>
  )
}

export default App
