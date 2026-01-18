import React, { useState, useEffect, useContext } from "react";
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, Modal } from "react-native";
import { useTodoStore } from "../store/useTodoStore"; // Assure-toi d'avoir créé ce fichier
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";

export default function HomeScreen() {
  const { user } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  const { todos, loadTodos, addTodo } = useTodoStore();
  
  const [modalVisible, setModalVisible] = useState(false);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    if (user) {
      loadTodos(user.uid);
    }
  }, [user]);

  const handleAdd = async () => {
    if (!newTodo.trim()) return;
    await addTodo(user.uid, newTodo);
    setNewTodo("");
    setModalVisible(false);
  };

  const styles = getStyles(theme);

  return (
    <View style={styles.container}>
      {/* Bouton d'ajout */}
      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.addButtonText}>+ Nouvelle Tâche</Text>
      </TouchableOpacity>

      {/* Liste des tâches */}
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardText}>{item.title}</Text>
          </View>
        )}
      />

      {/* Modal d'ajout */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Ajouter une tâche</Text>
            <TextInput
              placeholder="Titre..."
              placeholderTextColor="#999"
              value={newTodo}
              onChangeText={setNewTodo}
              style={styles.input}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={handleAdd} style={[styles.btn, { backgroundColor: "#2f80ed" }]}>
                <Text style={styles.btnText}>Ajouter</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={[styles.btn, { backgroundColor: "red" }]}>
                <Text style={styles.btnText}>Annuler</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const getStyles = (theme) => StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: theme === "dark" ? "#121212" : "#f5f5f5" },
  addButton: { backgroundColor: "#2f80ed", padding: 15, borderRadius: 10, marginBottom: 20 },
  addButtonText: { color: "white", textAlign: "center", fontWeight: "bold" },
  card: { backgroundColor: theme === "dark" ? "#1e1e1e" : "white", padding: 15, borderRadius: 8, marginBottom: 10, elevation: 2 },
  cardText: { color: theme === "dark" ? "white" : "black", fontSize: 16 },
  modalOverlay: { flex: 1, justifyContent: "center", backgroundColor: "rgba(0,0,0,0.5)", padding: 20 },
  modalContent: { backgroundColor: theme === "dark" ? "#1e1e1e" : "white", padding: 20, borderRadius: 10 },
  modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 15, color: theme === "dark" ? "white" : "black" },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 10, borderRadius: 5, marginBottom: 15, color: theme === "dark" ? "white" : "black" },
  modalButtons: { flexDirection: "row", justifyContent: "space-between" },
  btn: { flex: 1, padding: 10, borderRadius: 5, marginHorizontal: 5 },
  btnText: { color: "white", textAlign: "center", fontWeight: "bold" }
});