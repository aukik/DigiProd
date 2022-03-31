const express = require("express")

const orderData = require("../model/orderData")

let router = express.Router()

router.get("/viewAdminOrder", (req, res) => {
  // if (!req.session.username) return res.redirect("/adminAddProduct")
  console.log(req.session.username)
  orderData.find({}, (err, data) => {
    console.log(data[0].products[0].price)

    res.render("viewAdminOrders", { cart: data, totalPrice: 50 })
  })
})

module.exports = router
