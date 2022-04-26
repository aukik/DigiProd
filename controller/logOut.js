const express = require("express")
const adminData = require("../model/adminData")

let router = express.Router()
//gg

router.get("/logOut", (req, res) => {
  if (req.session.username)
    return req.session.destroy(err => {
      if (err) {
        console.log(err)
        return res.redirect("/signIn")
      }

      res.redirect("/")
    })
  else return res.redirect("/signIn")
})
module.exports = router
