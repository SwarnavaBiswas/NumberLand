import React, { useEffect, useState } from 'react';
import Form from './Form';
// import Axios from 'axios';

function Landing(props) {
    const {setStatus, socketData, socket} = props;
    const [disableList, setDisableList] = useState([]);
    /*
      {
        user1: standby
        user2: challenge
        user3: game
        user4: challenge
        usre5: standby
      }
    */
    useEffect(() => {
      if(socketData.type === "clientList"){
        setDisableList(Object.keys(socketData.clientList));
      }
      if(socketData.type === "setUsernameAcknowledge"){
        setStatus({type: "username", username: socketData.username});
      }
    }, [socketData]);
    async function handleSubmit(username){
        // await Axios.post("/entry", {
        //     username: username
        // })
        const sendingData = {
          type: "setUsername",
          username: username
        }
        socket.send(JSON.stringify(sendingData));
        // updatePage();
    }
  return (
    <div>
        <Form detail={"username"} type={"text"} purpose={"entry"} handleSubmit={handleSubmit} disableList={disableList}></Form>
    </div>
  )
}

export default Landing;