import { CameraView, useCameraPermissions } from "expo-camera";
import { View, Text, Button, StyleSheet, Linking } from "react-native";
import { useRef } from "react";

export default function CameraScreen({ navigation }) {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);

  // 1. En attente de chargement des permissions
  if (!permission) {
    return <View style={styles.center}><Text>Chargement...</Text></View>;
  }

  // 2. Permission refusée (ou pas encore demandée)
  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text style={styles.text}>Accès caméra requis</Text>
        <Button title="Autoriser la caméra" onPress={requestPermission} />
        {/* Si l'utilisateur a refusé définitivement, on lui propose d'ouvrir les réglages */}
        {!permission.canAskAgain && (
             <Button title="Ouvrir les paramètres" onPress={Linking.openSettings} color="gray"/>
        )}
        <Button title="Retour" onPress={() => navigation.goBack()} color="red" />
      </View>
    );
  }

  // 3. Permission accordée : Affichage de la caméra
  return (
    <View style={{ flex: 1 }}>
      <CameraView 
        style={{ flex: 1 }} 
        facing="back" // "back" ou "front"
        ref={cameraRef} 
      />
      
      {/* Bouton de retour par-dessus la caméra */}
      <View style={styles.controls}>
        <Button title="Retour" onPress={() => navigation.goBack()} color="#fff" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  center: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff"
  },
  text: {
    marginBottom: 20,
    fontSize: 16,
    textAlign: "center"
  },
  controls: {
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
    alignItems: "center",
  }
});