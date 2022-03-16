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

export async function processUserRegister(token, userId, status) {
    return await apisBase.post(`/users/process/${userId}`, {status},{headers: {
        "Authorization": `Bearer ${token}`
    }})
}
export async function selectRole(token, role) {
    return await apisBase.post(`/users/select-role`, {role},{headers: {
        "Authorization": `Bearer ${token}`
    }})
}

export async function getAllCategories(token)  {
    return await apisBase.get('/categories', {headers: {
        "Authorization": `Bearer ${token}`
    }})
}
export async function getOneCategory(token, id)  {
    return await apisBase.get(`/categories/${id}`, {headers: {
        "Authorization": `Bearer ${token}`
    }})
}
export async function createCategory(token, body) {
    return await apisBase.post('/categories',body, {headers: {
        "Authorization": `Bearer ${token}`
    }})
}
export async function editCategory(token,id, body) {
    return await apisBase.put(`/categories/${id}`,body, {headers: {
        "Authorization": `Bearer ${token}`
    }})
}
export async function deleteCategory(token,id) {
    return await apisBase.delete(`/categories/${id}`, {headers: {
        "Authorization": `Bearer ${token}`
    }})
}


export async function createPost(token, body) {
    return await apisBase.post(`/posts/`,body, {headers: {
        "Authorization": `Bearer ${token}`
    }})
}