            import axios from "axios"

            export async function get_position_service(data) {
                try {
                    const res =await axios.get('/api/positions',data)
                    return res
                } catch (error) { 
                    return error
                }
            }