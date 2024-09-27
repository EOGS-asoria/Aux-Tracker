import { createSlice } from '@reduxjs/toolkit';

export const sitesSlice = createSlice({
    name: 'sites',
    initialState: {
        sites: [],
    },
    reducers: {
        setSites: (state, action) => {
            state.sites = action.payload; // Set the sites data
        },
    },
});

// Export the action creator
export const { setSites } = sitesSlice.actions;

export default sitesSlice.reducer;
