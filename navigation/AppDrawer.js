import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "../screens/HomeScreen"; // L'écran principal des tâches
import NativeStack from "./NativeStack"; // La navigation des fonctions natives (Caméra, etc.)

const Drawer = createDrawerNavigator();

export default function AppDrawer() {
  return (
    <Drawer.Navigator screenOptions={{ headerShown: true }}>
      <Drawer.Screen name="Mes Tâches" component={HomeScreen} />
      <Drawer.Screen name="Fonctions Natives" component={NativeStack} />
    </Drawer.Navigator>
  );
}