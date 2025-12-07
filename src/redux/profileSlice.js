// src/redux/slices/profileSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getCurrentUserWithProfile,
  getMyTickets,
  updateProfile,
} from "../backend/profile/profile";

export const fetchProfile = createAsyncThunk(
  "profile/fetchProfile",
  async () => {
    const res = await getCurrentUserWithProfile();
    return res;
  }
);

export const fetchMyTickets = createAsyncThunk(
  "profile/fetchMyTickets",
  async () => {
    const res = await getMyTickets();
    return res;
  }
);

export const saveProfile = createAsyncThunk(
  "profile/saveProfile",
  async (payload) => {
    await updateProfile(payload); // { username }
    const res = await getCurrentUserWithProfile();
    return res;
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    user: null,
    profile: null,
    tickets: [],
    loading: false,
    error: null,
    saving: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchProfile
      .addCase(fetchProfile.pending, (s) => {
        s.loading = true;
        s.error = null;
      })
      .addCase(fetchProfile.fulfilled, (s, a) => {
        s.loading = false;
        s.user = a.payload.user;
        s.profile = a.payload.profile;
      })
      .addCase(fetchProfile.rejected, (s, a) => {
        s.loading = false;
        s.error = a.error.message;
      })
      // fetchMyTickets
      .addCase(fetchMyTickets.pending, (s) => {
        s.loading = true;
        s.error = null;
      })
      .addCase(fetchMyTickets.fulfilled, (s, a) => {
        s.loading = false;
        s.tickets = a.payload || [];
      })
      .addCase(fetchMyTickets.rejected, (s, a) => {
        s.loading = false;
        s.error = a.error.message;
      })
      // saveProfile
      .addCase(saveProfile.pending, (s) => {
        s.saving = true;
        s.error = null;
      })
      .addCase(saveProfile.fulfilled, (s, a) => {
        s.saving = false;
        s.user = a.payload.user;
        s.profile = a.payload.profile;
      })
      .addCase(saveProfile.rejected, (s, a) => {
        s.saving = false;
        s.error = a.error.message;
      });
  },
});

export default profileSlice.reducer;
