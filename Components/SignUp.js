
import { StyleSheet, Text, View,button, TextInput ,buttonText,TouchableOpacity,KeyboardAvoidingView ,buttonOutlineText,buttonOutline,buttonContainer, Image} from 'react-native'
import React, {useState , useEffect} from 'react';
import { auth, db } from 'C:\\Users\\Pc\\Desktop\\CH\\Lebanese University\\CS M1\\Semester 8\\info438 - android\\Prject\\NQueen\\nqueens\\firebase.js';
import { useNavigation } from '@react-navigation/native';
import { DatePickerIOSBase } from 'react-native';




const SignUp = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [birthday, setBirthday] = useState(new Date());

const navigation = useNavigation()


useEffect(() => {
 unsubscribe = auth.onAuthStateChanged( user =>{
       if (user) {
 navigation.navigate("Root",{screen: 'Home'});
        }

   })
   return unsubscribe
}, [])

const handleDateChange = (date) => {
    setBirthday(date);
  };
  

const handleSignUp = () =>{
    console.log("user.email" );

auth
.createUserWithEmailAndPassword(email,password)
.then(userCredentials =>{
const user = userCredentials.user;
console.log(user.email);
db.collection('users')
   .doc(user.uid)
   .set({
     email: user.email,
     firstName,
     lastName,
   })
   .then(() => {
     // Additional user information stored successfully
     Alert.alert('Registration Successful');
     // Clear form fields
     setEmail('');
     setPassword('');
     setFirstName('');
     setLastName('');
   })
   .catch((error) => {
     // Error storing additional user information
     Alert.alert('Error', error.message);
   });

})
.catch(error => alert(error.message))
}

const ToLogin = () =>{
    navigation.navigate('Root',{screen:'Sign In'});

   }


 
   return (
   <KeyboardAvoidingView
   style = {styles.container}
   behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -200}
   >
      <Image  style={{width: '100%', height:'50%'}} source={require("C:\\Users\\Pc\\Desktop\\CH\\Lebanese University\\CS M1\\Semester 8\\info438 - android\\Prject\\NQueen\\nqueens\\assets\\img\\signin.jpg")} />
   <View style={styles.inputContainer}>
   <TextInput
     placeholder="Email"
     value={email} onChangeText={text => setEmail(text)}
     style={styles.input}

     />
     <TextInput
          placeholder="Password"
          value={password} onChangeText={text => setPassword(text)}
          style={styles.input}
          secureTextEntry

          />
   
   <TextInput
        placeholder="First Name"
        value={firstName} 
        style={styles.input}
        onChangeText={setFirstName}
      />
      <TextInput
        placeholder="Last Name"
        value={lastName}
        style={styles.input}
        onChangeText={setLastName}
      />

      </View>
   <View style={styles.buttonContainer}>
   <TouchableOpacity  onPress={handleSignUp} style={styles.button}>
   <Text style={styles.buttonOutlineText}>Register</Text>
   </TouchableOpacity>

   <TouchableOpacity  onPress={ToLogin} style={[styles.button, styles.buttonOutline]}>
   <Text style={styles.buttonText}>Login</Text>
    </TouchableOpacity>


   </View>



   


   </KeyboardAvoidingView>
)


}
export default SignUp
const styles = StyleSheet.create({

container: {
flex:1,
backgroundColor:'white',
justifyContent: 'center',
alignItems: 'center',
},

inputContainer : {
width: '80%'
},
input : {
backgroundColor: '#b6c8f9',
paddingHorizontal: 15,
paddingVertical:10,
borderRadius:10,
opacity:0.7,
marginTop:5,
},
buttonContainer : {
width:'60%',
justifyContent:'center',
alignItems:'center',
marginTop: 40,

},
button : {
backgroundColor: '#1a53ff',
width:'100%',
paddingHorizontal:15,
borderRadius:10,
margin: 8,
padding:15,

},
buttonOutline : {
   backgroundColor: '#FFFFFF',
   marginTop: 5,
   borderColor:'#1a53ff',
   borderWidth:2,

},
buttonOutlineText : {
   color:'#1a53ff',
   fontWeight:'700',
   fontSize:16,
},
buttonText : {
   color:'white',
   fontWeight:'700',
   fontSize:16,
},
})

