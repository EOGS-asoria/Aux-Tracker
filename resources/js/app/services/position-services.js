import axios from "axios";

export async function get_position_service() {
    try {
        const res = await axios.get("/api/positions");
        return res;
    } catch (error) {
        return error;
    }
}

export async function create_position_service(data) {
    try {
        const res = await axios.post("/api/positions", data);
        return res;
    } catch (error) {
        return error;
    }
}
