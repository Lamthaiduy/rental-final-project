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

export async function getProfile(token) {
    return await apisBase.get('/users/profile', {headers: {
        "Authorization": `Bearer ${token}`
    }})
}
export async function updateProfile(token, body) {
    return await apisBase.put('/users/profile', {...body}, {headers: {
        "Authorization": `Bearer ${token}`
    }})
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

export async function getAllPosts(token, page = 1, categories = [], search = "") {
    return await apisBase.get(`/posts?page=${page}&categories=${categories}&search=${search}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
}

export async function getAllOwnPosts(token, page = 1) {
    return await apisBase.get(`/posts/owner/list?page=${page}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
}
export async function getAllWaitingPosts(token, page = 1) {
    return await apisBase.get(`/posts/waiting/list?page=${page}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
}

export async function getDetailPost(token, id) {
    return await apisBase.get(`/posts/${id}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
}

export async function createPost(token, body) {
    return await apisBase.post(`/posts/`,body, {headers: {
        "Authorization": `Bearer ${token}`
    }})
}

export async function updatePost(token, id, body) {
    return await apisBase.put(`/posts/${id}`,body, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
}
export async function markAsRented(token, id, ) {
    return await apisBase.get(`/posts/rented/${id}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
}

export async function handleUpdatePostRequest(token, id, status) {
    return await apisBase.put(`/posts/process/${id}`,{status: status}, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
}


export async function getAllDeposit(token, page=1) {
    return await apisBase.get(`/deposits/?page=${page}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
}

export async function getPersonalDeposit(token, page=1) {
    return await apisBase.get(`/deposits/list/personal?page=${page}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
}



export async function updateDepositStatus(token, id, status) {
    return await apisBase.put(`/deposits/status/${id}`,{status}, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
}



export async function handlePayment(token, body) {
    return await apisBase.post(`/deposits/create-url/`,body, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
}

export async function handleDepositSuccess (token, body) {
    return await apisBase.post(`/deposits/create-deposit/`,body, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
}

export async function searchExistedDeposit(token, body) {
    return await apisBase.post(`/deposits/search/`,body, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
}

export async function getAllSellerPayment(token, ) {
    return await apisBase.get(`/payment/`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
}

export async function handlePaidForSeller(token, body) {
    return await apisBase.post("/payment/", {...body}, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
}

export async function getUserNotifications(token) {
    return await apisBase.get(`/notifications`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
}

export async function markNotificationAdRead(token, id) {
    return await apisBase.get(`/notifications/${id}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
}
export async function getConversations(token) {
    return await apisBase.get(`/messages/`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
}
export async function getConversationsByID(token, id) {
    return await apisBase.get(`/messages/${id}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
}
