import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function NativeFeaturesScreen({ navigation }) {
  const features = [
    { name: "Caméra", route: "Camera" },
    { name: "Géolocalisation", route: "Localisation" }, // Tu devras créer LocationScreen
    { name: "Contacts", route: "Contacts" }, // Tu devras créer ContactsScreen
    { name: "Notifications", route: "Notifications" }, // Tu devras créer NotificationsScreen
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Fonctionnalités Device</Text>
      {features.map((feat, index) => (
        <TouchableOpacity 
          key={index} 
          style={styles.item} 
          onPress={() => navigation.navigate(feat.route)}
        >
          <Text style={styles.text}>{feat.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  header: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  item: { padding: 20, backgroundColor: "#f0f0f0", borderRadius: 10, marginBottom: 10 },
  text: { fontSize: 18 }
});