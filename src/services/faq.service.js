import http from "./config.js";

export class FAQRest {
  async getAll(params) {
    const result = await http.get(`v1/faq`, { params });
    return result.data;
  }
  async getById(id) {
    const result = await http.get(`v1/faq/${id}`);
    return result.data;
  }
  async getAllCategories() {
    const result = await http.get(`v1/faq/categories`);
    return result.data;
  }
}
