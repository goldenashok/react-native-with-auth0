import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Auth0Provider } from 'react-native-auth0';
import config from './auth0-configuration';
import Home from './Home';

export default function App() {
  return (
    Auth0Provider domain={config.domain} clientId={config.clientId}>
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
