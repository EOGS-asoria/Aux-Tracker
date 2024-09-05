import { createSlice } from '@reduxjs/toolkit'

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    time: {
      status: '',
      timer: ''
    }
  },
  reducers: {
    setTime: (state, action) => {
      state.time = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setTime } = appSlice.actions

export default appSlice.reducer