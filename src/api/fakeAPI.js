import ClientAuth from './clientAuth';

class fakeAPI {
  constructor() {
    this.baseURL = 'http://127.0.0.1:3002/';
  }

  buildURL(path) {
    return `${this.baseURL}${path}`;
  }

  async getResearches() {
    const res = await ClientAuth.get(this.buildURL('researches/'));
    return res.data;
  }
}
export default fakeAPI;
