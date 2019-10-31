const axios = require('axios');

class Client {
    static post(url ,  payload, options) {
        return axios.post(url, payload, options);
    }

    static get(url, options) {
        return axios.get(url, options);
    }

    static getWithAuth(url, options) {
        return axios.get(url, {
            headers: {
                "Authorization": `Bearer ${options.token}`
            }
        });
    }
}
module.exports = Client;
