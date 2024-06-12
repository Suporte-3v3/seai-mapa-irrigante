import http from "./config.js";
export class UserRest {
  async login(data) {
    const result = await http.post(`v1/user/sign-in`, data);
    return result.data;
  }
}
