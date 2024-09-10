
import appSlice from '@/app/_redux/app-slice';
import adminSlice from '@/app/pages/admin/_redux/admin-slice';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
    reducer: {
        app: appSlice,
        admin:adminSlice
    },
});

export const RootState = store.getState;
export const AppDispatch = store.dispatch;

export default store;
