import Axios from "axios"
export const AxiosUser = Axios.create({
    baseURL: "http://localhost:3031",
    headers: { 'Content-Type': 'application/json' }
})