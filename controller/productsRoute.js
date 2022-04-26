const express = require("express")
const productData = require("../model/productData")
const cartData = require("../model/cartData")
const userData = require("../model/userData")
let router = express.Router()

router.get("/products", (req, res) => {
  if (!req.session.username) return res.redirect("/signIn")
  productData.find({}, function(err, users) {
    res.render("products", { data: users, username: req.session.username })
  })
})
router.post("/search", (req, res) => {
  console.log(req.body.searchText)
  if (!req.session.username) return res.redirect("/signIn")
  productData
    .find({ $text: { $search: req.body.searchText } })
    .exec(function(err, docs) {
      res.render("products", { data: docs, username: req.session.username })
    })
})

router.post("/filter-gp", (req, res) => {
  if (!req.session.username) return res.redirect("/signIn")
  productData
    .find({ $text: { $search: "gift cards" } })
    .exec(function(err, docs) {
      console.log("here")
      console.log(docs)
      res.render("products", {
        data     : docs,
        username : req.session.username,
      })
    })
})
router.post("/filter-sp", (req, res) => {
  if (!req.session.username) return res.redirect("/signIn")
  productData
    .find({ $text: { $search: "subscriptions" } })
    .exec(function(err, docs) {
      console.log("here")
      console.log(docs)
      res.render("products", {
        data     : docs,
        username : req.session.username,
      })
    })
})
router.post("/filter-tp", (req, res) => {
  if (!req.session.username) return res.redirect("/signIn")
  productData.find({ $text: { $search: "top ups" } }).exec(function(err, docs) {
    console.log("here")
    console.log(docs)
    res.render("products", {
      data     : docs,
      username : req.session.username,
    })
  })
})
router.post("/filter-cp", (req, res) => {
  if (!req.session.username) return res.redirect("/signIn")
  productData.find({ $text: { $search: "cd keys" } }).exec(function(err, docs) {
    console.log("here")
    console.log(docs)
    res.render("products", {
      data     : docs,
      username : req.session.username,
    })
  })
})
router.post("/addToCart", async (req, res) => {
  if (!req.session.username) return res.redirect("/signIn")

  const user = await userData.findOne({ username: req.session.username })

  const cart = new cartData({
    userId : user.id,
    prodId : req.body.id,
  })
  await cart.save()

  return res.sendStatus(200)
})
router.post("/filter-op", (req, res) => {
  if (!req.session.username) return res.redirect("/signIn")
  productData.find({ $text: { $search: "others" } }).exec(function(err, docs) {
    console.log("here")
    console.log(docs)
    res.render("products", {
      data     : docs,
      username : req.session.username,
    })
  })
})

module.exports = router
