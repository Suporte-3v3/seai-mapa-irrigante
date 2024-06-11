import http from "./config.js";

export class NewsRest {
  async getAll(params) {
    const result = await http.get(`v1/news`, { params });
    return result.data;
  }
  async getById(id) {
    const result = await http.get(`v1/news/${id}`);
    return result.data;
  }
}