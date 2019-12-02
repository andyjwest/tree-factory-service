const serverPort = 8080;
const http = require('http');
const app = require('express')();
const server = http.createServer(app);
const io = require('socket.io')(server);
const service = require('./service');
const factoryRepo = require('./factory-repo');
const ValidationError = require('./ValidationError');

io.origins((origin, callback) => {
  if (process.env.ALLOWED_ORIGIN) {
    return callback(null, true);
  }
  console.warn(`someone is coming in from ${origin}`);
  return callback('origin not allowed', false);
});

factoryRepo.initializeDBChangeListener(
    (data) => io.emit('factories updated', data));

io.on('connection', function(socket) {
  //Build a function to handle our errors
  const handleError = e => {
    if (e instanceof ValidationError) {
      socket.emit('validation errors', e.validationErrors);
    } else {
      socket.emit('server error', e);
    }
  };

  //Send all the data to the socket once it connects
  factoryRepo.getAll().
      then(factories => socket.emit('factories updated', factories)).
      catch(handleError);

  socket.on('delete factory', (data) =>
      factoryRepo.deleteFactoryById(data.id).catch(handleError));

  socket.on('add factory', data => service.addFactory(data).catch(handleError));

  socket.on('update factory',
      data => service.updateFactory(data).catch(handleError));

});

server.listen(serverPort, () => {
  console.log(`Websocket server started on port ` + serverPort);
});
