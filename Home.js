import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useAuth0 } from 'react-native-auth0';
import React, { useState } from 'react';


const Home = () => {
    const {authorize, user, clearSession, getCredentials, error} = useAuth0();
    const [accessToken, setAccessToken] = useState('');
    const login = async () => {
        await authorize();
        const {accessToken} = await getCredentials();
        setAccessToken(accessToken);
        // try {
        //     await authorize();
        // } catch (e) {
        //     console.log(e);
        // }
    };
    const logout = async () => {
         await clearSession();
        // try {
        //     await clearSession();
        // } catch (e) {
        //     console.log(e);
        // }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}> Auth0Sample - Login </Text>
            {!user && <Button onPress={login} title="Log in" >Login</Button>}
            {user && <Text>Logged in as {user.name}</Text>}
            {user && <Text>Access Token: {accessToken}</Text>}
            {user && <Button onPress={logout} title="Log out" >Log Out</Button>}
            {error && <Text style={styles.error}>{error.message}</Text>}
        </View>
    )

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  error: {
    margin: 20,
    textAlign: 'center',
    color: '#D8000C'
  }
});

export default Home;