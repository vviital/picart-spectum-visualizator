const axios = require('axios');
const _ = require('lodash');

const ls = window.localStorage;

class ClientAuth {
  static get(url, options = {}) {
    return axios({
      method: 'get',
      url,
      headers: ClientAuth.createHeaders(),
    });
  }

  static put(url, options) {
    return axios.put(url, options);
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
    const headers = _.get(options, 'Headers');
    const token = ls.getItem('token');
    headers.Authorization = `Bearer ${token}`;
    return headers;
  }
}
export default ClientAuth;
