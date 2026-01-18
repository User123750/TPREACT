import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import * as Location from "expo-location";

export default function LocationScreen({ navigation }) {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission refusée");
      return;
    }

    let loc = await Location.getCurrentPositionAsync({});
    setLocation(loc.coords);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Géolocalisation</Text>
      
      <Button title="Obtenir ma position" onPress={getLocation} />
      
      {location && (
        <View style={styles.result}>
          <Text>Latitude : {location.latitude}</Text>
          <Text>Longitude : {location.longitude}</Text>
        </View>
      )}
      {errorMsg && <Text style={{ color: "red" }}>{errorMsg}</Text>}
      
      <Button title="Retour" onPress={() => navigation.goBack()} color="gray" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 20 },
  result: { marginTop: 20, marginBottom: 20 }
});