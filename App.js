import React, { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

// Contextes
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";

// Navigation principale
import AppStack from "./navigation/AppStack";

// Base de données
import { initDB } from "./services/database";

export default function App() {
  const [isReady, setIsReady] = useState(false);

  // Initialisation de la BDD locale (SQLite) au lancement
  useEffect(() => {
    const prepare = async () => {
      try {
        await initDB(); // Crée la table 'todos' si elle n'existe pas
      } catch (e) {
        console.warn("Erreur initialisation DB:", e);
      } finally {
        setIsReady(true);
      }
    };

    prepare();
  }, []);

  if (!isReady) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#2f80ed" />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AuthProvider>
          {/* AppStack contient la logique : Login ou AppDrawer */}
          <AppStack />
        </AuthProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}