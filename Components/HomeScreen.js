import React from 'react'
import { StyleSheet, Text, View, KeyboardAvoidingView, TouchableOpacity } from 'react-native'
import { auth } from "C:\\Users\\Pc\\Desktop\\CH\\Lebanese University\\CS M1\\Semester 8\\info438 - android\\Prject\\NQueen\\nqueens\\firebase.js";
import { useNavigation } from '@react-navigation/native';
import ChessGame from './ChessComponent';
import MyMenu from './Menu';



const HomeScreen = () => {



const navigation = useNavigation()
const handleSignOut = () =>{
   auth
   .signOut()
   .then(() =>{
      navigation.navigate("Root",{screen: 'Login'});
      console.log("Logged out! " );

   })
   .catch(error => alert(error.message))
}


const GoToMyToDo = () =>{
 //  navigation.navigate('MyTodos')
} 
   return (
   <View style={styles.container}>
       <ChessGame></ChessGame>
   <Text>Email: {auth.currentUser?.email} </Text>
   <TouchableOpacity style={styles.button}>
      <Text style={styles.buttonText} onPress={handleSignOut}>Sign Out!</Text>
   </TouchableOpacity>

 
   
   </View>
   
   )


}
export default HomeScreen
const styles = StyleSheet.create({
container: {
   flex:1,
   alignItems:'center',
   justifyContent: 'center',
   alignItems: 'center',
   width:'100%',
},

button : {
   backgroundColor: '#0782F9',
   width:'30%',
   paddingHorizontal:15,
   borderRadius:10,
   margin: 8,
   padding:5,
   
   },
   buttonText : {
      color:'white',
      fontWeight:'700',
      fontSize:16,
   },



})

