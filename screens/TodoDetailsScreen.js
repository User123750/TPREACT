import { View, Text, Button } from "react-native";
import { useDispatch } from "react-redux"; // [cite: 93]
import { removeTodo } from "../store/todosSlice"; // [cite: 94]

export default function TodoDetailsScreen({ route, navigation }) {
  const { id, title } = route.params;
  const dispatch = useDispatch(); // [cite: 98]

  const handleDelete = () => {
    dispatch(removeTodo(id)); // [cite: 100]
    navigation.goBack(); // [cite: 101]
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24 }}>{title}</Text>
<Button 
  title="Supprimer cette tâche" 
  color="red" 
  onPress={handleDelete} 
/>    


</View>
  );
}