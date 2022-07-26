import { createSlice } from '@reduxjs/toolkit'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    createAnecdote(state, action) {
      const content = asObject(action.payload)
      state.push(content)
      state.sort((a, b) => b.votes - a.votes)
    },
    likeAnecdote(state, action) {
      ++state.find(a => a.id === action.payload).votes
      state.sort((a, b) => b.votes - a.votes)
    }
  }
})



// export const likeAnecdote = (content) => (
//   {
//     type: 'LIKE_ANECDOTE',
//     data: content
//   }
// )

// export const createAnecdote = (content) => (
//   {
//     type: 'NEW_ANECDOTE',
//     data: content
//   }
// )

// const initialState = anecdotesAtStart.map(asObject)

// const anecdoteReducer = (state = initialState, action) => {
//   console.log('state now: ', state)
//   console.log('action', action)

//   let ret = state

//   switch (action.type) {
//     case 'NEW_ANECDOTE':
//       const concattedState = [...state, asObject(action.data)]
//       console.log('concatted state: ', concattedState)
//       ret = concattedState
//       break
//     case 'LIKE_ANECDOTE':
//       ret = state.map(s => {
//         if (s.id === action.data) {
//           return { ...s, votes: s.votes + 1 }
//         }
//         return s
//       })
//       break
//     default:
//       ret = state
//       break
//   }

//   return ret.sort((a, b) => b.votes - a.votes)
// }

export const { createAnecdote, likeAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer