 // account-thunk.js
import { get_account_service } from "@/app/services/account-services";
import { accountsSlice } from "./account-slice";

export function get_account_thunk() {
    return async function (dispatch) {
        const res = await get_account_service();
        dispatch(accountsSlice.actions.setAccounts(res));
    };
}
