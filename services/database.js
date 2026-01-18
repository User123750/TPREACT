import * as SQLite from "expo-sqlite";

// Ouvre la DB de manière synchrone
const db = SQLite.openDatabaseSync("todos.db");

export const initDB = () => {
    db.execSync(`
        CREATE TABLE IF NOT EXISTS todos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL
        );
    `);
};

export const addTodoOffline = (title) => {
    db.runSync("INSERT INTO todos (title) VALUES (?)", [title]);
};

export const updateTodoOffline = (id, title) => {
    db.runSync("UPDATE todos SET title = ? WHERE id = ?", [title, id]);
};

// Exercice supplémentaire : Supprimer une tâche
export const deleteTodoOffline = (id) => {
    db.runSync("DELETE FROM todos WHERE id = ?", [id]);
};

export const loadTodos = () => {
    return db.getAllSync("SELECT * FROM todos");
};