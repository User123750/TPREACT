import React, { useEffect, useState, useContext } from "react";
import { View, Text, FlatList, Button, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { loadTodos, addTodoOffline, updateTodoOffline, deleteTodoOffline } from "../services/database";
import { ThemeContext } from "../context/ThemeContext";

export default function TodoListOfflineScreen() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [editingId, setEditingId] = useState(null);
  const { theme, toggleTheme } = useContext(ThemeContext);

  // Fonction pour rafraîchir la liste depuis la DB
  const refreshTodos = () => {
    const data = loadTodos();
    setTodos(data);
  };

  useEffect(() => {
    refreshTodos();
  }, []);

  const handleAddOrUpdate = () => {
    if (!title.trim()) return;

    if (editingId) {
      updateTodoOffline(editingId, title);
      setEditingId(null);
    } else {
      addTodoOffline(title);
    }
    setTitle("");
    refreshTodos();
  };

  // EXERCICE SUPPLÉMENTAIRE : Suppression
  const handleDelete = (id) => {
    deleteTodoOffline(id);
    refreshTodos();
  };

  // Styles dynamiques selon le thème
  const containerStyle = theme === "light" ? styles.lightContainer : styles.darkContainer;
  const textStyle = theme === "light" ? styles.lightText : styles.darkText;

  return (
    <View style={[styles.container, containerStyle]}>
      <Button 
        title={`Mode: ${theme === "light" ? "Dark" : "Light"}`} 
        onPress={toggleTheme} 
      />

      {/* Formulaire */}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Nouvelle tâche..."
          placeholderTextColor={theme === "dark" ? "#ccc" : "#888"}
          value={title}
          onChangeText={setTitle}
          style={[styles.input, textStyle, { borderColor: textStyle.color }]}
        />
        <Button 
          title={editingId ? "Mettre à jour" : "Ajouter"} 
          onPress={handleAddOrUpdate} 
        />
      </View>

      {/* Liste */}
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={<Text style={[textStyle, {textAlign:'center'}]}>Aucune tâche hors ligne</Text>}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={[styles.itemText, textStyle]}>{item.title}</Text>
            
            <View style={styles.actions}>
              <Button 
                title="Modifier" 
                color="orange"
                onPress={() => {
                  setTitle(item.title);
                  setEditingId(item.id);
                }} 
              />
              <View style={{width: 10}} />
              <Button 
                title="X" 
                color="red"
                onPress={() => handleDelete(item.id)} 
              />
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  inputContainer: { marginBottom: 20, marginTop: 10 },
  input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5 },
  itemContainer: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 15, padding: 10, borderWidth: 1, borderColor: '#ccc', borderRadius: 5 },
  itemText: { flex: 1, marginRight: 10 },
  actions: { flexDirection: 'row' },
  
  // Thèmes
  lightContainer: { backgroundColor: "#ffffff" },
  darkContainer: { backgroundColor: "#121212" },
  lightText: { color: "#000000" },
  darkText: { color: "#ffffff" },
});