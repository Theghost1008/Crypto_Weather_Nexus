import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const url = process.env.NEXT_PUBLIC_COIN_CAP_BASE_URL;
const api_key = process.env.NEXT_PUBLIC_COIN_CAP_API_KEY;

export const fetchCrypto = createAsyncThunk("crypto/fetchCrypto", async () => {
  const response = await axios.get(`${url}/assets?apiKey=${api_key}`);
  return response.data.data.slice(0, 3);
});

const cryptoSlice = createSlice({
  name: "crypto",
  initialState: { data: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCrypto.pending, (state) => { state.loading = true; })
      .addCase(fetchCrypto.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchCrypto.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch crypto data";
      });
  },
});

export default cryptoSlice.reducer;
