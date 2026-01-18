import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Import des écrans (Assure-toi de créer les fichiers correspondants)
import NativeFeaturesScreen from "../screens/NativeFeaturesScreen";
import CameraScreen from "../screens/CameraScreen";
import LocationScreen from "../screens/LocationScreen";
import ContactsScreen from "../screens/ContactsScreen";
import NotificationsScreen from "../screens/NotificationsScreen";

const Stack = createNativeStackNavigator();

export default function NativeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* Écran par défaut : Le menu avec les boutons */}
      <Stack.Screen name="MenuFeatures" component={NativeFeaturesScreen} />

      {/* Les écrans de fonctionnalités */}
      <Stack.Screen name="Camera" component={CameraScreen} />
      <Stack.Screen name="Localisation" component={LocationScreen} />
      <Stack.Screen name="Contacts" component={ContactsScreen} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
    </Stack.Navigator>
  );
}