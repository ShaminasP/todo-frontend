import Axios from "axios"
export const AxiosUser = Axios.create({
    baseURL: "https://todo-backend-h63u.onrender.com",
    headers: { 'Content-Type': 'application/json' }
})