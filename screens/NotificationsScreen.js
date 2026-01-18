import React from "react";
import { View, Text, Button, StyleSheet, Alert } from "react-native";
import * as Notifications from "expo-notifications";

// Configuration pour afficher l'alerte même si l'app est ouverte
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function NotificationsScreen({ navigation }) {
  
  const requestPermission = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    Alert.alert("Permission", status === "granted" ? "Accordée" : "Refusée");
  };

  const sendNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Hello !",
        body: "Ceci est une notification locale.",
      },
      trigger: null, // Immédiat
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notifications Locales</Text>
      
      <View style={styles.btnContainer}>
        <Button title="1. Demander Permission" onPress={requestPermission} />
      </View>
      
      <View style={styles.btnContainer}>
        <Button title="2. Envoyer Notification" onPress={sendNotification} />
      </View>

      <Button title="Retour" onPress={() => navigation.goBack()} color="gray" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 30 },
  btnContainer: { marginBottom: 20 }
});