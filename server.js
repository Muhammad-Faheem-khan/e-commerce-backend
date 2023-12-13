const app = require('./app')
require('dotenv').config();
const server = require('http').createServer(app)
const io = require('./socket.js').initialize(server);
require('./firebase')
io.on('connection', (socket) => {
    console.log('Connection is established', socket.id)
  
    // socket.on('message', (data) => {
    //   console.log(data)
    // })
  })
  

const port = process.env.PORT || 5000;
server.listen(port, () => {
console.log(`Server is running on port ${port}`);
});