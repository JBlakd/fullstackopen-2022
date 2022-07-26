import { createSlice } from '@reduxjs/toolkit'

const initialState = 'dfgfd'

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    notificationChange(state, action) {
      console.log('notification change payload: ', action.payload)
      return action.payload
    }
  }
})

// export const notificationChange = notification => {
//   return {
//     type: 'SET_NOTIFICATION',
//     notification,
//   }
// }

// const notificationReducer = (state = '', action) => {
//   switch (action.type) {
//     case 'SET_NOTIFICATION':
//       return action.notification
//     default:
//       return state
//   }
// }

export const { notificationChange } = notificationSlice.actions
export default notificationSlice.reducer