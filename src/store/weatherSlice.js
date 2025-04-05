import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchWeatherData } from "@/utils/fetchWeather";

export const fetchWeather = createAsyncThunk(
  "weather/fetchWeather",
  async (city, { rejectWithValue }) => {
    try {
      const data = await fetchWeatherData(city);
      return { city, data };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchDetailedWeather = createAsyncThunk(
  "weather/fetchDetailedWeather",
  async (city, { rejectWithValue }) => {
    try {
      return await fetchWeatherData(city,{rejectWithValue})
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const weatherSlice = createSlice({
  name: "weather",
  initialState: { 
    data: [], 
    detailedData: [],
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
      .addCase(fetchDetailedWeather.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.loading = false;
        const { city, data } = action.payload;
        const cityIndex = state.data.findIndex(item => item.city === city);
        
        if (cityIndex >= 0) {
          state.data[cityIndex] = { city, data };
        } else {
          state.data.push({ city, data });
        } 
      })
      .addCase(fetchDetailedWeather.fulfilled, (state, action) => {
        state.loading = false;
        state.detailedData = action.payload;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchDetailedWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default weatherSlice.reducer;