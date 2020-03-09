import Client from './client';
import ClientAuth from './clientAuth';

const toQueryString = (params) => {
  return Object.keys(params).map((key) => {
      return encodeURIComponent(key) + '=' + encodeURIComponent(params[key])
  }).join('&');
}

class API {
  constructor() {
    this.baseURL = '/api/v1';
  }

  buildURL(path) {
    return `${this.baseURL}/${path}`;
  }

  async getToken(payload) {
    const res = await Client.post(this.buildURL('tokens'), payload);
    if (res.data && res.data === 401) {
      return '';
    }
    return res.data.token;
  }

  async getProfile(id) {
    const res = await ClientAuth.get(this.buildURL(`profiles/${id}`));
    return res.data;
  }

  async getProfiles(options = {}) {
    const query = toQueryString(options);
    const res = await ClientAuth.get(this.buildURL(`profiles?${query}`));
    return res.data;
  }

  async updateProfile(payload) {
    return ClientAuth.patch(this.buildURL(`profiles/${payload.id}`), payload);
  }

  async updateEmail(payload) {
    const { id, password, email } = payload;
    const options = {
      confirmationPassword: password,
      email,
    };
    return ClientAuth.put(this.buildURL(`profiles/${id}/email`), options);
  }

  async updatePassword(payload) {
    const { id, password, newPassword } = payload;
    const options = {
      confirmationPassword: password,
      password: newPassword,
    };
    return ClientAuth.put(this.buildURL(`profiles/${id}/password`), options);
  }

  async getResearches(options = {}) {
    const query = toQueryString(options);
    const res = await ClientAuth.get(this.buildURL(`researches?${query}`));
    return res.data;
  }

  async getResearch(id) {
    const res = await ClientAuth.get(this.buildURL(`researches/${id}`));
    return res.data;
  }

  async createResearch(payload = {}) {
    const res = await ClientAuth.post(this.buildURL('researches'), payload);
    return res.data;
  }

  async deleteResearch(id) {
    await ClientAuth.delete(this.buildURL(`researches/${id}`));
  }

  async editResearch(id, payload) {
    const res = await ClientAuth.patch(this.buildURL(`researches/${id}`), payload);
    return res.data;
  }
}
export default API;
