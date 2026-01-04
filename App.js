import React, { useEffect, useState, useContext } from "react";
import { View, StyleSheet, ActivityIndicator, SafeAreaView } from "react-native";
import { initDB } from "./services/database";
import { ThemeProvider, ThemeContext } from "./context/ThemeContext";
import TodoListOfflineScreen from "./screens/TodoListOfflineScreen";

function MainApp() {
  const { theme } = useContext(ThemeContext);
  
  return (
    <SafeAreaView style={[styles.container, theme === "dark" ? styles.dark : styles.light]}>
      <TodoListOfflineScreen />
    </SafeAreaView>
  );
}

export default function App() {
  const [dbReady, setDbReady] = useState(false);

  useEffect(() => {
    const prepareDb = async () => {
      try {
        await initDB(); // Initialisation SQLite
        setDbReady(true);
      } catch (e) {
        console.warn(e);
      }
    };
    prepareDb();
  }, []);

  if (!dbReady) {
    return <ActivityIndicator size="large" style={{flex:1}} />;
  }

  return (
    <ThemeProvider>
      <MainApp />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
  },
  light: { backgroundColor: "#ffffff" },
  dark: { backgroundColor: "#121212" },
});