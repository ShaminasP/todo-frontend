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

export const toAddTask = async (data, token) => {
    try {
        console.log(data);
        const response = await AxiosUser.post("/todo/", data, {
            headers: { Authorization: `Bearer ${token}` }
        })
        return response
    } catch (error) {
        console.log(error);
        return error?.response;
    }
}

export const toGetTaskList = async (token) => {
    try {
        const response = await AxiosUser.get("/todo/", { headers: { Authorization: `Bearer ${token}` } })
        return response
    } catch (error) {
        console.log(error);
        return error?.response;
    }
}

export const toDeleteTask = async (token, id) => {
    try {
        const response = await AxiosUser.delete(`/todo/${id}`, { headers: { Authorization: `Bearer ${token}` } })
        return response;
    } catch (error) {
        return error?.response;
    }
}

export const toCompleteTask = async (token, id) => {
    try {
        const response = await AxiosUser.patch(`/todo`, { id }, { headers: { Authorization: `Bearer ${token}` } })
        return response;
    } catch (error) {

        return error?.response;
    }
}

export const toCancelTask = async (token, id) => {
    try {
        const response = await AxiosUser.patch('/todo/cancel', { id }, { headers: { Authorization: `Bearer ${token}` } })
        return response;
    } catch (error) {
        return error?.response;
    }
}

export const toGetReport = async (token) => {
    try {
        const response = await AxiosUser.get('/todo/reports', {
            headers: { Authorization: `Bearer ${token}` }
        })
        return response;
    } catch (error) {
        return error?.response;
    }
}


export const toGetCount = async (token) => {
    try {
        const response = await AxiosUser.get('/todo/counts', {
            headers: { Authorization: `Bearer ${token}` }
        })
        return response;
    } catch (error) {
        return error?.response;
    }
}