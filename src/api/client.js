const axios = require('axios');

class Client {
  static post(url, payload, options) {
    return axios.post(url, payload, options);
  }

  static get(url, options) {
    return axios.get(url, options);
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
}
export default Client;
