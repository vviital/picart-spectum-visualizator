const axios = require('axios');

const ls = window.localStorage;

class ClientAuth {
  static get(url, options = {}) {
    return axios({
      method: 'get',
      url,
      headers: ClientAuth.createHeaders(),
    });
  }

  static put(url, payload, options = {}) {
    return axios({
      method: 'put',
      url,
      headers: ClientAuth.createHeaders(),
      data: payload,
    });
  }

  static patch(url, payload, options = {}) {
    return axios({
      method: 'patch',
      url,
      headers: ClientAuth.createHeaders(),
      data: payload,
    });
  }

  static delete(url, options) {
    return axios.delete(url, options);
  }

  static createHeaders(options = {}) {
    const token = ls.getItem('token');
    const headers = {};
    headers.Authorization = `Bearer ${token}`;
    return headers;
  }
}
export default ClientAuth;
