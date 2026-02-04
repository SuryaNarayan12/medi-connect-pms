import { createSlice } from "@reduxjs/toolkit";

const appointmentSlice = createSlice({
  name: "appointments",
  initialState: [],
  reducers: {
    addAppointment: (state, action) => {
      state.push({
        id: state.length + 1,
        status: "Pending",
        ...action.payload,
      });
    },
    updateAppointmentStatus: (state, action) => {
      const { id, status } = action.payload;
      const appointment = state.find((appt) => appt.id === id);
      if (appointment) {
        appointment.status = status;
      }
    },
  },
});

export const { addAppointment, updateAppointmentStatus } =
  appointmentSlice.actions;

export default appointmentSlice.reducer;
