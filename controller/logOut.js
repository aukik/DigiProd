const express = require("express")
const adminData = require("../model/adminData")

let router = express.Router()

router.get("/logOut", (req, res) => {
  if (req.session.username)
    return req.session.destroy(err => {
      if (err) {
        return console.log(err)
      }

      res.redirect("/")
    })
  else return res.redirect("/signIn")
})
module.exports = router
