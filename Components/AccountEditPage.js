import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { auth } from '../firebase';
import { useNavigation } from '@react-navigation/native';

export default function AccountEditPage() {
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigation = useNavigation()

  const handleEmailChange = (text) => {
    setNewEmail(text);
  };

  const handlePasswordChange = (text) => {
    setNewPassword(text);
  };

  const handleModifyAccount = () => {
    const user = auth.currentUser;
  if(user){
    // Update email
    if (newEmail) {
      user
        .updateEmail(newEmail)
        .then(() => {
          setNewEmail('');
          setErrorMessage('');
          console.log('Email updated successfully!');
        })
        .catch((error) => {
          setErrorMessage(error.message);
        });
    }

    // Update password
    if (newPassword) {
      user
        .updatePassword(newPassword)
        .then(() => {
          setNewPassword('');
          setErrorMessage('');
          console.log('Password updated successfully!');
        })
        .catch((error) => {
          setErrorMessage(error.message);
        });
    }
    navigation.navigate('Root',{screen:'Account Info'});
  }else alert(" user is empty!");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Modify Account</Text>
      <TextInput
        style={styles.input}
        placeholder="New Email"
        onChangeText={handleEmailChange}
        value={newEmail}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="New Password"
        onChangeText={handlePasswordChange}
        value={newPassword}
        secureTextEntry
        autoCapitalize="none"
      />
      <Button title="Modify Account" onPress={handleModifyAccount} />
      {errorMessage ? (
        <Text style={styles.error}>{errorMessage}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer : {
    width: '100%'
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

  error: {
    color: 'red',
    marginTop: 10,
  },
});
