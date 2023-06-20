import React, { useState } from 'react';

import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

// import queenImage from '../assets/images/Queen.jpg';

import Icon from 'react-native-vector-icons/FontAwesome5';





const ChessGame = () => {

  const [chessboard, setChessboard] = useState([]);

  const [n, setN] = useState(0);




  const [ChessN, setChessN] = useState(0);

  const [score, setScore] = useState(0);





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

        <TouchableOpacity style={styles.button} onPress={() => startGame(8)}>

          <Text style={styles.buttonText}>Start Game</Text>

        </TouchableOpacity>

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

        setTimeout(() => {

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

    setN(0);

    setChessboard([]);

    setChessN(0);

    setScore(0);

  };




  const startGame = (boardSize) => {

    initializeGame(boardSize);

  };




  return (

    <View style={styles.container}>

     

      {drawBoard()}

    </View>

  );

};




const styles = StyleSheet.create({

  container: {

    flex: 1,

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

  row: {

    flexDirection: 'row',

  },

  cell: {

    width: 50,

    height: 50,

    justifyContent: 'center',

    alignItems: 'center',

  },

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

 

 

});




export default ChessGame;

