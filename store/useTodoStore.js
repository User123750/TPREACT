import { create } from "zustand";
import { db } from "../services/database"; // Ton fichier SQLite du TP 7
import { fetchTodosFromFirestore, addTodoToFirestore } from "../services/firestore";

export const useTodoStore = create((set, get) => ({
  todos: [],
  
  // Synchronisation : Firestore -> SQLite -> State
  loadTodos: async (uid) => {
    try {
      // 1. Récupérer les données depuis Firestore (Cloud)
      const remoteTodos = await fetchTodosFromFirestore(uid);

      // 2. Mettre à jour SQLite (Local)
      // On vide la table locale pour éviter les doublons lors de la synchro
      db.runSync("DELETE FROM todos"); 
      
      // On réinsère tout ce qui vient du Cloud
      remoteTodos.forEach(t => {
        // On vérifie que le titre existe pour éviter les erreurs
        if (t.title) {
            db.runSync("INSERT INTO todos (title) VALUES (?)", [t.title]);
        }
      });

      // 3. Charger SQLite vers l'état de l'application (Zustand)
      const localTodos = db.getAllSync("SELECT * FROM todos");
      set({ todos: localTodos });
      
    } catch (e) {
      console.error("Erreur Sync:", e);
    }
  },

  addTodo: async (uid, title) => {
    try {
        // Ajout Optimiste : On ajoute dans SQLite immédiatement pour l'utilisateur
        db.runSync("INSERT INTO todos (title) VALUES (?)", [title]);
        
        // Puis on envoie à Firestore en arrière-plan
        await addTodoToFirestore(uid, title);
        
        // Enfin, on rafraîchit la liste complète
        get().loadTodos(uid);
    } catch (e) {
        console.error("Erreur lors de l'ajout:", e);
    }
  }
}));