const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
  name     : {
    type     : String,
    required : true,
  },
  tag      : {
    type     : String,
    required : true,
  },
  price    : {
    type     : Number,
    required : true,
  },
  quantity : {
    type     : Number,
    required : true,
  },
  image    : {
    type     : String,
    required : true,
  },
  category : {
    type     : String,
    required : true,
  },
})
productSchema.index({ "$**": "text" })
const productData = mongoose.model("productData", productSchema)

module.exports = productData
