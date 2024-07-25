import React from 'react';
import '../css/challengeUnit.css'

function ChallengeUnit(props) {
    const {index, challenger, isPlayer} = props;
    let classNames = {
        'challengeUnit': true,
        'currentPlayer': isPlayer
    }
    let classes = Object.keys(classNames).filter((key) => classNames[key]).join(' ');
  return (
    <div className={classes}>
        <div className='challengeIndex'>
            {/* Apply some symbol here */}
        </div>
        <div className='challenger'>{challenger}</div>
    </div>
  )
}

export default ChallengeUnit;