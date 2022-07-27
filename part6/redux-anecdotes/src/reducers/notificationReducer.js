import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

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

export const setNotification = (content, timeoutSec) => {
  return async dispatch => {
    dispatch(notificationChange(content))
    setTimeout(() => {
      dispatch(notificationChange(''))
    }, timeoutSec * 1000)
  }
}

export const { notificationChange } = notificationSlice.actions
export default notificationSlice.reducer