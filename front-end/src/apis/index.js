import axios from 'axios';

const apisBase = axios.create({
    validateStatus: function (status) {
        return status <= 500;
    },
    baseURL: 'http://localhost:8080/api',
});

export async function loginApi(data) {
    return await apisBase.post('/login', data);
} 

export async function register(data) {
    return await apisBase.post('/register', data);
}

export async function getAllUserInRole(token, role, page = 1) {
    return await apisBase.get(`/users/?role=${role}&page=${page}`, {headers: {
        "Authorization": `Bearer ${token}`
    }})
}