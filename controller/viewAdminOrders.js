const express = require("express")

const orderData = require("../model/orderData")

let router = express.Router()

router.get("/viewAdminOrder", (req, res) => {
  if (!req.session.username) return res.redirect("/adminAddProduct")

  orderData.find({}, (err, data) => {
    console.log(data)
    res.render("viewAdminOrders", { cart: data, totalPrice: 50 })
  })
})
router.post("/deliverProduct", (req, res) => {
  if (!req.session.username) return res.redirect("/adminAddProduct")
  console.log(req.body.id)
  orderData.deleteMany({ _id: req.body.id }, err => {
    console.log(err)
  })
  res.redirect("viewAdminOrder")
})

module.exports = router
