import { AxiosUser } from "./axiosInstance";

export const userRegister = async (data) => {
    try {
        const response = await AxiosUser.post("/register", data)
        console.log(response);
        return response;
    } catch (error) {
        return error?.response;
    }
}

export const userLogin = async (data) => {
    try {
        const response = await AxiosUser.post("/login", data)
        return response
    } catch (error) {
        return error?.response;
    }
}