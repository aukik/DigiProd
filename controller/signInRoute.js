const express = require("express")
const userData = require("../model/userData")
let router = express.Router()

router.get("/signIn", (req, res) => {
  res.status(223)
  if (req.session.username) return res.redirect("/userHome")

  res.render("signIn", { text: "abc" })
})

router.post("/signIn", async (req, res) => {
  let username = req.body.username
  let password = req.body.password

  const userFound = await userData.findOne({ username: req.body.username })

  if (!userFound) {
    res.render("signIn", {
      message : "Username/Password do not match",
      type    : "danger",
    })
  } else {
    userData.find({ username: username }).then(users => {
      users.forEach(user => {
        if (username === user.username && password === user.password) {
          //initiating session

          req.session.username = user.username

          res.redirect("/userHome")
        } else {
          res.render("signIn", {
            message : "Username/Password do not match",
            type    : "danger",
          })
        }
      })
    })
  }
})
module.exports = router
