import React, { useState,useEffect } from 'react';

import { StyleSheet, Text, View, TouchableOpacity,TextInput,TouchableWithoutFeedback,Keyboard } from 'react-native';
import { Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
// import { createRecord } from '../src/AddGame';

import { db,auth, firebase } from '../firebase';
const screenWidth = Dimensions.get('window').width;

const ChessGame = () => {

  const [chessboard, setChessboard] = useState([]);

  const [n, setN] = useState(0);


  const [showContainer, setShowContainer] = useState(true);

  const [ChessN, setChessN] = useState(0);

  const [score, setScore] = useState(0);
  const navigation = useNavigation()
  useEffect(() => {
    unsubscribe = auth.onAuthStateChanged( user =>{
          if (user) 
            setUser(user);
   
      });
      return unsubscribe
   }, [])
   
  const handleSignOut = () =>{
    console.log("Logged out f! " );
    auth
    .signOut()
    .then(() =>{
       navigation.navigate("Root",{screen:'Sign In'});
       console.log("Logged out! " );
 
    })
    .catch(error => alert(error.message))
 }

  
  const initializeGame = (boardSize) => {

    const newChessboard = Array(boardSize).fill().map(() => Array(boardSize).fill(0));

    setChessboard(newChessboard);

    setN(boardSize);

    setChessN(boardSize);

  };




  const printBoard = () => {

    for (let i = 0; i < n; i++) {

      let row = '';

      for (let j = 0; j < n; j++) {

        if (chessboard[i][j] === 1) {

          row += 'Q ';

        } else {

          row += '. ';

        }

      }

      console.log(row);

    }

  };




  const isSafe = (row, col) => {

    for (let i = 0; i < n; i++) {

      if (chessboard[row][i] === 1 || chessboard[i][col] === 1) {

        return false;

      }

    }




    for (let i = 0; i < n; i++) {

      for (let j = 0; j < n; j++) {

        if ((i + j === row + col || i - j === row - col) && chessboard[i][j] === 1) {

          return false;

        }

      }

    }




    return true;

  };




  const evaluate = () => {

    let score = 0;




    const rowCounts = chessboard.map((row) => row.reduce((count, cell) => count + cell, 0));

    score += rowCounts.filter((count) => count > 1).length;




    const colCounts = chessboard.reduce((acc, row) => {

      row.forEach((cell, col) => {

        acc[col] = (acc[col] || 0) + cell;

      });

      return acc;

    }, []);

    score += colCounts.filter((count) => count > 1).length;




    const diagonalCounts = [];

    for (let i = 0; i < 2 * n - 1; i++) {

      diagonalCounts.push(chessboard.flatMap((row, rowIndex) => row[i - rowIndex]).reduce((acc, cell) => acc + cell, 0));

      diagonalCounts.push(chessboard.flatMap((row, rowIndex) => row[n - 1 - i + rowIndex]).reduce((acc, cell) => acc + cell, 0));

    }

    score += diagonalCounts.filter((count) => count > 1).length;




    return score;

  };




  const alphabeta = (depth, alpha, beta, isMaximizingPlayer) => {

    if (depth === 0 || chessboard.flatMap((row) => row).reduce((count, cell) => count + cell, 0) === n) {

      return evaluate();

    }




    if (isMaximizingPlayer) {

      let maxEval = Number.NEGATIVE_INFINITY;

      for (let i = 0; i < n; i++) {

        for (let j = 0; j < n; j++) {

          if (chessboard[i][j] === 0 && isSafe(i, j)) {

            chessboard[i][j] = 1;

            const evall = alphabeta(depth - 1, alpha, beta, false);

            chessboard[i][j] = 0;

            maxEval = Math.max(maxEval, evall);

            alpha = Math.max(alpha, evall);

            if (beta <= alpha) {

              break;

            }

          }

        }

      }

      return maxEval;

    } else {

      let minEval = Number.POSITIVE_INFINITY;

      for (let i = 0; i < n; i++) {

        for (let j = 0; j < n; j++) {

          if (chessboard[i][j] === 0 && isSafe(i, j)) {

            chessboard[i][j] = 1;

            const evall = alphabeta(depth - 1, alpha, beta, true);

            chessboard[i][j] = 0;

            minEval = Math.min(minEval, evall);

            beta = Math.min(beta, evall);

            if (beta <= alpha) {

              break;

            }

          }

        }

      }

      return minEval;

    }

  };




  const getBestMove = () => {

    let bestScore = Number.NEGATIVE_INFINITY;

    let bestMove = null;

    for (let i = 0; i < n; i++) {

      for (let j = 0; j < n; j++) {

        if (chessboard[i][j] === 0 && isSafe(i, j)) {

          chessboard[i][j] = 1;

          const score = alphabeta(3, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY, false);

          chessboard[i][j] = 0;

          if (score > bestScore) {

            bestScore = score;

            bestMove = [i, j];

          }

        }

      }

    }

    return bestMove;

  };


  

  const drawBoard = () => {

    return (

      <View style={styles.container}>
    <Text style={styles.emailText}>Email: {auth.currentUser?.email}</Text>

    {showContainer && (
    <View style={styles.inputContainer}>
       
       
        <Text style={styles.inputLabel}>Board Size:</Text>
        <TextInput
  style={styles.input}
  placeholder="Enter board size"
  keyboardType="numeric"
  onChangeText={(text) => {
    const parsedValue = parseInt(text);
    if (!isNaN(parsedValue)) {
      setN(parsedValue);
    }
  }}
 
/>
</View>
      )}
<View >

  <TouchableOpacity onPress={() => startGame(8)}>
    <Text style={[styles.buttonText,styles.buttons]}>New Game</Text>
  </TouchableOpacity>

</View>

<Text style={styles.scoreText}>Score: {score}</Text>


<View style={styles.board}>
        {chessboard.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((cell, colIndex) => (
              <TouchableOpacity
                key={colIndex}
                style={[
                  styles.cell,
                  (rowIndex + colIndex) % 2 === 0 ? styles.whiteCell : styles.grayCell,
                ]}
                onPress={() => handleBoardClick(rowIndex, colIndex)}
              >
                {cell === 1 && (
                  <View style={styles.queenContainer}>
                    <Icon name="chess-queen" style={styles.queenIcon} />
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
      </View>

    );

  };

 

 

  const createRecord = async (data) => {
    try {
      const collectionRef = db.collection('Games');
      // Add the data to the collection
      await collectionRef.add(data);
      console.log('Record created successfully!');
    } catch (error) {
      console.error('Error creating record:', error);
    }
  };


  const handleCreateRecord = (data) => {
   
    console.log('before creation');
    createRecord(data);
  };


  const handleBoardClick = (row, col) => {

    if (ChessN > 0) {

      if (chessboard[row][col] === 0 && isSafe(row, col)) {

        const updatedBoard = [...chessboard];

        updatedBoard[row][col] = 1;

        setChessboard(updatedBoard);

        setChessN(ChessN - 1);

        setScore(score + 1); // Increment the score

 

        if (updatedBoard.flat().filter((cell) => cell === 1).length === n) {

          // Game over condition

          alert('Game Over: You placed all the queens!');

        } else {

          aiMove();

        }

      } else {

        alert('Game Over, your score is '+ score);


        const currentDate = new Date();
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        setTimeout(() => {
          const data = {
            email: auth.currentUser.email,
            type: 'One Game',
            N: '8',
            result: 'lost',
            score: score,
            date: currentDate.toLocaleString('en-US', options),

          };
          console.log(data);
          handleCreateRecord(data);
          resetGame();

          console.log('3 seconds have passed');

        }, 3000);

         

       

      }

    } else {

      alert('No more queens left to place!');

    }

  };

 




  const aiMove = () => {

    const move = getBestMove();

    const [row, col] = move;

    chessboard[row][col] = 1;

    drawBoard();




    if (chessboard.flatMap((row) => row).reduce((count, cell) => count + cell, 0) === n) {

      console.log('Game Over');

      printBoard();

    }

  };




  const resetGame = () => {
    setShowContainer(true);
    setN(0);

    setChessboard([]);

    setChessN(0);

    setScore(0);

  };




  const startGame = (boardSize) => {
    setShowContainer(false);
    setScore(0);
    initializeGame(boardSize);

  };




  return (

    <View style={styles.container}>

     

      {drawBoard()}

    </View>

  );

};


const cellSize = screenWidth / 8;

const styles = StyleSheet.create({

  
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    width:200,
  },
  inputLabel: {
    marginRight: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  button: {

    padding: 10,

    backgroundColor: '#2196F3',

    borderRadius: 5,

    marginBottom: 10,

  },

  buttonText: {

    color: '#fff',

    fontSize: 16,

    fontWeight: 'bold',

  },
  buttons: {
    borderColor: '#4d79ff',
    borderRadius: 35,
    alignItems: 'center',
    borderWidth:2,
    margin:5,
    padding: 10,
    elevation: 2,
    marginTop: 10,
    backgroundColor: '#4d79ff',
},
buttonsGrey: {
  borderColor: '#4d79ff',
  borderRadius: 35,
  alignItems: 'center',
  borderWidth:2,
  margin:5,
  alignSelf: 'flex-end',
  padding: 10,
  elevation: 2,
  marginTop: 10,
  backgroundColor: '#999999',
},
  row: {

    flexDirection: 'row',

  },

  cell: {
    width: cellSize,
    height: cellSize,
    justifyContent: 'center',
    alignItems: 'center',},

  whiteCell: {

    backgroundColor: '#fff',

  },

  grayCell: {

    backgroundColor: '#ccc',

  },

  queenImage: {

    width: 30,

    height: 30,

  },

  queenContainer: {

    width: 50,

    height: 50,

    borderRadius: 25,

    backgroundColor: 'yellow',

    justifyContent: 'center',

    alignItems: 'center',

  },

  queenIcon: {

    fontSize: 30,

    color: 'black',

  },

  boardContainer: {

    position: 'relative',

  },

  container: {

    flex: 1,
    width:'100%',
    justifyContent: 'center',

    alignItems: 'center',

    backgroundColor: '#fff',

  },

  button: {

    padding: 10,

    backgroundColor: '#2196F3',

    borderRadius: 5,

    marginBottom: 10,

  },

  buttonText: {

    color: '#fff',

    fontSize: 16,

    fontWeight: 'bold',

  },

  scoreText: {

    fontSize: 16,

    fontWeight: 'bold',

    marginBottom: 10,

  },

 
  emailText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 10,
  },
  button: {
    flex: 1,
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  startButton: {
    backgroundColor: '#FF5722', // Blue color for Start New Game button
  },
  signOutButton: {
    backgroundColor: '#2196F3', // Orange color for Sign Out button
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  scoreText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#666',
  },

});




export default ChessGame;

