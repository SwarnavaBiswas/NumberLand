import React from 'react';
import Controller from "./Controller";
import Landing from "./Landing";
import Main from "./Main";

function Redirector(props) {
    const {pageStatus, updatePage, socketData, socket, setStatus, username} = props;
    switch(pageStatus){
        case "land":
          return (
            <div>
              <Landing socketData={socketData} socket={socket} setStatus={setStatus}></Landing>
              {/* <Landing updatePage={updatePage} socketData={socketData} socket={socket}></Landing> */}
            </div>
          );
          break;
        case "main":
          return (
            <div>
              <Main socketData={socketData} socket={socket} username={username}></Main>
              {/* <Main updatePage={updatePage} socketData={socketData} socket={socket}></Main> */}
            </div>
          );
        case "game":
          return (
            <div>
              <Controller updatePage={updatePage} width={60} height={60} socketData={socketData} socket={socket}></Controller>
            </div>
          );
          break;
        default:
          return (
            <div>
              ERROR!
            </div>
          );
    }
}

export default Redirector;