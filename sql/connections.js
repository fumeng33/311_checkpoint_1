// mysql libary to connect to my mysql database 

const mysql = require ('mysql')

class Connection {
  constructor() {
    if (!this.pool) {
      console.log('creating connection..')
      this.pool = mysql.createPool({
        connectionLimit:100,
        host: 'den1.mysql3.gear.host',
        user: 'mfdb1',
        password: 'Yy253po?D!yV',
        database: 'mfdb1'
      })
      return this.pool
    }
    return this.pool
  }
}

const instance = new Connection();

module.exports = instance;