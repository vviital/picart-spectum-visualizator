import Client from './client';

const ls = window.localStorage;

class API {
    async getToken(payload) {
        const res = await Client.post('http://127.0.0.1:3000/tokens', payload);
        if (res.data && res.data === 401)
        {
            return undefined;
        }
        return res.data.token;
    }

    async getProfile(id) {
        const token = ls.getItem('token');
        const res = await Client.getWithAuth(`http://127.0.0.1:3000/profiles/${id}`, {token: token});
        return res.data;
    }

    async getProfiles() {
        const token = ls.getItem('token');
        const res = await Client.getWithAuth('http://127.0.0.1:3000/profiles/', {token: token});
        return res.data.items;
    }
}
export default API;
