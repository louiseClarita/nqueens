import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './Components/LoginScreen';
import HomeScreen from './Components/HomeScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer} from '@react-navigation/native';



export default function App() {


  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>

    

      <Stack.Navigator>
        <Stack.Screen options={{ headerShown : false }} name="Login" component={LoginScreen}/>
        <Stack.Screen options={{ headerShown : false }} name="Home" component={HomeScreen}/>

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
