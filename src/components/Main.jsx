import React, {useEffect, useState} from 'react'
import SelfBoard from './SelfBoard';
import ChallengeBoard from './ChallengeBoard';
import Button from './Button';
import '../css/main.css';

function Main(props) {
    // const [username, setUsername] = useState("");
    const {socket, socketData, username} = props;
    const [status, setStatus] = useState("");
    useEffect(() => {
      if(socketData.type === "clientList"){
        const stat = socketData.clientList[username];
        setStatus(stat);
      }
    }, [socketData]);

    function handleClick(){
      if(status === "standby"){
        socket.send(JSON.stringify({type: "action", command: "setChallenge"}));
      } else if(status === "challenge"){
        socket.send(JSON.stringify({type: "action", command: "setStandby"}));
      }
    }
    // useEffect(() => {
    //     fetch("/api/status")
    //     .then((res) => res.json())
    //     .then((data) => {
    //         setUsername(data.username)
    //     });
    // }, []);
  return (
    <div className='main'>
      <SelfBoard username={username}></SelfBoard>
      <div className='challengeBoardContainer'>
        <ChallengeBoard socketData={socketData} username={username}></ChallengeBoard>
      </div>
      <div className='challengeButtonContainer'>
        <Button buttonName={(status === "standby")? "Send Open Challenge!": "Revoke Challenge!"} handleButtonClick={handleClick}></Button>
      </div>
    </div>
  )
}

export default Main;