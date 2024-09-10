import axios from "axios";

export async function create_time_in_service(data) {
    const res =await axios.post('/api/time_in',data)
    return res.data
}

export async function get_time_in_user_by_id_service(id) {
    const res = await axios.get('/api/time_in/'+id)
    return res.data
}