import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import weatherReducer from "./weatherSlice";
import cryptoReducer from "./cryptoSlice";
import newsReducer from "./newsSlice";
import websocketReducer from "./webSocketSlice";

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
    crypto: cryptoReducer,
    news: newsReducer,
    websocket: websocketReducer,
  },
});

const makeStore = () => store;

export const wrapper = createWrapper(makeStore);
export default store;