import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows, ncols, chanceLightStartsOn }) {
  const [board, setBoard] = useState(() => createBoard());
  console.log(hasWon(board))
  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    for(let i = 0; i < nrows; i++){
      const rowArr = [];
      for(let j = 0; j < ncols; j++){
        const isLit = Math.random() <= chanceLightStartsOn;
        rowArr.push(isLit);
      }
      initialBoard.push(rowArr);
    }
    return initialBoard;
  }

  function hasWon() {
    for(let row = 0; row < nrows; row++){
      for(let col = 0; col < ncols; col++){
        console.log(board)
        if(board[row][col] === false){
          return false;
        }
      }
    }
    return true;
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      const newBoard = oldBoard.map(function(arr) {
        return arr.slice();
      });

      // TODO: in the copy, flip this cell and the cells around it
      flipCell(y, x, newBoard)
      flipCell(y - 1, x, newBoard)
      flipCell(y + 1, x, newBoard)
      flipCell(y, x - 1, newBoard)
      flipCell(y, x + 1, newBoard)

      // TODO: return the copy
      return newBoard;
    });
  }

  // if the game is won, just show a winning msg & render nothing else
  if (hasWon()) {
    return <h1>You Won!</h1>
  }
  return (
  <>
    <table>
      <tbody>
        {board.map((row, y) => {
          return <tr key={y}>
            {row.map((cell, x) => {
              return <Cell key={x} flipCellsAroundMe={() => flipCellsAround(`${y}-${x}`)} isLit={board[y][x]} />
            })}
          </tr>
        })}
      </tbody>
    </table>
  </>
  )


  // TODO

  // make table board


  // TODO
}

export default Board;
