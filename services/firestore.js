import { db } from "./firebase";
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";

// Récupérer les tâches d'un utilisateur spécifique
export async function fetchTodosFromFirestore(uid) {
  const querySnapshot = await getDocs(collection(db, "users", uid, "todos"));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

// Ajouter une tâche pour un utilisateur spécifique
export async function addTodoToFirestore(uid, title) {
  await addDoc(collection(db, "users", uid, "todos"), {
    title: title,
    completed: false,
    createdAt: Date.now(),
  });
}