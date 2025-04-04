import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCryptoData,fetchCryptoDetails,fetchCryptoHistory } from "@/utils/fetchCrypto";


export const fetchCrypto = createAsyncThunk("crypto/fetchCrypto", async () => {
  return await fetchCryptoData();
});
export const fetchCryptoDetail = createAsyncThunk(
  "crypto/fetchDetail",
  async (id) => {
    return await fetchCryptoDetails(id);
  }
);

export const fetchCryptoHistorical = createAsyncThunk(
  "crypto/fetchHistory",
  async ({ id, interval }) => {
    return await fetchCryptoHistory(id, interval);
  }
);

const cryptoSlice = createSlice({
  name: "crypto",
  initialState: { data: [],details:null, history:[],loading: false, error: null },
  reducers: {
    clearDetails: (state) => {
      state.details = null;
      state.history = [];
    }
  },
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
      })
      .addCase(fetchCryptoDetail.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCryptoDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.details = action.payload;
      })
      .addCase(fetchCryptoDetail.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch crypto details";
      })
      .addCase(fetchCryptoHistorical.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCryptoHistorical.fulfilled, (state, action) => {
        state.loading = false;
        state.history = action.payload;
      })
      .addCase(fetchCryptoHistorical.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch crypto history";
      });
  },
});

export const {clearDetails} = cryptoSlice.actions;
export default cryptoSlice.reducer;