              import { createSlice } from '@reduxjs/toolkit'

              export const positionsSlice = createSlice({
                name: 'positions',
                initialState: {
                  positions: {  
                      data:[] 
                  },
                },
                reducers: {
                  setPositions: (state, action) => {
                    state.positions = action.payload
                  },
                },
              })

              // Action creators are generated for each case reducer function
              export const { setPositions } = positionsSlice.actions

              export default positionsSlice.reducer




