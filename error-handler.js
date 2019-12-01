exports.sendError = (client, e) => {
    client.send(JSON.stringify({type: 'error', text: e.toString()}))
};
