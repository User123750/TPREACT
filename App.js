import React, { useContext } from 'react';
import { NavigationContainer } from "@react-navigation/native";

// CORRECTION ICI : J'ai enlevé "/src" et utilisé le chemin "./context/..."
// IMPORTANT : J'utilise les accolades { } car c'est le standard.
import { AuthProvider, AuthContext } from './context/AuthContext';
import AppDrawer from "./navigation/AppDrawer"; 
import LoginScreen from "./screens/LoginScreen";

function RootNavigator() {
  const { user } = useContext(AuthContext);
  return user ? <AppDrawer /> : <LoginScreen />;
}

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}