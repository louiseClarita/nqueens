import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet,Pressable,TouchableOpacity  } from 'react-native';
import { addDoc, query, where, collection ,getDocs } from 'firebase/firestore';
import { FlatList } from 'react-native';
import { auth, db } from '../firebase';
import Game from './Game';
import { useNavigation } from '@react-navigation/native';





export default function Account() {
    const user = auth.currentUser;
    const userEmail = user?.email;
    const [documents, setDocuments] = useState([]);
    const navigation = useNavigation()


    useEffect(() => {
        fetchDocuments();

    },[])
    const fetchDocuments = async () => {
        try {
          const filtre = query(collection(db, 'Games'),where("email","==",userEmail));
          const querySnapshot = await getDocs(filtre);
          const documentsData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          setDocuments(documentsData);
        } catch (error) {
          console.error('Error fetching documents:', error);
        }
      };
  
   const renderGame = ({ item }) => {
          return (
             
            <View style={styles.container}>
            <Game item={item} />
          </View>

          );

   };
   const toModifyAccount = () => {
    navigation.navigate('Edit');
};

  return (
    <View>
      <View style={styles.accountContainer}>
      <Text style={styles.accountText}>Welcome {"\n"}
      {userEmail}</Text>
      </View>  
      <View style={styles.gamesList}>
                  <TouchableOpacity
            style={[styles.buttons]}
            onPress={fetchDocuments}>
            <Text style={styles.textStyle}>Reload</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.buttons]}
            onPress={toModifyAccount}>
            <Text style={styles.textStyle}>Modify Your Account</Text>
          </TouchableOpacity>
      
           <FlatList
                    data={documents}
                    keyExtractor={(item) => documents.id}
                    renderItem={ renderGame } /> 
      </View>
 
      
     </View>
  );
}

const styles = StyleSheet.create({
    container: {
    },
    accountContainer: {
     margin:15,
     marignBottom:2,
     padding:50,
     alignItems: 'center',
     backgroundColor: '#4d79ff',
     borderRadius: 35,

     borderColor:'#b6c8f9',
    },

    accountText:{
        fontFamily: 'monospace',
        color:'white',
        fontSize:15,
    },
    
    gamesList:{
        
        margin:20,
        justifyContent: 'center',
    },
    buttons: {
        borderColor: '#4d79ff',
        borderRadius: 35,
        alignItems: 'center',
        borderWidth:2,
        marginBottom:5,
        padding: 10,
        elevation: 2,
        marginTop: 3,
        backgroundColor: '#f2f2f2',
    },
});

