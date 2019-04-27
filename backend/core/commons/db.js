let mongoose = require('mongoose');
let config = require('../configs/configDev')
class Database {
  constructor() {
    this._connect()
  }
_connect() {
     mongoose.connect(`${config.db.endpoint}/${config.db.dbname}`)
       .then(() => {
         console.log('Database connection successful')
       })
       .catch(err => {
         console.error('Database connection error')
       })
  }
}
module.exports = new Database()