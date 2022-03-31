const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({
  username : {
    type     : String,
    required : true,
  },
  name     : {
    type     : String,
    required : true,
  },
  email    : {
    type     : String,
    required : true,
  },
  phone    : {
    type     : String,
    required : true,
  },
  payment  : {
    type     : String,
    required : true,
  },
  products : {
    type     : Array,
    required : true,
  },
})

const orderData = mongoose.model("orderData", orderSchema)
module.exports = orderData
