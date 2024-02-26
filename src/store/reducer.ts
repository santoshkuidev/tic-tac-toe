// game.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { markX, markO, resetGame } from './actions';

export interface GameState {
  board: string[][];
  currentPlayer: string; // 'X' or 'O'
  winner: string; // 'X', 'O', or ''
  gameOver: boolean;
}

export const initialState: GameState = {
  board: [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ],
  currentPlayer: 'X',
  winner: '',
  gameOver: false
};

export const gameReducer = createReducer(
  initialState,
  on(markX, (state, { row, col }) => {
    // Implement logic to mark X on the board
    const updatedBoard = state.board.map((rowArr, rowIndex) => {
        if (rowIndex === row) {
          return rowArr.map((cell, colIndex) => {
            if (colIndex === col && cell === '') {
              return 'X';
            }
            return cell;
          });
        }
        return rowArr;
      });

      const winner = checkWinner(updatedBoard);
      const gameOver = winner !== '' || isBoardFull(updatedBoard);


      return { ...state, board: updatedBoard, currentPlayer: 'O', winner, gameOver };
  }),
  on(markO, (state, { row, col }) => {
    // Implement logic to mark O on the board
    const updatedBoard = state.board.map((rowArr, rowIndex) => {
        if (rowIndex === row) {
          return rowArr.map((cell, colIndex) => {
            if (colIndex === col && cell === '') {
              return 'O';
            }
            return cell;
          });
        }
        return rowArr;
      });
      const winner = checkWinner(updatedBoard);
    const gameOver = winner !== '' || isBoardFull(updatedBoard);
    return { ...state, board: updatedBoard, currentPlayer: 'X', winner, gameOver };
  }),
  on(resetGame, () => initialState)
);


function checkWinner(board: string[][]): string {
    // Check rows
    for (let row = 0; row < 3; row++) {
      if (board[row][0] === board[row][1] && board[row][0] === board[row][2] && board[row][0] !== '') {
        return board[row][0];
      }
    }
  
    // Check columns
    for (let col = 0; col < 3; col++) {
      if (board[0][col] === board[1][col] && board[0][col] === board[2][col] && board[0][col] !== '') {
        return board[0][col];
      }
    }
  
    // Check diagonals
    if (board[0][0] === board[1][1] && board[0][0] === board[2][2] && board[0][0] !== '') {
      return board[0][0];
    }
    if (board[0][2] === board[1][1] && board[0][2] === board[2][0] && board[0][2] !== '') {
      return board[0][2];
    }
  
    return '';
  }
  
  function isBoardFull(board: string[][]): boolean {
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if (board[row][col] === '') {
          return false;
        }
      }
    }
    return true;
  }