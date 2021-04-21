// const users = require("../data/users")
let connections = require("../sql/connections");
const newUsers = require("../data/sampleUser");
const mysql = require("mysql")

let listUsers = (req, res) => {
  console.log("inside the listUsers")
  connections.query("SELECT * FROM users", function (error, rows) {
    if (error) {
      res.json('fail to get users')
    } else {
      res.json(rows);
    }
  })
  // res.json(users);
}
// GET// LIST the Table 
let showUser = (req, res) => {
  console.log("Inside the GET function", req.params)
  let id = req.params.id
  let sql = "SELECT id, username FROM users WHERE id =?"
  //make a connection to send the query
  connections.query(sql, [id], function (error, rows) {
    console.log("ROWS:", rows)
    if (error) {
      // if we get an error from the db
      console.error("Failed to query the db", error);
      //send error 500
      res.sendStatus(500);
    } else if (!rows || rows.length == 0) {
      // if we get no rows from the database
      res.sendStatus(404);
    } else {
      res.send(rows[0]);
    }
  })
  // const found = users.some(user => user._id == req.params.id)
  // if (found) {
  //   res.send(users.filter(user => user._id == req.params.id))
  // } else {
  //   res.status(404).json({ msg: `user ${req.params.id}not found` })
  // }
}

// POST// CREATE
let createUser = (req, res) => {
  console.log("Inside the POST function", req.body)

 let username = req.body.username
 let sql = `INSERT INTO users (username) VALUES (?)`
//  sql = mysql.format (sql, [`${username}`])
  //make a connection to send the query
  connections.query(sql, [`${username}`], (error, results) => {
    if (error) {
      //return fail
      throw error
    } else {
      return res.json({ newId: results.insertId });
    }
  })
}
// const newUser = {
// _id: req.body._id,
// username: req.body.username,
// UPDATE users

//pushing the newUsers to the users data/object or (table)
// users.push(newUser);
//responding from the users data/object
// I want to see new user in array of objects table
// res.json(users);


// PUT // UPDATE
let updateUser = (req, res) => {
  console.log("Inside the PUT function", req.params)
  let id = req.params.id
  let username = req.body.username

  let sql = `UPDATE users SET username = ? WHERE id = ${id}`
  // sql = mysql.format (sql, [`${username}`])
  connections.query(sql, [`${username}`], (error, rows) => {
    // error handling 
    // error === server problem type error 
    if (error) {
      // if we get an error from the db
      console.error("Failed to query the db", error);
      //send error 500
      res.sendStatus(500);
      //if rows === null or undefined || affectedrows === 0, could not find user id to update  
    } else if (!rows || rows.length == 0) {
      // if we get no rows from the database
      res.sendStatus(404);
    } else {
      res.send(rows[0]);
    }
  })
  }

  // first have to find the current user in the database to match up the correct user to update 
  //find the current user
  // const found = users.some(user => user._id == req.params.id)
  // if (found) {
  //   const updateThis = users.filter(user => user.id == req.params.id)
  //   updateThis[0].id = req.body.id
  //   updateThis[0].body = req.body.body;
  //   updateThis[0].postId = req.body.postId;
  //   updatThis[0].name = req.body.name

  //   const updateUser = {
  //     id: req.params.id,
  //     name: req.body.name,
  //     body: req.body.body.body,
  //     postId: req.body.postId
  //   }
  //   updateThis.push(updateUser)
  // } else {
  //   res.status(404).json({ msg: `user ${req.params.id}not found` })
  // }



let deleteUser = (req, res) => {
  console.log("Inside the DELETE function", req.params)

  let id = req.params.id
  let sql = "DELETE FROM users WHERE id =?"
  connections.query(sql, [id], function (error, rows) {
    if (error) {
      // if we get an error from the db
      console.error("Failed to query the db", error);
      //send error 500
      res.sendStatus(500);
    } else if (!rows || rows.affectedRows == 0) {
      // if we get no rows from the database
      res.sendStatus(404);
    } else {
      res.send(rows[0]);
    }
  })

  // const found = users.some(user => user.id == parseInt(req.params.id))
  // if (found) {
  //   res.json({
  //     msg: 'user deleted',
  //     users: users.filter(user => user.id !== parseInt(req.params.id))
  //   })
  // } else {
  //   res.status(404).json({ msg: `user id ${req.params.id} not found` })
  // }

}


module.exports = {
  listUsers,
  showUser,
  createUser,
  updateUser,
  deleteUser
}