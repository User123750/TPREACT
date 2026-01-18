import React, { useState } from "react";
import { View, Text, Button, FlatList, StyleSheet } from "react-native";
import * as Contacts from "expo-contacts";

export default function ContactsScreen({ navigation }) {
  const [contacts, setContacts] = useState([]);

  const loadContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === "granted") {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers],
      });

      if (data.length > 0) {
        setContacts(data);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contacts</Text>
      <Button title="Charger les contacts" onPress={loadContacts} />
      
      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.name}</Text>
          </View>
        )}
        style={{ width: "100%", marginTop: 20 }}
      />
       <Button title="Retour" onPress={() => navigation.goBack()} color="gray" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, alignItems: "center" },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 20 },
  item: { padding: 10, borderBottomWidth: 1, borderBottomColor: "#ccc" }
});