const express = require("express")
const productData = require("../model/productData")
const cartData = require("../model/cartData")
const userData = require("../model/userData")
const orderData = require("../model/orderData")

let router = express.Router()

//checkout page
router.post("/checkOut", (req, res) => {
  if (!req.session.username) return res.redirect("/signIn")
  userData.findOne({ username: req.session.username }, async (err, users) => {
    try {
      res.render("checkOut", {
        username : req.session.username,
        price    : req.body.price,
        userData : users,
      })
    } catch (error) {
      console.log(error)
    }
  })
})
router.post("/submitCheckout", async (req, res) => {
  if (!req.session.username) return res.redirect("/signIn")
  const listProd = []
  let new_error = false
  userData.findOne({ username: req.session.username }, async (err, users) => {
    cartData.find({ userId: users.id }, async (err, carts) => {
      for (let i = 0; i < carts.length; i++) {
        const doc = await productData.findById(carts[i].prodId)

        listProd.push(doc)
      }

      userData.findOne(
        { username: req.session.username },
        async (err, users) => {
          try {
            const order = new orderData({
              username : req.session.username,
              name     : req.body.name,
              email    : req.body.email,
              phone    : req.body.phone,
              payment  : req.body.payment,
              products : getUnique(listProd),
            })
            //Thank you for purchasing our products. Your digital code will be sent to you soon via email.
            await order.save()
          } catch (error) {
            console.log("ggwp")

            return res.render("checkOut", {
              username : req.session.username,
              price    : req.body.price,
              userData : users,
              message  : "Fill All Fields",
              type     : "danger",
            })
          }
        }
      )

      cartData.deleteMany({ userId: users.id }, err => {
        console.log("notDeleted")
      })
      return res.render("orderConfirm", { username: req.session.username })
    })
  })
})

router.get("/cart", (req, res) => {
  const listProd = []
  if (!req.session.username) return res.redirect("/signIn")

  userData.findOne({ username: req.session.username }, async (err, users) => {
    cartData.find({ userId: users.id }, async (err, carts) => {
      for (let i = 0; i < carts.length; i++) {
        const doc = await productData.findById(carts[i].prodId)

        listProd.push(doc)
      }

      res.render("cart", {
        username : req.session.username,
        cart     : getUnique(listProd),
      })
    })
  })
})
router.post("/refreshCart", (req, res) => {
  userData.findOne({ username: req.session.username }, async (err, users) => {
    cartData.deleteMany({ userId: users.id }, err => {
      console.log("notDeleted")
    })
  })

  res.redirect("cart")
})

//get unique list of products
getUnique = array => {
  let unique = []
  for (let i = 0; i < array.length; i++) {
    array[i].quantity = 1
  }
  let i = 0

  while (i < array.length) {
    let j = i + 1
    while (j < array.length) {
      if (array[i].id == array[j].id) {
        array.splice(j, 1)
        array[i].quantity += 1
      } else {
        j += 1
      }
    }
    i += 1
  }

  return array
}
module.exports = router
