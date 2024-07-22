import React from 'react';
import BoxElement from './BoxElement';
import '../css/boardRow.css';

/*
    props: {
        boardRow: [{value, player}, ...]
        width,
        height,
        rowIndex,
        currentPlayer,
        isActive,
        handleMove,
    }
*/
function BoardRow(props) {
    const {boardRow, width, height, rowIndex, currentPlayer, isActive, handleMove} = props;
  return (
    <div className='boardRow'>
        {
            boardRow.map((boardElement, colIndex) => {
                return (
                    <BoxElement 
                    key={colIndex} 
                    data={(boardElement.value === 0)? ' ': boardElement.value} 
                    width={width} 
                    height={height} 
                    player={boardElement.player}
                    index={{x: rowIndex, y: colIndex}}
                    currentPlayer={currentPlayer}
                    isActive={isActive}
                    handleMove={handleMove}></BoxElement>
                )
            })
        }
    </div>
  )
}

export default BoardRow;