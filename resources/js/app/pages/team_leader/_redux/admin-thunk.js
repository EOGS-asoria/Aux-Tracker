import {create_time_in_service} from "@/app/services/time-in-service";
import {adminSlice} from "./admin-slice";


export function create_time_in_thunk(data) {
  return async function (dispatch, getState) {

    const res = await create_time_in_service(data)
    return res;
    // dispatch(adminSlice.actions.incrementByAmount(10));
  
  };
}
 