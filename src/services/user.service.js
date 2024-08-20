import http from "./config.js";
export class UserRest {
  async login(data) {
    const result = await http.post(`v1/user/sign-in`, data);
    return result.data;
  }
  async create(data) {
    const result = await http.post(`v1/user/irrigant`, data);
    return result.data;
  }
  async sendLink(data) {
    const result = await http.post(`v1/user/irrigant/forgot-password`, data);
    return result.data;
  }
  async savePassword(data, code) {
    const result = await http.post(`v1/user/irrigant/forgot-password/${code}`, data);
    return result.data;
  }
  async confirmRegister(code) {
    const result = await http.patch(`v1/user/irrigant/activate/${code}`);
    return result.data;
  }

}
