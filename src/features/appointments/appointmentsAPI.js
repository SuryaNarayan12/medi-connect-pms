import api from "../../api/api";

export const fetchAppointments = async () => (await api.get("/appointments")).data;
export const fetchAppointmentsByDoctor = async (id) => (await api.get(`/appointments/doctor/${id}`)).data;
export const fetchAppointmentsByPatient = async (id) => (await api.get(`/appointments/patient/${id}`)).data;
export const createAppointment = async (data) => (await api.post("/appointments", data)).data;
export const updateAppointment = async (id, data) => (await api.put(`/appointments/${id}`, data)).data;
export const deleteAppointment = async (id) => (await api.delete(`/appointments/${id}`)).data;
