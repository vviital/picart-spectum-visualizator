const axios = require('axios');

const ls = window.localStorage;

class ClientAuth {

    static get(url, options = {}) {
        options = ClientAuth.createHeader();
        const headers = Object.assign({}, options);
        return axios.get(url, { ...options, headers });
    }

    static put(url, options) {
        return axios.put(url, options);
    }

    static patch(url, options) {
        return axios.patch(url, options);
    }

    static delete(url, options) {
        return axios.delete(url, options);
    }

    static createHeader() {
        const token = ls.getItem('token');
        return {
            Authorization: `Bearer ${token}`
        }
    }
}
export default ClientAuth;