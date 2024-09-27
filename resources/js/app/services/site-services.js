 

import axios from "axios"

export async function get_site_service(data) {
    try {
        const res =await axios.get('/api/sites',data)
        return res
    } catch (error) { 
        return error
    }
}