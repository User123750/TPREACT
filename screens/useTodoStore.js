import { create } from "zustand";

export const useTodoStore = create((set) => ({
  // 1. État initial (Liste de tâches)
  todos: [
    { id: 1, text: "Apprendre React Native", completed: false },
    { id: 2, text: "Corriger le bug", completed: true }
  ],

  // 2. Actions (Fonctions)
  
  // Ajoute une tâche
  addTodo: (text) => set((state) => ({ 
    todos: [...state.todos, { id: Date.now(), text, completed: false }] 
  })),

  // Supprime une tâche (Action utilisée par TodoListScreen)
  deleteTodo: (id) => set((state) => ({
    todos: state.todos.filter((t) => t.id !== id)
  })),

  // Supprime une tâche (Action utilisée par TodoDetailsScreen - Alias)
  removeTodo: (id) => set((state) => ({
    todos: state.todos.filter((t) => t.id !== id)
  })),

  // Change l'état terminé/non terminé
  toggleTodo: (id) => set((state) => ({
    todos: state.todos.map((t) => 
      t.id === id ? { ...t, completed: !t.completed } : t
    )
  })),

  // C'EST CETTE FONCTION QUI TE MANQUAIT :
  loadTodos: () => set((state) => ({ 
    // Ici on pourrait charger depuis une API ou le stockage, 
    // pour l'instant on ne fait rien, mais la fonction existe !
    todos: state.todos 
  })),
}));