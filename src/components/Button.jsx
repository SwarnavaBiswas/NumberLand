import React from 'react';

function Button(props) {
    const {buttonName, handleButtonClick} = props;
    function handleClick(){
        handleButtonClick();
    }
  return (
    <div className='buttonGreen'>
        <button onClick={handleClick}>{buttonName}</button>
    </div>
  )
}

export default Button;