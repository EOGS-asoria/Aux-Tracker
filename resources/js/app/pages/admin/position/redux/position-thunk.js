import { create_position_service, get_position_service } from "@/app/services/position-services";
import { positionsSlice } from "./position-slice";

export function get_position_thunk() {
    return async function (dispatch, getState) {
        const res = await get_position_service();
        dispatch(positionsSlice.actions.setPositions(res));
    };
}


export function create_position_thunk(data) {
    return async function (dispatch, getState) {
        const res = await create_position_service(data);
    };
}
