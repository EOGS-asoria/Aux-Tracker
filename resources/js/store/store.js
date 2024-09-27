                import appSlice from '@/app/_redux/app-slice';
                import adminSlice from '@/app/pages/admin/_redux/admin-slice';
                import positionsSlice from '@/app/pages/admin/position/redux/position-slice';
                import accountsSlice from '@/app/pages/admin/account/redux/account-slice'; 
                import sitesSlice from '@/app/pages/admin/site/redux/site-slice'; 
                import { configureStore } from '@reduxjs/toolkit';

                const store = configureStore({
                    reducer: {
                        app: appSlice,
                        admin: adminSlice,
                        positions: positionsSlice,
                        accounts: accountsSlice,
                        sites: sitesSlice,
                    },
                });

                export const RootState = store.getState;
                export const AppDispatch = store.dispatch;

                export default store;
