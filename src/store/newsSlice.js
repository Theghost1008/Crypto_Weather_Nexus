import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchNewsData,fetchNewsWithSearch } from "@/utils/fetchNews";

export const fetchNews = createAsyncThunk("news/fetchNews", async () => {
  return await fetchNewsData();
});

export const fetchNewsQuery = createAsyncThunk("news/fetchNewsQuery",async(query,{rejectWithValue})=>{
  try{
    return await fetchNewsWithSearch(query);
  }
  catch(error){
    return rejectWithValue(error.message);
  }
});

const newsSlice = createSlice({
  name: "news",
  initialState: { defaultData: [],searchData:[], loading: false, error: null,searchQuery:'crypto' },
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    clearSearchResults: (state) => {
      state.searchData = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => { state.loading = true; })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchNews.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch news data";
      }).addCase(fetchNewsQuery.pending, (state) => { 
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNewsQuery.fulfilled, (state, action) => {
        state.loading = false;
        state.searchData = action.payload;
      })
      .addCase(fetchNewsQuery.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const { setSearchQuery, clearSearchResults } = newsSlice.actions;
export default newsSlice.reducer;
