import api from "../../api/api";

export const fetchDoctors = async () => (await api.get("/doctors")).data;
export const fetchDoctorById = async (id) => (await api.get(`/doctors/${id}`)).data;
export const createDoctor = async (data) => (await api.post("/doctors", data)).data;
export const updateDoctor = async (id, data) => (await api.put(`/doctors/${id}`, data)).data;
export const deleteDoctor = async (id) => (await api.delete(`/doctors/${id}`)).data;
