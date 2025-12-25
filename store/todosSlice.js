import { createSlice } from "@reduxjs/toolkit"; // [cite: 18]

const todosSlice = createSlice({
  name: "todos", // [cite: 20]
  initialState: [], // [cite: 21]
  reducers: {
    // Action pour ajouter une tâche
    addTodo: (state, action) => {
      state.push(action.payload); // [cite: 24, 25]
    },
    // Action pour supprimer une tâche
    removeTodo: (state, action) => {
      return state.filter((t) => t.id !== action.payload); // [cite: 26, 27]
    }
  }
});

export const { addTodo, removeTodo } = todosSlice.actions; // [cite: 30]
export default todosSlice.reducer; // [cite: 30]