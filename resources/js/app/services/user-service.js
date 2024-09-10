import axios from "axios";

export async function get_user_service(data) {
    const res = await axios.get('/api/user')
    return res.data
}