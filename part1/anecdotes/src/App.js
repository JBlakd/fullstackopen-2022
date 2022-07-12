import { useState } from 'react'

const RandomButton = ({ setAnecdoteIdxState, numAnecdotes }) => {
  return (
    <button onClick={() => setAnecdoteIdxState(Math.floor(Math.random() * numAnecdotes))}>
      next anecdote
    </button>
  )
}

const Anecdote = ({ anecdotes, votes, index }) => (
  <>
    <div>
      {anecdotes[index]}
    </div>
    <div>
      has {votes[index]} votes
    </div>
  </>
)

const VoteButton = ({ votes, setVotes, index }) => {
  const newVotes = [...votes];
  ++newVotes[index]

  return (
    <button onClick={() => setVotes(newVotes)}>vote</button>
  )
}

const MostPopular = ({ anecdotes, votes }) => {
  let mostPopularIndex = 0
  for (let i = 0; i < votes.length; ++i) {
    if (votes[i] > votes[mostPopularIndex]) {
      mostPopularIndex = i
    }
  }

  return (
    <>
      <h1>Anecdote with most votes</h1>
      <Anecdote anecdotes={anecdotes} votes={votes} index={mostPopularIndex} />
    </>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  return (
    <div>
      <div>
        <Anecdote anecdotes={anecdotes} votes={votes} index={selected} />
      </div>
      <div>
        <VoteButton votes={votes} setVotes={setVotes} index={selected} />
        <RandomButton setAnecdoteIdxState={setSelected} numAnecdotes={anecdotes.length} />
      </div>
      <div>
        <MostPopular anecdotes={anecdotes} votes={votes} />
      </div>
    </div>
  )
}

export default App