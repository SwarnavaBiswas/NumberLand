import React, { useState, useEffect } from "react";
import Controller from "./Controller";
import Landing from "./Landing";
import Main from "./Main";
import Axios from "axios";
import Redirector from "./Redirector";
import '../css/app.css';

const WS_URL = "ws://localhost:8080/";

function App() {
  const [pageStatus, setPageStatus] = useState("");
  const [socketData, setSocketData] = useState({});
  const [username, setUsername] = useState("");
  const startingPage = "land";
  const [socket, setSocket] = useState({});
  // const getStatus = async() => {
    //   const response = await Axios.get("/api/status")
    // }
  useEffect(() => {
    // let socket = new WebSocket(WS_URL);
    setSocket(new WebSocket(WS_URL));
  }, []);
  socket.onopen = function(event){
    console.log("Socket is open!");
    setPageStatus(startingPage);
  }
  socket.onmessage = function(event){
    console.log(event.data);
    const socketObj = JSON.parse(event.data);
    console.log(socketObj);
    setSocketData(socketObj);
  }
  function setStatus(status){
    console.log(status);
    switch(status.type){
      case "username":
        setUsername(status.username);
        setPageStatus("main");
        socket.send(JSON.stringify({type: "setUsernameAcknowledge"}));
        break;
    }
  }
  // function updatePage(){
  //   fetch("/api/status")
  //   .then((res) => res.json())
  //   .then((data) => {
  //     setPageStatus(data.page);
  //   });

  // }
  // useEffect(() => {
  //   updatePage();
  // }, []);
  return (
    <Redirector pageStatus={pageStatus} socketData={socketData} socket={socket} username={username} setStatus={setStatus}></Redirector>
    // <Redirector pageStatus={pageStatus} updatePage={updatePage} socketData={socketData} socket={socket}></Redirector>
  );
}

export default App;
