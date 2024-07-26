import React, {useEffect, useState} from 'react'
import SelfBoard from './SelfBoard';
import ChallengeBoard from './ChallengeBoard';
import Button from './Button';
import '../css/main.css';

function Main(props) {
    // const [username, setUsername] = useState("");
    const {socket, socketData, username, setStatus: setAppStatus} = props;
    const [status, setStatus] = useState("");
    // setStatus here sets the status state
    // setAppStatus comes from App.jsx
    useEffect(() => {
      if(socketData.type === "clientList"){
        const stat = socketData.clientList[username];
        setStatus(stat);
      }
      if(socketData.type === "challengeAcknowledge"){
        setAppStatus({
          type: "challengeAcknowledge",
          playerNumber: socketData.playerNumber
        });
      }
    }, [socketData]);

    function handleButtonClick(){
      if(status === "standby"){
        socket.send(JSON.stringify({type: "action", command: "setChallenge"}));
      } else if(status === "challenge"){
        socket.send(JSON.stringify({type: "action", command: "setStandby"}));
      }
    }
    function handleChallengerClick(challenger){
      const sendData = {
        type: "action",
        command: "acceptChallenge",
        opponent: challenger
      }
      socket.send(JSON.stringify(sendData));
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
        <ChallengeBoard socketData={socketData} username={username} handleChallengerClick={handleChallengerClick}></ChallengeBoard>
      </div>
      <div className='challengeButtonContainer'>
        <Button buttonName={(status === "standby")? "Send Open Challenge!": "Revoke Challenge!"} handleButtonClick={handleButtonClick}></Button>
      </div>
    </div>
  )
}

export default Main;