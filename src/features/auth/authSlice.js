// src/features/auth/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunks for login & register
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, thunkAPI) => {
    try {
      // Fake API call (replace with real API)
      const response = await new Promise((resolve) =>
        setTimeout(() => {
          if (
            credentials.email === "test@example.com" &&
            credentials.password === "password123"
          ) {
            resolve({
              id: 1,
              email: credentials.email,
              name: "Test User",
            });
          } else {
            throw new Error("Invalid email or password");
          }
        }, 1000)
      );
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, thunkAPI) => {
    try {
      // Fake API call (replace with backend call)
      const response = await new Promise((resolve) =>
        setTimeout(() => {
          resolve({
            id: Date.now(),
            ...userData,
          });
        }, 1000)
      );
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    // Login
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Register
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
