const mongoose = require("mongoose")

const adminSchema = new mongoose.Schema({
  username : {
    type     : String,
    required : true,
  },
  password : {
    type     : String,
    required : true,
  },
})

const adminData = mongoose.model("adminData", adminSchema)
module.exports = adminData
