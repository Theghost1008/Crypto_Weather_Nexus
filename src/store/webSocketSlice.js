import { createSlice } from "@reduxjs/toolkit";

const websocketSlice = createSlice({
  name: "websocket",
  initialState: { cryptoPrices: {} },
  reducers: {
    updateCrypto: (state, action) => {
      state.cryptoPrices = action.payload;
    },
  },
});

export const { updateCrypto } = websocketSlice.actions;
export default websocketSlice.reducer;
