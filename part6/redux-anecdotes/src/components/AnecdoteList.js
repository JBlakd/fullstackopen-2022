import { useDispatch, useSelector } from 'react-redux'
import { likeAnecdote } from '../reducers/anecdoteReducer'

const Anecdote = ({ anecdote }) => {
  const dispatch = useDispatch()
  const vote = (id) => {
    dispatch(likeAnecdote(id))
  }

  return (
    <div>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={() => vote(anecdote.id)}>vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)

  return (
    <ul>
      {anecdotes.map(a =>
        <Anecdote
          key={a.id}
          anecdote={a}
        />
      )}
    </ul>
  )
}

export default AnecdoteList