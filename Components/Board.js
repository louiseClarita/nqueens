import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';

const Board = (boardSize) => {
  // Assuming you have the boardSize variable available
  
  // Calculate the cell size based on the screen width and board size
  const cellSize = Math.floor(Dimensions.get('window').width / boardSize);

  // Generate the board cells
  const boardCells = Array.from({ length: boardSize }).map((_, row) =>
    Array.from({ length: boardSize }).map((_, col) => (
      <View key={`${row}-${col}`} style={[styles.cell, { width: cellSize, height: cellSize }]} />
    ))
  );

  return (
    <View style={styles.boardContainer}>{boardCells}</View>
  );
};

const styles = StyleSheet.create({
  boardContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  cell: {
    borderWidth: 1,
    borderColor: '#000000',
  },
});

export default Board;
