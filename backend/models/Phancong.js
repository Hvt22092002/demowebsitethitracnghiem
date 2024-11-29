const mongoose = require("mongoose");

const phancongSchema = mongoose.Schema({
      mamonhoc: {
            type: String,
      },
      mssv: {
            type: String
      },
      lop:{
            type: String
      }
})

module.exports = mongoose.model("Phancong", phancongSchema);


