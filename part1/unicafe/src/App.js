import { useState } from 'react'

const Vote = ({ good, setGood, neutral, setNeutral, bad, setBad }) => {
  return (
    <>
      <h1>give feedback</h1>
      <VoteButton state={good} setState={setGood} text="good" />
      <VoteButton state={neutral} setState={setNeutral} text="neutral" />
      <VoteButton state={bad} setState={setBad} text="bad" />
    </>
  )
}

const VoteButton = ({ state, setState, text }) => (
  <button onClick={() => setState(state + 1)}>
    {text}
  </button>
)

const Statistics = ({ good, neutral, bad }) => {
  if (good === 0 && neutral === 0 && bad === 0) {
    return (
      <>
        <h1>statistics</h1>
        <div>No feedback given</div>
      </>
    )
  }

  const all = good + neutral + bad
  const average = (good - bad) / all;
  const positive = (good / all) * 100;

  return (
    <>
      <h1>statistics</h1>
      <StatisticsLine text="good" value={good} />
      <StatisticsLine text="neutral" value={neutral} />
      <StatisticsLine text="bad" value={bad} />
      <StatisticsLine text="all" value={all} />
      <StatisticsLine text="average" value={average} />
      <StatisticsLine text="positive" value={positive} />
    </>
  )
}

const StatisticsLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Vote good={good} setGood={setGood} neutral={neutral} setNeutral={setNeutral} bad={bad} setBad={setBad} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App