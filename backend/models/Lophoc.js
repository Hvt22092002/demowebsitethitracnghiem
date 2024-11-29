const mongoose = require("mongoose");

const lopHocSchema = mongoose.Schema({
      maNganh:{
            type: String,
      },
      lopHoc: {
            type: String,
      },
      khoaHoc:{
            type: String
      },
      nganh:{
            type: String
      }
      },{timestamps: true}
)
module.exports = mongoose.model("Lophoc" , lopHocSchema);