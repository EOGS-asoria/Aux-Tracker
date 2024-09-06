import { createSlice } from '@reduxjs/toolkit';

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    time: {
      status: '',
      timer: ''
    },
    logs: []  
  }, 
  reducers: {
    setTime: (state, action) => {
      state.time = action.payload;
    },
    addLog: (state, action) => {
      state.logs.push(action.payload); 
    },
  },
});


export const { setTime, addLog } = appSlice.actions;

export default appSlice.reducer;
