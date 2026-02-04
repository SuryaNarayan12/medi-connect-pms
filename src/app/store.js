// src/store/store.js
import { configureStore } from '@reduxjs/toolkit'
import appointmentsReducer from '../features/appointments/appointmentSlice'
import authReducer from "../features/auth/authSlice";
import doctorReducer from "../features/doctors/doctorSlice";
import patientsReducer from "../features/patients/patientsSlice";

export const store = configureStore({
  reducer: {
    appointments: appointmentsReducer,
    auth:authReducer,
    doctors: doctorReducer,
     patients: patientsReducer,
  },
})

export default store
