import { get_time_in_user_by_id_service } from '../services/time-in-service';
import { get_user_service } from '../services/user-service';
import { appSlice } from './app-slice';

// export function addCartProducts(product_id) {
//   return async function (dispatch, getState) {
//     dispatch(appSlice.actions.incrementByAmount(10));

//   };
// }

export function get_user_thunk(product_id) {
  return async function (dispatch, getState) {
    const res =await get_user_service()
    dispatch(appSlice.actions.setUser(res));
  };
}
 

export function get_time_in_user_by_id_thunk(id) {
  return async function (dispatch, getState) {
    const res = await get_time_in_user_by_id_service(id)
    dispatch(appSlice.actions.setTimeLogs(res.data));
  };
}
 