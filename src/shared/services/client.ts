import axiosInt from "src/utils/callApi";
import { API_ROUTES } from "../constants";

export class ClientService {
  constructor() {}

  static addClient(id: string) {
    return axiosInt.post(`${API_ROUTES.savedClient}?clientId=${id}`);
  }

  static deleteClient(id: string) {
    return axiosInt.delete(`${API_ROUTES.savedClient}/${id}`);
  }
}
