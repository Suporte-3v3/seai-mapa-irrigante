import http from "./config.js";

export class SlideRest {
  async getAll() {
    const result = await http.get(`/v2/management/user/irrigation_crops`);
    return result.data;
  }
  async getAllCulture() {
    const result = await http.get(`/v2/management/crops`);
    return result.data;
  }
  async create(data) {
    const result = await http.post(
      `/v2/management/user/irrigation_crops`,
      data
    );
    return result.data;
  }
  async update(id, data) {
    const result = await http.patch(
      `/v2/management/user/irrigation_crops/${id}`,
      data
    );
    return result.data;
  }
  async deleteById(id) {
    const result = await http.delete(
      `/v2/management/user/irrigation_crops/${id}`
    );
    return result.data;
  }
}
