import { useDispatch, useSelector } from 'react-redux'
import { likeAnecdote } from '../reducers/anecdoteReducer'
import { notificationChange } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote }) => {
  const dispatch = useDispatch()

  const vote = (anecdote) => {
    dispatch(likeAnecdote(anecdote.id))
    dispatch(notificationChange(`you voted ${anecdote.content}`))
    setTimeout(() => {
      dispatch(notificationChange(''))
    }, 5000)
  }

  return (
    <div>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={() => vote(anecdote)}>vote</button>
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