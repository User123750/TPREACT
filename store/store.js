import { configureStore } from "@reduxjs/toolkit"; // [cite: 10]
import todosReducer from "./todosSlice"; // [cite: 11]

export const store = configureStore({
  reducer: {
    todos: todosReducer, // [cite: 13, 14, 15]
  },
});