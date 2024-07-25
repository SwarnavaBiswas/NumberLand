import React, { useEffect, useState } from 'react';
import ChallengeUnit from './ChallengeUnit';
import '../css/challengeBoard.css';

function ChallengeBoard(props) {
    const {socketData, username} = props;
    const [challengerList, setChallengerList] = useState([]);
    useEffect(() => {
        if(socketData.type === "clientList"){
            const challengers = Object.keys(socketData.clientList).filter((username) => {
                // return socketData.clientList[username] === "standby";
                return socketData.clientList[username] === "challenge";
            });
            setChallengerList(challengers);
        }
    }, [socketData]);
  return (
    <div className='challengeBoard'>
        <div className='challengeBoardCaption'> Challengers: </div>
        {
            challengerList.map((challenger, index) => {
                console.log(index, challenger);
                return (
                    <ChallengeUnit key={index} index={index} challenger={challenger} isPlayer={challenger === username}></ChallengeUnit>
                )
            })
        }
    </div>
  )
}

export default ChallengeBoard;