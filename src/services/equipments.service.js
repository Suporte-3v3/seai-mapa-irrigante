import http from "./config.js";

export class EquipmentsRest {
  async getAll(params) {
    const result = await http.get(`v1/faq`, { params });
    return result.data;
  }
  async getAllEquipmentsActivated(type) {
    const result = await http.get(`v1/equipments/activated`, {
      params: { type },
    });
    return result.data;
  }
}
