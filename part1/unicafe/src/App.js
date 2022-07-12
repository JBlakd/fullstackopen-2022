import { useState } from 'react'

const Vote = ({good, setGood, neutral, setNeutral, bad, setBad}) => {
  return (
    <>
      <h1>give feedback</h1>
      <VoteButton state={good} setState={setGood} text="good"/>
      <VoteButton state={neutral} setState={setNeutral} text="neutral"/>
      <VoteButton state={bad} setState={setBad} text="bad"/>
    </>
  )
}

const VoteButton = ({state, setState, text}) => (
  <button onClick={() => setState(state + 1)}>
    {text}
  </button>
)

const Stats = ({good, neutral, bad}) => (
  <>
    <h1>statistics</h1>
    <div>good {good}</div>
    <div>neutral {neutral}</div>
    <div>bad {bad}</div>
  </>
)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Vote good={good} setGood={setGood} neutral={neutral} setNeutral={setNeutral} bad={bad} setBad={setBad}/>
      <Stats good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App