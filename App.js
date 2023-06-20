import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './Components/LoginScreen';
import HomeScreen from './Components/HomeScreen';
import React, {useState , useEffect} from 'react';
import { auth } from 'C:\\Users\\Pc\\Desktop\\CH\\Lebanese University\\CS M1\\Semester 8\\info438 - android\\Prject\\NQueen\\nqueens\\firebase.js';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer} from '@react-navigation/native';
import MyMenu from './Components/Menu';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Signout from './Components/SignOut';
import Account from './Components/Account';
import ScoreBoard from './Components/ScoreBoard';
import AvatarAndClickable from './Components/ScoreBoard';


export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    unsubscribe = auth.onAuthStateChanged( user =>{
          if (user) 
            setUser(user);
   
      });
      return unsubscribe
   }, [])
   

  const Stack = createNativeStackNavigator();
  const Drawer = createDrawerNavigator();

  function Root(){
      return (
        <Drawer.Navigator initialRouteName={user ? "Home" : "Login"}>
        {user &&<Drawer.Screen name="Account Info" component={Account} />}
        {user && <Drawer.Screen name="Home" component={HomeScreen} />}

        {!user &&<Drawer.Screen name="Sign" component={LoginScreen} />}
  
        </Drawer.Navigator>

      );

  }


    const handleSignOut = () =>{
      auth
      .signOut()
      .then(() =>{
        navigation.navigate("Root",{screen: 'Login'});
        console.log("Logged out! " );
   
      })
      .catch(error => alert(error.message))
   }

  return (
    <NavigationContainer>

          <Stack.Navigator>  
              <Stack.Screen
                name="Root"
                component={Root}
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
