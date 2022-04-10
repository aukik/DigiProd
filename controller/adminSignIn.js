const express = require("express")
const adminData = require("../model/adminData")

let router = express.Router()
//router
router.get("/adminSignIn", (req, res) => {
  if (req.session.username) return res.redirect("/adminAddProduct")
  console.log(req.session.username)
  res.render("adminSignIn", { text: "abc" })
})

router.post("/adminSignIn", async (req, res) => {
  let username = req.body.username
  let password = req.body.password

  const userFound = await adminData.findOne({ username: req.body.username })
  if (!userFound) {
    res.render("adminSignIn", {
      message : "Username/Password do not match",
      type    : "danger",
    })
  } else {
    adminData.find({ username: username }).then(users => {
      users.forEach(user => {
        if (username === user.username && password === user.password) {
          //initiating session
          req.session.username = user.username
          console.log(req.session.username)
          res.redirect("/adminAddProduct")
        } else {
          res.render("adminSignIn", {
            message : "Username/Password do not match",
            type    : "danger",
          })
        }
      })
    })
  }
})
module.exports = router
