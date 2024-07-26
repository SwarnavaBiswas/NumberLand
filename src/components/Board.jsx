import React from 'react';
import BoardRow from './BoardRow';
import '../css/board.css';
/*
    props: {
        boardMatrix:
        [
            [{value, player}, ...]
            ...
        ]
        width, -> cell width
        height, -> cell height
        currentPlayer,
        isActive,
        handleMove(),
    }
 */
function Board(props) {
    const {boardMatrix, width, height, currentPlayer, isActive, handleMove, player1Color, player2Color} = props;
    // const rows = boardMatrix.length;
    // const cols = boardMatrix[0].length;
    // const dimensions = {
    //     width: width + "px",
    //     height: height + "px"
    // }
  return (
    // <div className='board' style={{...dimensions}}>
    <div className='board'>
        {
            boardMatrix.map((boardRow, rowIndex) => {
                return (
                    <BoardRow
                    key={rowIndex}
                    boardRow={boardRow}
                    width={width}
                    height={height}
                    rowIndex={rowIndex}
                    currentPlayer={currentPlayer}
                    isActive={isActive}
                    handleMove={handleMove}
                    player1Color={player1Color}
                    player2Color={player2Color}></BoardRow>
                )
            })
        }
    </div>
  )
}

export default Board;