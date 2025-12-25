import React, { useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { useTodoStore } from "./useTodoStore"; 

export default function TodoListScreen({ navigation }) {
  const { todos, loadTodos, toggleTodo, deleteTodo } = useTodoStore();

  useEffect(() => {
    loadTodos();
  }, []);

  return (
    <View style={{ flex: 1 }}>
        {/* Assure-toi que AppBar existe ou supprime cette ligne si pas nécessaire */}
        {/* <AppBar title="Ma Liste" /> */} 
        
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ flexDirection: 'row', padding: 10, borderBottomWidth: 1 }}>
            <TouchableOpacity onPress={() => toggleTodo(item.id)}>
              <Text style={{ textDecorationLine: item.completed ? 'line-through' : 'none' }}>
                {item.text}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => deleteTodo(item.id)} style={{ marginLeft: 'auto' }}>
              <Text style={{ color: 'red' }}>Supprimer</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}