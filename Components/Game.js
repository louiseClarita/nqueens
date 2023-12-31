import { View, Text, StyleSheet, Alert, Modal, Pressable } from "react-native";
import React, { useState } from 'react';
import { AntDesign } from "@expo/vector-icons";
import { db } from "../firebase";

const Game = ({ item }) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (


    
    <View style={styles.genres}>
      <View style={styles.genre}>
        <View key={item.id} style={styles.genreContent}>
          <Text style={styles.todoTitle}>{item.type}</Text>
          <Text style={styles.genreText}>{item.result}</Text>
        </View>
        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
              setModalVisible(!modalVisible);
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text>Result : </Text><Text style={styles.modalText}>{item.result}</Text>
                <Text>Played On : </Text><Text style={styles.modalText}>{item.date}</Text>
                <Text>Score : </Text><Text style={styles.modalText}>{item.score}</Text>
                <Text>Board Size : </Text><Text style={styles.modalText}>{item.N}</Text>

                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}>
                  <Text style={styles.textStyle}>Okay</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
          <Pressable
            style={[styles.button, styles.buttonOpen]}
            onPress={() => setModalVisible(true)}>
            <Text style={styles.textStyle}>More Information</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default Game;

const styles = StyleSheet.create({
  genres: {
    backgroundColor:'#f2f2f2',
    width: '98%',
    justifyContent: 'center',
    margin: 4,
    
    
  },
  genre: {
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: 'row',
    borderColor: '#ccc',
    marginBottom: 1,
    alignItems: 'center',
  },
  genreContent: {
    margin:10,
    alignItems: 'center',
  },
  genreText: {
    padding:5,
    margin:5,
    float:'Left',
    display:"flex",
    fontSize: 12,
    opacity: 0.7,
    justifyContent: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
   
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    alignItems: 'center',
    borderRadius: 20,
    alignSelf: 'flex-end',
    marginBottom:5,
    padding: 10,
    elevation: 2,
    marginTop: 10,
  },
  buttonOpen: {
    backgroundColor: '#4d79ff',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
