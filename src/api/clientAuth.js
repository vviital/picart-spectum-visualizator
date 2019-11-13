const axios = require('axios');

const ls = window.localStorage;

class ClientAuth {
  static get(url, options) {
    return axios({
      method: 'get',
      url,
      headers: ClientAuth.createAuthHeader(),
      data: options,
    });
  }

  static put(url, options) {
    return axios.put(url, options);
  }

  static patch(url, options) {
    return axios({
      method: 'patch',
      url,
      headers: ClientAuth.createAuthHeader(),
      data: options,
    });
  }

  static delete(url, options) {
    return axios.delete(url, options);
  }

  static createAuthHeader() {
    const token = ls.getItem('token');
    return {
      Authorization: `Bearer ${token}`,
    };
  }
}
export default ClientAuth;
