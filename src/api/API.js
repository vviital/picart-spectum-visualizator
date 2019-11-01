import Client from './client';

const ls = window.localStorage;

class API {
    constructor() {
        this.baseURL = 'http://127.0.0.1:3000/';
    }

    buildURL(path) {
        return `${this.baseURL}${path}`;
    }

    async getToken(payload) {
        const res = await Client.post(this.buildURL('tokens'), payload);
        if (res.data && res.data === 401)
        {
            return '';
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
