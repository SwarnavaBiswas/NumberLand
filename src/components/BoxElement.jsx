import React from 'react';
import '../css/boxElement.css';
import { Textfit } from 'react-textfit';

/*
    props: {
        data,
        width,
        height,
        player,
        index: {x, y},
        currentPlayer,
        isActive,
        handleMove
    }
*/
function BoxElement(props) {
    const {data, width, height, player, index, currentPlayer, isActive, handleMove} = props;
    const player1Color = "blue";
    const player2Color = "pink";
    // const {fontSize, ref} = useFitText();
    const dimensions = {
        width: width + "px",
        height: height + "px"
    };
    const isValid = (currentPlayer === player) && isActive;
    let classNames = {
        'boxElement': true,
        'validBox': isValid
    }
    let classes = Object.keys(classNames).filter((key) => classNames[key]).join(' ');

    function handleClick(){
        if(!isValid) return;
        // handling Code
        handleMove(index);
    }
  return (
    // <div className={"boxElement"} style={{fontSize, ...dimensions, color: color}}>
    <div onClick={handleClick} className={classes} style={{...dimensions, color: (player === 1)? player1Color: player2Color}}>
        <Textfit className='textfit'>
            {data}
        </Textfit>
    </div>
  )
}

export default BoxElement;
