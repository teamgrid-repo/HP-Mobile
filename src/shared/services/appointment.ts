import axiosInt from "src/utils/callApi";
import { API_ROUTES } from "../constants";
import { IBookAppointmentRequest, IUpdateAppointmentRequest } from "../models";

export class AppointmentService {
  constructor() {}

  static bookAppointment(data: IBookAppointmentRequest) {
    return axiosInt.post(`${API_ROUTES.appointment}`, data);
  }

  static updateAppointmentStatus(id: string, data: IUpdateAppointmentRequest) {
    return axiosInt.put(`${API_ROUTES.appointment}/${id}`, data);
  }
}
