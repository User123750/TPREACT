import { create } from "zustand";

export const useTodoStore = create((set) => ({
  // État initial
  todos: [],
  
  // Action d'ajout
  addTodo: (todo) => set((state) => ({ 
    todos: [...state.todos, todo] 
  })),

  removeTodo: (id) => set((state) => ({
    todos: state.todos.filter((t) => t.id !== id)
  })),
}));