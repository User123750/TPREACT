import React, { useEffect, useState, useContext } from "react";
import { View, Text, FlatList, Button, TextInput, StyleSheet } from "react-native";
import { loadTodos, addTodoOffline, updateTodoOffline, deleteTodoOffline } from "../services/database";
import { ThemeContext } from "../context/ThemeContext";

export default function TodoListOfflineScreen() {
    const [todos, setTodos] = useState([]);
    const [title, setTitle] = useState("");
    const [editingId, setEditingId] = useState(null);
    const { theme, toggleTheme } = useContext(ThemeContext);

    const refreshTodos = () => {
        const data = loadTodos();
        setTodos(data);
    };

    // Chargement initial
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

    // Pour l'exercice supplémentaire
    const handleDelete = (id) => {
        deleteTodoOffline(id);
        refreshTodos();
    };

    const handleEdit = (item) => {
        setTitle(item.title);
        setEditingId(item.id);
    };

    // Styles dynamiques selon le thème
    const textColor = theme === "dark" ? "#fff" : "#000";
    const containerStyle = theme === "dark" ? styles.darkContainer : styles.lightContainer;

    return (
        <View style={[styles.container, containerStyle]}>
            <Button title={`Mode: ${theme}`} onPress={toggleTheme} />
            
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Tâche offline"
                    placeholderTextColor={theme === "dark" ? "#ccc" : "#666"}
                    value={title}
                    onChangeText={setTitle}
                    style={[styles.input, { color: textColor, borderColor: textColor }]}
                />
                <Button 
                    title={editingId ? "Mettre à jour" : "Ajouter"} 
                    onPress={handleAddOrUpdate} 
                />
            </View>

            {todos.length === 0 && (
                <Text style={{ color: textColor, textAlign: "center", marginTop: 20 }}>
                    Aucune tâche hors ligne
                </Text>
            )}

            <FlatList
                data={todos}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <Text style={{ color: textColor, flex: 1 }}>{item.title}</Text>
                        <View style={styles.buttons}>
                            <Button title="Modif" onPress={() => handleEdit(item)} />
                            <Button title="Suppr" color="red" onPress={() => handleDelete(item.id)} />
                        </View>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    lightContainer: { backgroundColor: "#ffffff" },
    darkContainer: { backgroundColor: "#121212" },
    inputContainer: { marginBottom: 20 },
    input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5 },
    itemContainer: { flexDirection: "row", alignItems: "center", paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: "#ccc" },
    buttons: { flexDirection: "row", gap: 10 }
});