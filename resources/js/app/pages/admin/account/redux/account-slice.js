 // account-slice.js
import { createSlice } from '@reduxjs/toolkit';

export const accountsSlice = createSlice({
    name: 'accounts',
    initialState: {
        accounts: [],
    },
    reducers: {
        setAccounts: (state, action) => {
            state.accounts = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setAccounts } = accountsSlice.actions;

export default accountsSlice.reducer;
