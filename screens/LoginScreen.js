import React, { useContext, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, StyleSheet, Alert } from "react-native";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebase";
import { ThemeContext } from "../context/ThemeContext";

export default function LoginScreen() {
  const { theme } = useContext(ThemeContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAuth = async (type) => {
    setLoading(true);
    try {
      if (type === "login") {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
    } catch (e) {
      Alert.alert("Erreur", e.message);
    } finally {
      setLoading(false);
    }
  };

  const styles = getStyles(theme);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenue</Text>
      
      <TextInput 
        placeholder="Email" 
        placeholderTextColor="#999"
        value={email} 
        onChangeText={setEmail} 
        style={styles.input} 
        autoCapitalize="none"
      />
      <TextInput 
        placeholder="Mot de passe" 
        placeholderTextColor="#999"
        value={password} 
        onChangeText={setPassword} 
        secureTextEntry 
        style={styles.input} 
      />

      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <>
          <TouchableOpacity style={styles.btn} onPress={() => handleAuth("login")}>
            <Text style={styles.btnText}>Se connecter</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.btn, styles.btnOutline]} onPress={() => handleAuth("register")}>
            <Text style={[styles.btnText, { color: theme === "dark" ? "#fff" : "#000" }]}>Créer un compte</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const getStyles = (theme) => StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20, backgroundColor: theme === "dark" ? "#121212" : "#fff" },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 20, textAlign: "center", color: theme === "dark" ? "#fff" : "#000" },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 12, marginBottom: 12, color: theme === "dark" ? "#fff" : "#000" },
  btn: { backgroundColor: "#2f80ed", padding: 14, borderRadius: 8, marginBottom: 10 },
  btnOutline: { backgroundColor: "transparent", borderWidth: 1, borderColor: "#2f80ed" },
  btnText: { color: "#fff", textAlign: "center", fontWeight: "bold" }
});