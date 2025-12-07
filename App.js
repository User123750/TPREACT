import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';


import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen';
import SettingsScreen from './screens/SettingsScreen';

import AppBar from './components/AppBar';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack() {
  return (
    
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Accueil" component={HomeScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
     
      <SafeAreaView style={{ flex: 1, backgroundColor: '#007AFF' }}>
        
        <NavigationContainer>
          
          <AppBar />

          <Tab.Navigator
            screenOptions={({ route }) => ({
              headerShown: false, 
              tabBarActiveTintColor: 'blue',
              tabBarInactiveTintColor: 'gray',
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                if (route.name === 'Maison') {
                  iconName = focused ? 'home' : 'home-outline';
                } else if (route.name === 'Paramètres') {
                  iconName = focused ? 'settings' : 'settings-outline';
                }
                return <Ionicons name={iconName} size={size} color={color} />;
              },
            })}
          >
            <Tab.Screen name="Maison" component={HomeStack} />
            <Tab.Screen name="Paramètres" component={SettingsScreen} />
          </Tab.Navigator>
        </NavigationContainer>

      </SafeAreaView>
    </SafeAreaProvider>
  );
}