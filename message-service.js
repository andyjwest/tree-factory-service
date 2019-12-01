const validator = require('./validation.js');

exports.processMessage = function processMessage(collection, data) {
    let message = JSON.parse(data);

    if (message.type === 'delete') {
        if (!!message.id) {
            collection.doc(message.id).delete()
                .catch(error => console.error(error));
        } else {
            throw Error('No ID provided for a delete request.');
        }
    } else {
        const errors = validator.validateFactory(message);
        if(errors.length > 0){
            //TODO this needs its own type of error
            throw new Error(errors);
        }

        message.nodes = [];
        const count = Number.parseInt(message.nodeCount);
        Array(count).fill(true)
            .forEach(() => {
                message.nodes.push(Math.floor((Math.random() * message.max) + message.min))
            });
        return collection.add(message)
    }
};

exports.sendToAll = (snapshot, websocketServer) => {
    let array = [];
    snapshot.forEach(doc => {
        array.push({id: doc.id, ...doc.data()});
    });
    websocketServer.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(array));
        }
    });
}
