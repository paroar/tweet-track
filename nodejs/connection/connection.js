var mongoose = require('mongoose');

const options = {
    autoIndex: false, // Don't build indexes
    reconnectTries: 3000, // Retry up to 3000 times
    reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0
  }

const connectWithRetry = () => {
    console.log('MongoDB connection with retry')
    mongoose.connect("mongodb://mongo:27017/twitter", options).then(()=>{
      console.log('MongoDB is connected')
    }).catch(err=>{
      console.log('MongoDB connection unsuccessful, retry after 5 seconds.\n', err)
      setTimeout(connectWithRetry, 5000)
    })
  }
  
module.export = connectWithRetry;