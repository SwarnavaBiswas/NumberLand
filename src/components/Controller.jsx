import React, {useEffect, useState} from 'react'
import Board from './Board';
import { Queue } from '@datastructures-js/queue';

/*
    props: {
        width, 
        height
    }
*/
function Controller(props) {
    
    const timeDelay = 500;
    const propagateValue = 4;
    const {width, height} = props;
    // const currentPlayer = 1;
    const [currentPlayer, setCurrentPlayer] = useState(1);
    
    let initialBoard = [];
    const rows = 7;
    const cols = 7;
    // States:
    const [isActive, setActive] = useState(true);
    const [boardMatrix, setBoardMatrix] = useState(initialBoard);
    useEffect(() => {
        for(let i=0; i<rows; i++){
            let row = [];
            for(let j=0; j<cols; j++){
                row.push({value: 0, player: 0});
            }
            initialBoard.push(row);
        }
        initialBoard[rows-2][1] = {value: 1, player: 1};
        initialBoard[1][cols-2] = {value: 1, player: 2};
        
        // Test Code:
        // for(let i=0; i<5; i++){
        //     for(let j=0; j<5; j++){
        //         initialBoard[i][j] = {value: 3, player: 1};
        //     }
        // }
        setBoardMatrix(initialBoard);
    }, []);

    function setNewBoard(newBoard){
        setBoardMatrix(newBoard);
    }
    // function propagateOnce(queue, newBoard, player){
    //     let size = queue.size();
    //     console.log(size, queue);
    //     if(size === 0) return false;
    //     for(let i=0; i<size; i++){
    //         const {x, y} = queue.front();
    //         queue.pop();
    //         if(newBoard[x][y].value < propagateValue) continue;
    //         // newBoardForPass[x][y].value++;
    //         let dx = [-1, 0, 1, 0];
    //         let dy = [0, -1, 0, 1];
    //         let toAdd = Math.trunc(newBoard[x][y].value / propagateValue);
    //         let remainder = newBoard[x][y].value - toAdd * propagateValue;
    //         newBoard[x][y].value = remainder;
    //         if(remainder === 0) newBoard[x][y].player = 0;
    //         for(let i=0; i<4; i++){
    //             let new_x = x + dx[i];
    //             let new_y = y + dy[i];
    //             if(new_x < 0 || new_y < 0 || new_x >= rows || new_y >= cols) continue;
    //             let playerAtBox = newBoard[new_x][new_y].player;
    //             if(playerAtBox === 0){
    //                 newBoard[new_x][new_y].value = toAdd;
    //                 newBoard[new_x][new_y].player = player;
    //             }
    //             else if(player === playerAtBox){
    //                 newBoard[new_x][new_y].value += toAdd;
    //             }
    //             else{
    //                 if(toAdd > newBoard[new_x][new_y].value){
    //                     newBoard[new_x][new_y].value = toAdd - newBoard[new_x][new_y].value;
    //                     newBoard[new_x][new_y].player = player;
    //                 } else if(toAdd < newBoard[new_x][new_y].value){
    //                     newBoard[new_x][new_y].value = newBoard[new_x][new_y].value - toAdd;
    //                 } else{
    //                     newBoard[new_x][new_y].value = 0;
    //                     newBoard[new_x][new_y].player = 0;
    //                 }
    //             }

    //             if(newBoard[new_x][new_y].value < propagateValue) continue;
    //             queue.push({x: new_x, y: new_y});
    //         }
    //     }
    //     return true;
    //     // setBoardMatrix(newBoard);
    // }
    async function propagate(X, Y){
        let queue = new Queue();
        // Apply BFS
        let player = boardMatrix[X][Y].player;

        // const newBoardForPass = boardMatrix;
        // const newBoard = boardMatrix.slice();
        const newBoard = boardMatrix.map((row) => row.slice());
        newBoard[X][Y].value++;
        if(newBoard[X][Y].value >= propagateValue){
            queue.push({x: X, y: Y});
        }
        // setInterval(() => {
        //     setNewBoard(newBoard);
        //     const status = propagateOnce(queue, newBoard, player);
        // }, timeDelay);
        const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
        while(!queue.isEmpty()){
            let size = queue.size();
            for(let i=0; i<size; i++){
                const {x, y} = queue.front();
                queue.pop();
                // newBoardForPass[x][y].value++;
                let dx = [-1, 0, 1, 0];
                let dy = [0, -1, 0, 1];
                let toAdd = Math.trunc(newBoard[x][y].value / propagateValue);
                let remainder = newBoard[x][y].value - toAdd * propagateValue;
                newBoard[x][y].value = remainder;
                if(remainder === 0) newBoard[x][y].player = 0;
                for(let i=0; i<4; i++){
                    let new_x = x + dx[i];
                    let new_y = y + dy[i];
                    if(new_x < 0 || new_y < 0 || new_x >= rows || new_y >= cols) continue;
                    let playerAtBox = newBoard[new_x][new_y].player;
                    if(playerAtBox === 0){
                        newBoard[new_x][new_y].value = toAdd;
                        newBoard[new_x][new_y].player = player;
                    }
                    else if(player === playerAtBox){
                        newBoard[new_x][new_y].value += toAdd;
                    }
                    else{
                        // if(toAdd > newBoard[new_x][new_y].value){
                        //     newBoard[new_x][new_y].value = toAdd - newBoard[new_x][new_y].value;
                        //     newBoard[new_x][new_y].player = player;
                        // } else if(toAdd < newBoard[new_x][new_y].value){
                        //     newBoard[new_x][new_y].value = newBoard[new_x][new_y].value - toAdd;
                        // } else{
                        //     newBoard[new_x][new_y].value = 0;
                        //     newBoard[new_x][new_y].player = 0;
                        //     // newBoard[new_x][new_y].player = player;
                        // }
                        newBoard[new_x][new_y].value += toAdd;
                        newBoard[new_x][new_y].player = player;
                    }

                    if(newBoard[new_x][new_y].value < propagateValue) continue;
                    queue.push({x: new_x, y: new_y});
                }
            }
            setBoardMatrix([...newBoard]);
            await delay(timeDelay);
        }
        // for(let i=0; i<rows; i++){
        //     for(let j=0; j<cols; j++){
        //         if(newBoard[i][j].value === 0 && newBoard[i][j].player === player) 
        //             newBoard[i][j].value = 1;
        //     }
        // }
        // setBoardMatrix(newBoard);
    }

    async function handleMove(coordinates){
        const {x, y} = coordinates;

        // Handling required here
        setActive(false);
        await propagate(x, y);
        setActive(true);
        setCurrentPlayer((prev) => {
            if(prev === 1) return 2;
            else return 1;
        })
    }

  return (
    <Board
    boardMatrix={boardMatrix} 
    width={width} height={height} 
    currentPlayer={currentPlayer}
    isActive={isActive}
    handleMove={handleMove}></Board>
  )
}

export default Controller;