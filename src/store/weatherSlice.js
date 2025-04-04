import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchWeatherData } from "@/utils/fetchWeather";

export const fetchWeather = createAsyncThunk(
  "weather/fetchWeather",
  async (city, { rejectWithValue }) => {
    return await fetchWeatherData(city,{ rejectWithValue });
  }
);

const weatherSlice = createSlice({
  name: "weather",
  initialState: { 
    data: null, 
    loading: false, 
    error: null 
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload; 
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default weatherSlice.reducer;