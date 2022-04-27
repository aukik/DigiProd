const express = require("express")
const userData = require("../model/userData")
let router = express.Router()

router.get("/accountDetails", async (req, res) => {
  userName = req.session.username

  if (!req.session.username) return res.redirect("/signIn")
  res.render("accountDetails", { username: userName })
})
router.post("/accountDetails", async (req, res) => {
  userName = req.session.username
  newName = req.body.username
  errorBoolean = false

  if (req.body.testing) {
    userName = "test"
  }

  if (!userName) return res.redirect("/signIn")
  else {
    try {
      const user = new userData({
        username : req.body.username,
        name     : req.body.name,
        email    : req.body.email,
        password : req.body.password,
        phone    : req.body.phone,
      })

      await user.save()
    } catch (err) {
      // console.log(err)
      errorBoolean = true
    }
    if (!errorBoolean) {
      if (req.session.username)
        return req.session.destroy(err => {
          if (err) {
            console.log("err in destroy")
            return res.redirect("/signIn")
          }

          userData.deleteOne({ username: userName }, function(err) {
            if (err) return res.redirect("accountDetails")
            console.log("Successful deletion")
            res.redirect("/signIn")
          })
        })
      else return res.redirect("/signIn")
    } else {
      res.render("accountDetails", {
        username : userName,
        message  : "Fill every fields",
        type     : "danger",
      })
    }
  }
})
module.exports = router
