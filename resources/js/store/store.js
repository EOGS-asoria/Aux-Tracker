
import appSlice from '@/app/_redux/app-slice';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
    reducer: {
        app: appSlice,
    },
});

export const RootState = store.getState;
export const AppDispatch = store.dispatch;

export default store;
