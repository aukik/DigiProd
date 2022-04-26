const express = require("express")

let router = express.Router()
//router
router.get("/adminLogOut", (req, res) => {
  if (req.session.username)
    return req.session.destroy(err => {
      if (err) {
        console.log(err)
        return res.redirect("/adminSignIn")
      }

      res.redirect("/adminSignIn")
    })
  else return res.redirect("/adminSignIn")
})
module.exports = router
