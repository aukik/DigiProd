const mongoose = require("mongoose")

const cartSchema = new mongoose.Schema({
  prodId : {
    type     : String,
    required : true,
  },
  userId : {
    type     : String,
    required : true,
  },
})

const cartData = mongoose.model("cartData", cartSchema)
module.exports = cartData
