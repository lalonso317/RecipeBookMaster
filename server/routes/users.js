// const router = require("express").Router()
// const db = require("../db")
// const uuid = require("uuid/v4")
// const sha512 = require("js-sha512")
// const jwt = require("jsonwebtoken")
// const config = require("config")

// router.post("/api/Register", (req, res, next) => {
//   const salt = uuid()
//   const username = req.body.username
//   const email = req.body.email
//   const password = sha512(req.body.password + salt)

//   const sql =
//     "INSERT INTO users (username, email, password, salt) VALUES (?, ?, ?, ?)"

//   db.query(sql, [username, email, password, salt], (err, results, fields) => {
//     if (err) {
//       throw new Error(err)
//     }
//     console.log(results)
//     res.json({
//       message: "User created",
//       results
//     })
//   })
// })

// router.post("/api/Login", (req, res, next) => {
//   const username = req.body.username
//   let password = req.body.password

//   db.query(
//     "SELECT salt FROM users WHERE username = ?",
//     [username],
//     (err, results, fields) => {
//       if (results.length > 0) {
//         password = sha512(password + results[0].salt)

//         const sql = `
//         SELECT COUNT(1) as count FROM users WHERE username = ? and password = ?
//       `
//         db.query(sql, [username, password], (err, results, fields) => {
//           if (results[0].count > 0) {
//             const token = jwt.sign({ username }, config.get("secret"))
//             res.json({
//               message: "Authenticated",
//               token
//             })
//           } else {
//             res.status(401).json({
//               message: "Username or Password are incorrect"
//             })
//           }
//         })
//       } else {
//         res.status(401).json({
//           message: "User does not exsit"
//         })
//       }
//     }
//   )
// })
//

//   jwt.verify(token, config.get("secret"), (err, decoded) => {
//     if (err) {
//       res.status(401).json({
//         message: "Cannot Verify"
//       })
//     } else {
//       res.status(200).json({
//         message: "Verified"
//       })
//     }
//   })
// })

// module.exports = router
