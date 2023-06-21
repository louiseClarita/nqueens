import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './Components/LoginScreen';
import HomeScreen from './Components/HomeScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Account from './Components/Account';
import Scorings from './Components/Scorings';
import { auth } from './firebase';
import Signout from './Components/SignOut';
import AccountEditPage from './Components/AccountEditPage';

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return unsubscribe;
  }, []);

  const Stack = createNativeStackNavigator();
  const Drawer = createDrawerNavigator();

  const handleSignOut = () => {
    auth.signOut()
      .then(() => {
        setUser(null);
        console.log('Logged out successfully!');
      })
      .catch((error) => {
        console.error('Error occurred during sign out:', error);
      });
  };

  const Root = ({ navigation }) => {
    return (
      <Drawer.Navigator initialRouteName={user ? 'Home' : 'Login'}>
        {user && <Drawer.Screen name="Account Info" component={Account} />}
        {user && <Drawer.Screen name="Home" component={HomeScreen} />}
        {user && (
          <Drawer.Screen
            name="Sign Out"
            onPress={handleSignOut}
            component={Signout}
          />
        )}
        {!user && <Drawer.Screen name="Sign In" component={LoginScreen} />}
      </Drawer.Navigator>
    );
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Root"
          component={Root}
          options={{ headerShown: false }}
        />
      
      
        <Stack.Screen
          name="Edit"
          component={AccountEditPage}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
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
