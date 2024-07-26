import React, { useEffect, useState } from "react";
import Board from "./Board";
import { Queue } from "@datastructures-js/queue";

/*
    props: {
        width, 
        height
    }
*/
function Controller(props) {
  const timeDelay = 500;
  const propagateValue = 4;
  const {
    width,
    height,
    player1Color,
    player2Color,
    rows,
    cols,
    socketData,
    socket,
    playerNumber,
    aidMessage,
    gameOver,
  } = props;
  // const currentPlayer = 1;
  // const [currentPlayer, setCurrentPlayer] = useState(1);

  // States:
  const [isActive, setActive] = useState(true);
  const [boardMatrix, setBoardMatrix] = useState([]);
  const [whoseMove, setWhoseMove] = useState(0);
  useEffect(() => {
    if (aidMessage.type === "initial") {
      let initialBoard = [];
      for (let i = 0; i < rows; i++) {
        let row = [];
        for (let j = 0; j < cols; j++) {
          row.push({ value: 0, player: 0 });
        }
        initialBoard.push(row);
      }
      initialBoard[rows - 2][1] = { value: 1, player: 1 };
      initialBoard[1][cols - 2] = { value: 1, player: 2 };

      // Test Code:
      // for(let i=0; i<5; i++){
      //     for(let j=0; j<5; j++){
      //         initialBoard[i][j] = {value: 3, player: 1};
      //     }
      // }
      setBoardMatrix(initialBoard);
      setWhoseMove(1);
      if (playerNumber === 1) {
        setActive(true);
      } else {
        setActive(false);
      }
    } else if (aidMessage.type === "move") {
      const move = aidMessage.move;
      const result = aidMessage.result;
      handleMoveFromOpponentAndResult(move, result);
    }
  }, [aidMessage]);

  function setNewBoard(newBoard) {
    setBoardMatrix(newBoard);
  }

  async function propagate(X, Y) {
    let queue = new Queue();
    let player = boardMatrix[X][Y].player;
    const newBoard = boardMatrix.map((row) => row.slice()); // Create a deep copy of the board
    newBoard[X][Y].value++;

    if (newBoard[X][Y].value >= propagateValue) {
      queue.push({ x: X, y: Y });
    }

    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    while (!queue.isEmpty()) {
      const size = queue.size();
      for (let i = 0; i < size; i++) {
        const { x, y } = queue.front();
        queue.pop();

        let dx = [-1, 0, 1, 0];
        let dy = [0, -1, 0, 1];
        let toAdd = Math.trunc(newBoard[x][y].value / propagateValue);
        let remainder = newBoard[x][y].value - toAdd * propagateValue;
        newBoard[x][y].value = remainder;
        if (remainder === 0) newBoard[x][y].player = 0;

        for (let j = 0; j < 4; j++) {
          let new_x = x + dx[j];
          let new_y = y + dy[j];
          if (new_x < 0 || new_y < 0 || new_x >= rows || new_y >= cols)
            continue;
          let playerAtBox = newBoard[new_x][new_y].player;
          if (playerAtBox === 0) {
            newBoard[new_x][new_y].value = toAdd;
            newBoard[new_x][new_y].player = player;
          } else if (player === playerAtBox) {
            newBoard[new_x][new_y].value += toAdd;
          } else {
            newBoard[new_x][new_y].value += toAdd;
            newBoard[new_x][new_y].player = player;
          }

          if (newBoard[new_x][new_y].value >= propagateValue) {
            queue.push({ x: new_x, y: new_y });
          }
        }
      }

      // Update the board state after processing the current level of propagation
      setBoardMatrix([...newBoard]); // Ensure immutability for React state update

      // Wait for the specified delay
      await delay(timeDelay);
    }
  }
  function checkResult() {
    let isPlayer1Present = false;
    let isPlayer2Present = false;
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (boardMatrix[i][j].player === 1) isPlayer1Present = true;
        else if (boardMatrix[i][j].player === 2) isPlayer2Present = true;
      }
    }
    let result = "ongoing";
    if (!isPlayer1Present) {
      result = "player2";
    } else if (!isPlayer2Present) {
      result = "player1";
    }
    return result;
  }
  function sendMessageBackToServer(coordinates, result) {
    socket.send(
      JSON.stringify({
        type: "game",
        move: coordinates,
        result: result,
      })
    );
  }
  async function handleMoveFromOpponentAndResult(coordinates, result) {
    const { x, y } = coordinates;
    await propagate(x, y);
    if (result !== "ongoing") {
      gameOver(result);
    } else {
      setActive(true);
    }
  }
  async function handleMove(coordinates) {
    const { x, y } = coordinates;

    // Handling required here
    setActive(false);
    await propagate(x, y);
    const result = checkResult();
    sendMessageBackToServer(coordinates, result);
    if (result !== "ongoing") {
      gameOver(result);
    }
    // setActive(true);
    // setCurrentPlayer((prev) => {
    //     if(prev === 1) return 2;
    //     else return 1;
    // })
  }

  return (
    <Board
      boardMatrix={boardMatrix}
      width={width}
      height={height}
      currentPlayer={playerNumber}
      isActive={isActive}
      handleMove={handleMove}
      player1Color={player1Color}
      player2Color={player2Color}
    ></Board>
  );
}

export default Controller;
