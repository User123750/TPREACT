import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function DetailsScreen({ route, navigation }) {
  const { id } = route.params || {}; 

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Détails de l'article</Text>
        <Text style={styles.idText}>ID reçu : #{id}</Text>
        <Text style={styles.description}>
          Ici, tu pourrais afficher une description complète, une image ou d'autres informations reçues depuis l'API.
        </Text>
      </View>
      
      <View style={{ marginTop: 20 }}>
        <Button title="Retour à l'accueil" onPress={() => navigation.goBack()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e3e3e3',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: 'white',
    padding: 30,
    borderRadius: 15,
    width: '100%',
    alignItems: 'center',
    elevation: 5, 
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#2c3e50',
  },
  idText: {
    fontSize: 18,
    color: '#007AFF',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  description: {
    textAlign: 'center',
    color: '#7f8c8d',
    lineHeight: 22,
  },
});