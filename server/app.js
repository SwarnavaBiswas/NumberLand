import express from "express";
import bodyParser from "body-parser";
import WebSocket, { WebSocketServer } from "ws";

const app = express();
const WS_PORT = 8080;
const PORT = process.env.PORT || 3000;
const status = { page: "land", username: "" };
/*
    {
        page:   land,
                allPlayers,
                game
    }
*/

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("build"));

// app.get("/", (req, res) => {
//     res.sendFile("index.html");
// });
// app.get("/api/status", (req, res) => {
//     // setTimeout(() => {
//     //     res.send(status);
//     // }, 1000);
//     res.send(status);
// });
// app.get("/allPlayers", (req, res) => {
//     status.page = "allPlayers";
//     // res.sendFile("/index.html");
//     console.log(status);
//     res.sendStatus(200);
// });
// app.post("/entry", (req, res) => {
//     // req.
//     status.username = req.body.username;
//     console.log("Here in entry");
//     res.redirect("/allPlayers");
// });

// app.listen(PORT, (req, res) => {
//   console.log("Server started!");
// });

const wss = new WebSocketServer({ port: WS_PORT });
const nameToClient = {};
const nameToStatus = {};

function sendClientList(client){
    if (client.readyState === WebSocket.OPEN && client.status !== "game") {
        client.send(
          JSON.stringify({
            type: "clientList",
            clientList: nameToStatus,
          })
        );
      }
}
function sendClientListAll(wss, ws) {
  wss.clients.forEach(function each(client) {
    // if (client.readyState === WebSocket.OPEN && client.status !== "game") {
    //   client.send(
    //     JSON.stringify({
    //       type: "clientList",
    //       clientList: nameToStatus,
    //     })
    //   );
    // }
    sendClientList(client);
  });
}
wss.on("connection", function connection(ws, req) {
  ws.on("error", console.error);
  ws.username = "";
  ws.page = "land";
  ws.status = "wait";
  console.log(wss.clients.size);
  /*
        page: {land, main, game}
        status: {wait, standby, challenge, game}
    */
   sendClientList(ws);
   console.log(nameToStatus);

  ws.on("message", function message(data, isBinary) {
    const clientData = JSON.parse(data.toString());
    console.log(clientData);
    switch (clientData.type) {
      case "setUsername":
        ws.username = clientData.username;
        ws.status = "standby";
        ws.page = "main";
        nameToClient[clientData.username] = ws;
        nameToStatus[clientData.username] = ws.status;
        ws.send(
          JSON.stringify({
            type: "setUsernameAcknowledge",
            username: ws.username,
          })
        );
        break;
      case "setUsernameAcknowledge":
        // wss.clients.forEach(function each(client) {
        //   if (
        //     ws !== client &&
        //     client.readyState === WebSocket.OPEN &&
        //     client.status !== "game"
        //   ) {
        //     client.send(
        //       JSON.stringify({ type: "newJoin", clientCount: wss.clients.size })
        //     );
        //   }
        // });
        // Send list of online usernames with challenges
        // ...
        // wss.clients.forEach(function each(client) {
        //   if (
        //     client.readyState === WebSocket.OPEN &&
        //     client.status !== "game"
        //   ) {
        //     client.send(
        //       JSON.stringify({ type: "clientList", clientList: nameToStatus })
        //     );
        //   }
        // });
        sendClientListAll(wss, ws);
        break;
      case "getUsername":
        ws.send(JSON.stringify({ type: "username", username: ws.username }));
        break;
      case "action":
        switch (clientData.command) {
          case "setChallenge":
            ws.status = "challenge";
            nameToStatus[ws.username] = ws.status;
            // Send list of online usernames with challenges
            // ...
            // wss.clients.forEach(function each(client) {
            //   if (
            //     client.readyState === WebSocket.OPEN &&
            //     client.status !== "game"
            //   ) {
            //     client.send(
            //       JSON.stringify({
            //         type: "clientList",
            //         clientList: nameToStatus,
            //       })
            //     );
            //   }
            // });
            sendClientListAll(wss, ws);
            break;
          case "acceptChallenge":
            // Work left
            break;
          case "setStandby":
            ws.status = "standby";
            nameToStatus[ws.username] = ws.status;
            // Send list of challenges
            // ...
            // wss.clients.forEach(function each(client) {
            //   if (
            //     client.readyState === WebSocket.OPEN &&
            //     client.status !== "game"
            //   ) {
            //     client.send(
            //       JSON.stringify({
            //         type: "clientList",
            //         clientList: nameToStatus,
            //       })
            //     );
            //   }
            // });
            sendClientListAll(wss, ws);
            break;
        }
        break;
      case "game":
        const opponent = ws.opponent;
        opponent.send(
          JSON.stringify({ type: "gameMove", move: clientData.move })
        );
        // Work left
        break;
    }

    // wss.clients.forEach(function each(client) {
    //     if(ws !== client && client.readyState === WebSocket.OPEN){
    //         client.send(data, {binary: isBinary});
    //     }
    // });

    console.log(wss.clients.size);
  });
  ws.on("close", () => {
    if(ws.status !== "wait"){
        delete nameToClient[ws.username];
        delete nameToStatus[ws.username];
    }
    wss.clients.delete(ws);
    console.log(wss.clients.size);
    sendClientListAll(wss, ws);
  });
});
