const express = require("express")

let router = express.Router()

router.get("/userHome", (req, res) => {
  res.status(226)
  if (!req.session.username) return res.redirect("/signIn")

  res.render("userHome", { username: req.session.username })
})
module.exports = router
