const router = require("express").Router()
const db = require("../db")
const uuid = require("uuid/v4")
const sha512 = require("js-sha512")
const jwt = require("jsonwebtoken")
const config = require("config")

router.post("/Login", (req, res, next) => {
  const username = req.body.username
  let password = req.body.password

  db.query(
    "SELECT salt FROM users WHERE username = ?",
    [username],
    (err, results, fields) => {
      if (results.length > 0) {
        password = sha512(password + results[0].salt)

        const sql = `
            SELECT COUNT(1) as count FROM users WHERE username = ? and password = ?
          `
        db.query(sql, [username, password], (err, results, fields) => {
          if (results[0].count > 0) {
            const token = jwt.sign({ username }, config.get("secret"))
            res.json({
              message: "Authenticated",
              token
            })
          } else {
            res.status(401).json({
              message: "Username or Password are incorrect"
            })
          }
        })
      } else {
        res.status(401).json({
          message: "User does not exsit"
        })
      }
    }
  )
})
// router.post("/Login", (req, res, next) => {
//   const token = req.body.token
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
// router.post("/login", function(req, res) {
//   User.findOne({ username: req.body.username }).exec(function(err, user) {
//     if (err) throw err
//     if (!user) {
//       return res.status(404).json({
//         error: true,
//         message: "Username or Password is Wrong"
//       })
//     }
//     bcrypt.compare(req.body.password, user.password, function(err, valid) {
//       if (!valid) {
//         return res.status(404).json({
//           error: true,
//           message: "Username or Password is Wrong"
//         })
//       }

//       var token = utils.generateToken(user)
//       user = utils.getCleanUser(user)
//       res.json({
//         user: user,
//         token: token
//       })
//     })
//   })
// })

module.exports = router
