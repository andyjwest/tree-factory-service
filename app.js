const serverPort = 8080;
const http = require("http");
const app = require("express")();
const server = http.createServer(app);
const WebSocket = require("ws");
const websocketServer = new WebSocket.Server({server});
const Firestore = require('@google-cloud/firestore');
const messageService = require('./message-service');
const errorHandler = require('./error-handler');

const db = new Firestore({
    projectId: 'tree-factory-260112',
    keyFilename: '/Users/awest/Documents/personal/tree-factory-c6e2671abf90.json',
});

const collection = db.collection('factories');

websocketServer.on('connection', function connection(ws) {

    collection.get()
        .then((snapshot)=> messageService.sendToAll(snapshot, websocketServer))
        .catch((err) => {
            console.log('Error getting documents', err);
        });

    ws.on('message', data => {
        try{
            messageService.processMessage(collection, data);
        }catch (e) {
            errorHandler.sendError(ws, e);
        }
    });
});

collection.onSnapshot((snapshot)=> messageService.sendToAll(snapshot, websocketServer), err => {
    console.log(`Encountered error: ${err}`);
});

server.listen(serverPort, () => {
    console.log(`Websocket server started on port ` + serverPort);
});
