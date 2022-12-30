# react-native-with-auth0
1. Create new app using ```npx create-expo-app <project name>```
2. Install expo app if you are not install globally. ```npm install -g expo-cli```
3. Install eas globally for generate build ```npm install -g eas-cli```
4. `cd <project name>` then give ```npm install``` for installing node packages
5. Then install react-native auth0 ```npm i react-native-auth0```
6. Then generate andord and ios prebuild for add details using ```expo prebuild```
7. Add below line for Android `build.gradle` file ```android/app/build.gradle```
  ```
      android {
       defaultConfig {
          // Add the next line
          manifestPlaceholders = [auth0Domain: "YOUR_AUTH0_DOMAIN", auth0Scheme: "${applicationId}"]
        }
         ...
      }
  ```
  The `auth0Domain` value must be replaced with your Auth0 domain value. So if you have samples.auth0.com as your Auth0 domain you would have a configuration like the following: whihc created from auth0 application
  ```
      android {
        defaultConfig {
            manifestPlaceholders = [auth0Domain: "samples.auth0.com", auth0Scheme: "${applicationId}"]
        }
        ...
      }
  ```
8. add below line for the IOS
  Inside the `ios` folder find the file `AppDelegate.[swift|m]` add the following to it:
  ```
      #import <React/RCTLinkingManager.h>
      - (BOOL)application:(UIApplication *)app openURL:(NSURL *)url
                  options:(NSDictionary<UIApplicationOpenURLOptionsKey, id> *)options
      {
        return [RCTLinkingManager application:app openURL:url options:options];
      }
  ```
  Inside the ios folder open the ```Info.plist`` and locate the value for CFBundleIdentifier, e.g.
  ```
    <key>CFBundleIdentifier</key>
    <string>$(PRODUCT_BUNDLE_IDENTIFIER)</string>
  ```
  and then below it register a URL type entry using the value of `CFBundleIdentifier` as the value for `CFBundleURLSchemes:`
  ```
    <key>CFBundleURLTypes</key>
      <array>
          <dict>
              <key>CFBundleTypeRole</key>
              <string>None</string>
              <key>CFBundleURLName</key>
              <string>auth0</string>
              <key>CFBundleURLSchemes</key>
              <array>
                  <string>$(PRODUCT_BUNDLE_IDENTIFIER)</string>
              </array>
          </dict>
      </array>
  ```
9. Add blow line for React native
  ```
    import React from 'react';
    import {Alert, Button, StyleSheet, Text, View} from 'react-native';
    import {useAuth0, Auth0Provider} from 'react-native-auth0';
    import config from './auth0-configuration';

    const Home = () => {
      const {authorize, clearSession, user, getCredentials, error} = useAuth0();

      const onLogin = async () => {
        await authorize({scope: 'openid profile email'});
        const {accessToken} = await getCredentials();
        Alert.alert('AccessToken: ' + accessToken);
      };

      const loggedIn = user !== undefined && user !== null;

      const onLogout = async () => {
        await clearSession({federated: true}, {localStorageOnly: false});
      };

      return (
        <View style={styles.container}>
          <Text style={styles.header}> Auth0Sample - Login </Text>
          {user && <Text>You are logged in as {user.name}</Text>}
          {!user && <Text>You are not logged in</Text>}
          <Button
            onPress={loggedIn ? onLogout : onLogin}
            title={loggedIn ? 'Log Out' : 'Log In'}
          />
          {error && <Text style={styles.error}>{error.message}</Text>}
        </View>
      );
    };

    const App = () => {
      return (
        <Auth0Provider domain={Domain name} clientId={ClientId}>
          <Home />
        </Auth0Provider>
      );
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

    export default App;
  ```

9.  ```eas build -platform android``` by default create .aab file. this will used to upload in to the playstore
10. if you want to change `.apk` format we need to change `eas.json`
    ```
         "build": {
        "preview": {
          "android": {
            "buildType": "apk"
          }
        },
        "preview2": {
          "android": {
            "gradleCommand": ":app:assembleRelease"
          }
        },
        "preview3": {
          "developmentClient": true
        },
        "development": {
          "distribution": "internal",
          "android": {
            "gradleCommand": ":app:assembleDebug"
          },
          "ios": {
            "buildConfiguration": "Debug"
          }
        },
        "production": {}
      },
  ```
12. Run the command to get API. this will automatically upload in the `expo.dev`.  ```eas build -p android --profile preview```
