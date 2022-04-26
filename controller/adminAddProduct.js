const express = require("express")
const { render } = require("express/lib/response")
const adminData = require("../model/adminData")
const productData = require("../model/productData")
let router = express.Router()
let productName = ""
let prodDetails = []
router.get("/adminAddProduct", async (req, res) => {
  if (!req.session.username) return res.redirect("/adminSignIn")
  else generateAdminAddProduct(req, res)
})
router.post("/adminAddProduct", async (req, res) => {
  if (!req.session.username) return res.redirect("/adminSignIn")
  else {
    const product = new productData({
      name     : req.body.name,
      tag      : req.body.tag,
      price    : req.body.price,
      quantity : req.body.quantity,
      image    : req.body.image,
      category : req.body.category,
    })

    await product.save()
    res.redirect("adminAddProduct")
  }
})

router.post("/update", (req, res) => {
  if (!req.session.username) return res.redirect("/adminSignIn")
  else {
    let prodName = req.body.name.slice(0, -1)
    productName = prodName
    productData.find({ name: prodName }, (err, users) => {
      prodDetails = users
      res.render("updateProductDetails", { data: users[0] })
    })
  }

  // res.redirect("updateProductDetails")
})
router.post("/updateDetails", async (req, res) => {
  if (!req.session.username) return res.redirect("/adminSignIn")
  else {
    let err = false
    try {
      const product = new productData({
        name     : req.body.name,
        tag      : req.body.tag,
        price    : req.body.price,
        quantity : req.body.quantity,
        image    : req.body.image,
        category : req.body.category,
      })

      await product.save()
    } catch (error) {
      err = true
    }
    if (!err) {
      productData.deleteOne({ name: productName }, function(err) {
        if (err) return res.redirect(adminAddProduct)
        console.log("Successful deletion")
        res.redirect("adminAddProduct")
      })
    } else {
      res.render("updateProductDetails", {
        message : "Fill every fields",
        type    : "danger",
        data    : prodDetails[0],
      })
    }
  }
})
router.post("/delete", (req, res) => {
  if (!req.session.username) return res.redirect("/adminSignIn")
  else {
    productData.deleteOne({ name: productName }, function(err) {
      if (err) return res.redirect(adminAddProduct)
      console.log("Successful deletion")
      res.redirect("adminAddProduct")
    })
  }
})
router.post("/searchAdmin", (req, res) => {
  if (!req.session.username) return res.redirect("/adminSignIn")
  productData
    .find({ $text: { $search: req.body.searchText } })
    .exec(function(err, docs) {
      res.render("adminAddProduct", {
        data : docs,
      })
    })
})
router.post("/filter-g", (req, res) => {
  if (!req.session.username) return res.redirect("/adminSignIn")
  productData
    .find({ $text: { $search: "gift cards" } })
    .exec(function(err, docs) {
      res.render("adminAddProduct", {
        data : docs,
      })
    })
})
router.post("/filter-s", (req, res) => {
  if (!req.session.username) return res.redirect("/adminSignIn")
  productData
    .find({ $text: { $search: "subscriptions" } })
    .exec(function(err, docs) {
      console.log("here")
      console.log(docs)
      res.render("adminAddProduct", {
        data : docs,
      })
    })
})
router.post("/filter-t", (req, res) => {
  if (!req.session.username) return res.redirect("/adminSignIn")
  productData.find({ $text: { $search: "top ups" } }).exec(function(err, docs) {
    console.log("here")
    console.log(docs)
    res.render("adminAddProduct", {
      data : docs,
    })
  })
})
router.post("/filter-c", (req, res) => {
  if (!req.session.username) return res.redirect("/adminSignIn")
  productData.find({ $text: { $search: "cd keys" } }).exec(function(err, docs) {
    console.log("here")
    console.log(docs)
    res.render("adminAddProduct", {
      data : docs,
    })
  })
})
router.post("/filter-o", (req, res) => {
  if (!req.session.username) return res.redirect("/adminSignIn")
  productData.find({ $text: { $search: "others" } }).exec(function(err, docs) {
    console.log("here")
    console.log(docs)
    res.render("adminAddProduct", {
      data : docs,
    })
  })
})

const generateAdminAddProduct = async (req, res) => {
  if (!req.session.username) return res.redirect("/adminSignIn")
  else {
    sessionUsername = req.session.username
    console.log(sessionUsername)
    const adminFound = await adminData.findOne({ username: sessionUsername })
    if (!adminFound) return res.redirect("/adminSignIn")
    else if (!req.session.username) return res.redirect("/adminSignIn")
    else {
      productData.find({}, (err, users) => {
        if (err) return res.redirect(adminAddProduct)
        else res.render("adminAddProduct", { data: users })
      })
    }
  }
}
module.exports = router
