// src/features/doctors/doctorSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  doctors: [],
};

const doctorSlice = createSlice({
  name: "doctors",
  initialState,
  reducers: {
    addDoctor: (state, action) => {
      state.doctors.push({ ...action.payload, id: Date.now() });
    },
    deleteDoctor: (state, action) => {
      state.doctors = state.doctors.filter((doc) => doc.id !== action.payload);
    },
    updateDoctor: (state, action) => {
      const { id, updates } = action.payload;
      const index = state.doctors.findIndex((doc) => doc.id === id);
      if (index !== -1) {
        state.doctors[index] = { ...state.doctors[index], ...updates };
      }
    },
  },
});

export const { addDoctor, deleteDoctor, updateDoctor } = doctorSlice.actions;
export default doctorSlice.reducer;
