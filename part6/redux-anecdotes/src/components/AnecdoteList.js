import { useDispatch, useSelector } from 'react-redux'
import { likeAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const Anecdote = ({ anecdote }) => {
  const dispatch = useDispatch()

  const vote = async (anecdote) => {
    const anecdoteAfterVoted = await anecdoteService.update(anecdote.id, { ...anecdote, votes: anecdote.votes + 1 })
    dispatch(likeAnecdote(anecdoteAfterVoted.id))
    dispatch(setNotification(`you voted ${anecdoteAfterVoted.content}`, 3))
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
  const filter = useSelector(state => state.filter)
  // console.log('AnecdoteList anecdotes:', anecdotes)
  // console.log('AnecdoteList filter:', filter)

  return (
    <div>
      {anecdotes.map(a => {
        if (filter === '' || a.content.toLowerCase().includes(filter.toLowerCase())) {
          return (<Anecdote key={a.id} anecdote={a} />)
        }
        return <></>
      })}
    </div>
  )
}

export default AnecdoteList