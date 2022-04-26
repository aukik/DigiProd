const express = require("express")
const path = require("path")
const bodyParser = require("body-parser")

//gg
const session = require("express-session")
const app = express()

app.use(
  session({
    secret            : "3CWF-rrZ3-WRxAQ378",
    resave            : true,
    saveUninitialized : true,
  })
)

app.use(
  bodyParser.urlencoded({
    extended : true,
  })
)

app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, "/public")))
app.use(express.json())
app.use(express.urlencoded())

app.set("view engine", "ejs")

app.get("/", (req, res) => {
  res.status(225)
  if (req.session.username) return res.redirect("/userHome")

  res.render("home", { text: "abc" })
})

//Routing
app.use(require("./signInRoute"))
app.use(require("./signUpRoute"))
app.use(require("./productsRoute"))
app.use(require("./accountDetailsRoute"))
app.use(require("./cartRoute"))
app.use(require("./userHomeRoute"))
app.use(require("./logOut"))
app.use(require("./adminSignIn"))
app.use(require("./adminAddProduct"))
app.use(require("./adminLogOut"))
app.use(require("./viewAdminOrders"))

module.exports = app
