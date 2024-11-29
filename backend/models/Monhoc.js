const mongoose = require("mongoose");

const monhocSchema = mongoose.Schema({
      maNganh: { type: String }, 
      tenmonhoc: {
            type: String,
      },
      sotinchi: {
            type: Number,
      }
      },{timestamps: true}
)
module.exports = mongoose.model("Monhoc" , monhocSchema);


