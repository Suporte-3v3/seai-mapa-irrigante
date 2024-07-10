import http from "./config.js";

export class SettingsRest {
  async getUserEquipments() {
    const result = await http.get(`v2/management/user/settings/equipments`);
    return result.data;
  }
  async getUserNotifications(id) {
    const result = await http.get(`v2/management/user/settings/notifications`);
    return result.data;
  }
  async createUserEquipments(data){
    const result = await http.post(
      `/v2/management/user/settings/equipments`,
      data
    );
    return result.data;
  }
  async updateUserEquipments(data){
    const result = await http.patch(
      `/v2/management/user/settings/equipments`,
      data
    );
    return result.data;
  }
  async getNotifications() {
    const result = await http.get(`v2/management/user/settings/notifications`);
    return result.data;
  }
  async updateNotifications(id, data){
    const result = await http.patch(
      `/v2/management/user/settings/notifications/${id}`,
      data
    );
    return result.data;
  }
}
