// import * as React from 'react';
// import { useState } from 'react';
// import { View, Text, Image, TextInput, Pressable, Alert, StyleSheet } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';

// // --- ÉCRAN 1 : WelcomeScreen ---
// const WelcomeScreen = ({ navigation }) => {
//   return (
//     <View style={welcomeStyles.container}>
//       {/* Assurez-vous que l'image est bien dans ./assets/ */}
//       <Image
//         style={welcomeStyles.logo}
//         source={require('./assets/little-lemon-logo.png')} 
//         resizeMode="contain"
//       />
      
//       <Text style={welcomeStyles.title}>
//         Little Lemon, votre bistro local méditerranéen
//       </Text>

//       <View style={welcomeStyles.buttonContainer}>
//         <Pressable
//           onPress={() => navigation.navigate('Subscribe')}
//           style={welcomeStyles.button}>
//           <Text style={welcomeStyles.buttonText}>Newsletter</Text>
//         </Pressable>
//       </View>
//     </View>
//   );
// };

// const welcomeStyles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 24,
//     backgroundColor: 'white',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   logo: {
//     height: 200,
//     width: 200,
//     marginBottom: 32,
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginBottom: 80,
//     color: '#333333',
//   },
//   buttonContainer: {
//     width: '100%',
//     position: 'absolute',
//     bottom: 50,
//   },
//   button: {
//     backgroundColor: '#495E57',
//     padding: 10,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 18,
//   },
// });

// // --- ÉCRAN 2 : SubscribeScreen ---
// const SubscribeScreen = () => {
//   const [email, setEmail] = useState('');

//   // Validation simple : vérifie que le champ n'est pas vide
//   const isEmailValid = email.length > 0;

//   const handleSubscribe = () => {
//     Alert.alert("Confirmation", "Merci de vous être abonné, restez à l'écoute !");
//     setEmail(""); // Vider le champ
//   };

//   return (
//     <View style={subscribeStyles.container}>
//       <Image
//         style={subscribeStyles.logo}
//         source={require('./assets/little-lemon-logo.png')}
//         resizeMode="contain"
//       />

//       <Text style={subscribeStyles.subTitle}>
//         Abonnez-vous à notre newsletter pour nos dernières recettes délicieuses !
//       </Text>

//       <TextInput
//         style={subscribeStyles.input}
//         value={email}
//         onChangeText={setEmail}
//         placeholder="Entrez votre email"
//         keyboardType="email-address"
//         autoCapitalize="none"
//       />

//       <Pressable
//         onPress={handleSubscribe}
//         disabled={!isEmailValid}
//         style={[
//           subscribeStyles.button,
//           !isEmailValid ? subscribeStyles.buttonDisabled : subscribeStyles.buttonEnabled
//         ]}>
//         <Text style={subscribeStyles.buttonText}>S'abonner</Text>
//       </Pressable>
//     </View>
//   );
// };

// const subscribeStyles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 24,
//     backgroundColor: 'white',
//     alignItems: 'center',
//   },
//   logo: {
//     height: 100,
//     width: 100,
//     marginBottom: 32,
//     marginTop: 30,
//   },
//   subTitle: {
//     fontSize: 20,
//     textAlign: 'center',
//     marginBottom: 30,
//     color: '#333333',
//   },
//   input: {
//     height: 40,
//     width: '100%',
//     borderColor: '#333333',
//     borderWidth: 1,
//     borderRadius: 8,
//     paddingHorizontal: 10,
//     marginBottom: 20,
//   },
//   button: {
//     width: '100%',
//     padding: 10,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   buttonEnabled: {
//     backgroundColor: '#495E57',
//   },
//   buttonDisabled: {
//     backgroundColor: '#cccccc',
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 18,
//   },
// });

// // --- CONFIGURATION NAVIGATION & APP ---
// const Stack = createNativeStackNavigator();

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Welcome">
//         <Stack.Screen name="Welcome" component={WelcomeScreen} />
//         <Stack.Screen name="Subscribe" component={SubscribeScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

// App.js
import { Provider } from "react-redux"; [cite_start]// [cite: 38]
import { store } from "./store/store"; [cite_start]// [cite: 39]
// ... autres imports

export default function App() {
  return (
    // Le Provider doit englober toute la navigation
    <Provider store={store}> 
      <AuthProvider>
         <NavigationContainer>
            <RootNavigator />
         </NavigationContainer>
      </AuthProvider>
    [cite_start]</Provider> // [cite: 45]
  );
}