// let mongoose = require('mongoose');
// let config = require('../configs/config')

// mongoose.createConnection(uri, { poolSize: 4 });

// const uri = 'mongodb://localhost:27017/test?poolSize=4';
// mongoose.createConnection(uri);


// // class Database {
// //   constructor() {
// //     this._connect()
// //   }
// // _connect() {
// //      mongoose.createConnection(`${config.db.endpoint}/${config.db.dbname}`,{ poolSize: 4 })
// //        .then(() => {
// //          console.log('Database connection successful')
// //        })
// //        .catch(err => {
// //          console.error('Database connection error')
// //        })
// //   }
// // }
// // module.exports = new Database()


//Import the mongoose module
var mongoose = require('mongoose');

//Set up default mongoose connection
var mongoDB = 'mongodb://localhost:27017/quora?poolSize=100';

mongoose.connect(mongoDB, { useNewUrlParser: true });

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));