import { createSlice } from '@reduxjs/toolkit'

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    user: {},
    time: { status: "", timer: "" },
    timeLogs:[]
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    },
    setTime: (state, action) => {
        state.time = action.payload
      },
      setTimeLogs: (state, action) => {
        state.timeLogs = action.payload
      },
  },
})

// Action creators are generated for each case reducer function
export const { setUser,setTime,setTimeLogs } = appSlice.actions

export default appSlice.reducer