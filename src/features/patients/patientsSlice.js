import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchPatientsAPI, fetchPatientProfileAPI } from "./patientsAPI";

export const fetchPatients = createAsyncThunk("patients/fetchAll", async () => {
  return await fetchPatientsAPI();
});


export const fetchPatientProfileThunk = createAsyncThunk(
  "patients/fetchProfile",
  async (id) => {
    return await fetchPatientProfileAPI(id);
  }
);

const patientsSlice = createSlice({
  name: "patients",
  initialState: {
    list: [],
    profile: null,
    loading: false,
    error: null,
  },
  reducers: {
    addPatient: (state, action) => {
      state.list.push(action.payload);
    },
    updatePatient: (state, action) => {
      const index = state.list.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = action.payload;
      }
    },
    deletePatient: (state, action) => {
      state.list = state.list.filter((p) => p.id !== action.payload);
    },
    toggleStatus: (state, action) => {
      const patient = state.list.find((p) => p.id === action.payload);
      if (patient) {
        patient.status = patient.status === "Active" ? "Inactive" : "Active";
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPatients.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPatients.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchPatients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchPatientProfileThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPatientProfileThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchPatientProfileThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { addPatient, updatePatient, deletePatient, toggleStatus } =
  patientsSlice.actions;

export default patientsSlice.reducer;
