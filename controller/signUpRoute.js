const express = require("express")
const router = express.Router()
const userData = require("../model/userData")

router.get("/signUp", (req, res) => {
  if (req.session.username) return res.redirect("/userHome")
  else res.render("signUp", { text: "abc" })
})
router.post("/register", async (req, res) => {
  if (req.session.username) return res.redirect("/userHome")

  const userFound = await userData.findOne({ username: req.body.username })

  if (userFound) {
    res.render("signUp", {
      message : "User with that email already exists",
      type    : "danger",
    })
    res.redirect("/signUp")
  } else if (req.body.password != req.body.confirmPassword) {
    res.render("signUp", {
      message : "Passwords doesnt match",
      type    : "danger",
    })
    res.redirect("/signUp")
  } else if (req.body.password != req.body.confirmPassword) {
    res.render("signUp", {
      message : "Passwords doesnt match",
      type    : "danger",
    })
    res.redirect("/signUp")
  } else {
    try {
      const user = new userData({
        username : req.body.username,
        name     : req.body.name,
        email    : req.body.email,
        password : req.body.password,
        email    : req.body.email,
        phone    : req.body.phone,
      })

      await user.save()
      res.redirect("/signIn")
    } catch (error) {
      console.log(error)
      res.render("signUp", {
        message : "Fill all fields",
        type    : "danger",
      })
      res.redirect("/signUp")
      res.redirect("/signUp")
    }
  }
})

module.exports = router
