import Client from './client';
import ClientAuth from './clientAuth';

class API {
  constructor() {
    this.baseURL = 'http://127.0.0.1:/api/v1/';
  }

  buildURL(path) {
    return `${this.baseURL}${path}`;
  }

  async getToken(payload) {
    const res = await Client.post(this.buildURL('tokens/'), payload);
    if (res.data && res.data === 401) {
      return '';
    }
    return res.data.token;
  }

  async getProfile(id) {
    const res = await ClientAuth.get(this.buildURL('profiles/') + id);
    return res.data;
  }

  async getProfiles() {
    const res = await ClientAuth.get(this.buildURL('profiles/'));
    return res.data.items;
  }

  async updateProfile(payload) {
    return ClientAuth.patch(this.buildURL('profiles/') + payload.id, payload);
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

  async getResearches() {
    const res = await ClientAuth.get(this.buildURL('researches/'));
    return res.data;
  }

  async getResearch(id) {
    const res = await ClientAuth.get(this.buildURL('researches/') + id);
    return res.data;
  }
}
export default API;
