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

  async uploadFile(file, fileMeta) {
    const chunkSize = 4096;
    const hash = Math.random().toString(16).slice(2);
    const chunks = Math.ceil(file.size / chunkSize);
    const self = this;

    for (let i = 0; i < chunks; i++) {
      const from = i * chunkSize;
      const to = Math.min(from + chunkSize, file.size);
      const blob = file.slice(from, to);

      await uploadChunk(blob, {
        filename: file.name,
        hash,
        index: i,
        size: file.size,
        total: chunks,
      });
    }

    const res = await ClientAuth.post(this.buildURL(`chunks/spectrum/${hash}`), fileMeta);

    return res.data;

    async function uploadChunk(chunk, payload) {
      const form = new FormData();

      Object.keys(payload).forEach((key) => {
        form.append(key, payload[key]);
      });

      form.append('chunk', chunk);

      await ClientAuth.post(self.buildURL('chunks'), form);
    }
  }

  async getFileContent(fileID) {
    const query = toQueryString({limit: 1e+4});
    const res = await ClientAuth.get(this.buildURL(`files/${fileID}?${query}`));
    return res.data;
  }

  async createExperiment(payload) {
    const res = await ClientAuth.post(this.buildURL(`experiments`), payload);
    return res.data;
  }

  async getExperiments(researchIDs) {
    const query = toQueryString({
      researchID: researchIDs.join(','),
    });

    const res = await ClientAuth.get(this.buildURL(`experiments?${query}`));
    return res.data;
  }

  async getExperiment(id) {
    const res = await ClientAuth.get(this.buildURL(`experiments/${id}`));
    return res.data;
  }

  async editExperiment(id, payload) {
    const res = await ClientAuth.patch(this.buildURL(`experiments/${id}`), payload);
    return res.data;
  }
}
export default API;
