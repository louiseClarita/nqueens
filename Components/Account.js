import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { addDoc, query, where, collection ,getDocs } from 'firebase/firestore';
import { FlatList } from 'react-native';
import { auth, db } from '../firebase';
import Game from './Game';

export default function Account() {
    const user = auth.currentUser;
    const userEmail = user?.email;
    const [documents, setDocuments] = useState([]);
  

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

  return (
    <View>
      <Text>Hello,{userEmail}</Text>
      <Button onPress={fetchDocuments} title="Fetch Games"></Button>

           <FlatList
                    data={documents}
                    keyExtractor={(item) => documents.id}
                    renderItem={ renderGame } /> 
 
      
     </View>
  );
}

const styles = StyleSheet.create({
    container: {
    },
});

