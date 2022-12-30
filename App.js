import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Auth0Provider } from 'react-native-auth0';
import Home from './Home';

export default function App() {
  return (
    <Auth0Provider domain="scalper.eu.auth0.com" clientId="p4SHfqB2YCYEX8Gjt4wGnTbd0SYwab0S">
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <StatusBar style="auto" />
        <Home/>
      </View>
    </Auth0Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
