import React from 'react';
import '../css/challengeUnit.css'

function ChallengeUnit(props) {
    const {index, challenger, isPlayer, handleChallengerClick} = props;
    let classNames = {
        'challengeUnit': true,
        'currentPlayer': isPlayer
    }
    let classes = Object.keys(classNames).filter((key) => classNames[key]).join(' ');
    function handleClick(event){
      if(!isPlayer){
        handleChallengerClick(challenger);
      }
      event.preventDefault();
    }
  return (
    <div className={classes} onClick={handleClick}>
        <div className='challengeIndex'>
            {/* Apply some symbol here */}
        </div>
        <div className='challenger'>{challenger}</div>
    </div>
  )
}

export default ChallengeUnit;