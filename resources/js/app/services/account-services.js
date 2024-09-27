 

import axios from "axios"

export async function get_account_service(data) {
    try {
        const res =await axios.get('/api/accounts',data)
        return res
    } catch (error) { 
        return error
    }
}