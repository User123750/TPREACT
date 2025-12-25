import React from "react";
import { View, Text, Button } from "react-native";
// CORRECTION : Le fichier est dans le même dossier, on utilise "./"
import { useTodoStore } from "./useTodoStore"; 

export default function TodoDetailsScreen({ route, navigation }) {
  // Protection : Vérifie si route.params existe pour éviter un crash
  const { id, title } = route.params || {}; 
  const { removeTodo } = useTodoStore(); 

  const handleDelete = () => {
    if (id) {
        removeTodo(id); 
        navigation.goBack(); 
    }
  };

  return (
    <View style={{ flex: 1, padding: 20, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>{title || "Tâche inconnue"}</Text>
      <Button title="Supprimer cette tâche" color="red" onPress={handleDelete} />
    </View>
  );
}