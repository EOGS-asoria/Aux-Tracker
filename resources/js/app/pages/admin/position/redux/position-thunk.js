                      import { get_position_service } from "@/app/services/position-services";
                      import {positionsSlice} from "./position-slice";

                      export function get_position_thunk(product_id) {
                          return async function (dispatch, getState) {
                            const res =await get_position_service()
                            dispatch(positionsSlice.actions.setPositions(res));
                          };
                        }
                        
                        