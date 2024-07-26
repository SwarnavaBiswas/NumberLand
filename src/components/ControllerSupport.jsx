import React, { useEffect, useState } from 'react';
import Controller from './Controller';
import Button from './Button';

function ControllerSupport(props) {
    const {width, height, socketData, socket, username, setStatus} = props;
    const [playerNumber, setPlayerNumber] = useState(0);
    const [opponentName, setOpponentName] = useState("");
    const [aidMessage, setAidMessage] = useState({});
    const [result, setResult] = useState("");
    const player1Color = "blue";
    const player2Color = "pink";
    const rows = 7;
    const cols = 7;
    useEffect(() => {
        if(socketData.type === "paired"){
            setPlayerNumber(socketData.playerNumber);
            setOpponentName(socketData.opponent);
            setAidMessage({type: "initial"});
            setResult("ongoing");
            // aid message acts as buffer from ControllerSupport to Controller
            if(username !== socketData.username){
                console.error("Something went wrong!");
            }
        }
        if(socketData.type === "gameMove"){
            setAidMessage({type: 'move', move: socketData.move, result: socketData.result});
        }
        if(socketData.type === "gotoMainAcknowledge"){
            setStatus({type: "gotoMainAcknowledge"});
        }
    }, [socketData]);

    function gameOver(result){
        setResult(result);
    }
    function gotoMain(){
        socket.send(JSON.stringify({
            type: "gotoMain"
        }));
    }
  return (
    <div className='controllerSupport'>
        <div className='opponentDetails' style={{color:(playerNumber === 1)? player2Color: player1Color}}>
            {opponentName}
        </div>
        <Controller width={60} height={60} socketData={socketData} socket={socket} player1Color={player1Color} player2Color={player2Color} rows={rows} cols={cols} playerNumber={playerNumber} aidMessage={aidMessage} gameOver={gameOver}></Controller>
        <div className='playerDetails' style={{color:(playerNumber === 1)? player1Color: player2Color}}>
            {username}
        </div>
        {
            result !== "ongoing" && (
                <div className='postGameDetails'>
                    {
                        (result === ("player" + playerNumber))? (
                            <div className='winnerMessage'>
                                Congratulations! You Won!
                            </div>
                        ) : (
                            <div className='loserMessage'>
                                You Lost! Better Luck next time!
                            </div>
                        )
                    }
                    <Button buttonName={"Return to lobby"} handleButtonClick={gotoMain}></Button>
                </div>
            )
        }
    </div>
  )
}

export default ControllerSupport;