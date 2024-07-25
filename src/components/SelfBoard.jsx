import React from 'react'
import '../css/selfBoard.css';

function SelfBoard(props) {
    const {username} = props;

  return (
    <div className='selfBoard'>
        Welcome {username}!
    </div>
  )
}

export default SelfBoard;