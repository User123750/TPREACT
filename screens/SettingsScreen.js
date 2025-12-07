import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Paramètres ⚙️</Text>
      
      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Mode Sombre</Text>
        <Text style={{color: 'gray'}}>Désactivé</Text>
      </View>
      
      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Notifications</Text>
        <Text style={{color: 'green'}}>Activé</Text>
      </View>
      
      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Version</Text>
        <Text style={{color: 'gray'}}>1.0.0</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  settingText: {
    fontSize: 18,
  },
});