const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
      email: {
            type: String,
            required: true,
            minlength: 10,
            maxlength: 50,
            unique: true
      },
      password: {
            type: String,
            required: true,
      },
      mssv: {
            type: String,
            required: [true, 'MSSV is required'],
            minlength: 10,
            maxlength: 50,
            unique: true
      },
      hoTen: {
            type: String,
            required: true
      },
      khoaHoc: {
            type: String,
            required: true
      },
      lopHoc: {
            type: String,
            required: true
      },
      gioiTinh: {
            type: String,
            enum: ['Nam', 'Nữ'], // Giới hạn giá trị chỉ nhận 'Nam' hoặc 'Nữ'
            required: true
      },
      ngaySinh: {
            type: Date,
            required: true
      },
      bacDaoTao: {
            type: String,
            required: true
      },
      loaiNganhDaoTao: {
            type: String,
            required: true
      },
      noiSinh: {
            type: String,
            required: true
      },
      nganh: {
            type: String,
            required: true
      },
      type: {
            type: String,
            enum: ['Giảng viên', 'Sinh viên'], // Giới hạn giá trị chỉ nhận 'Giảng viên' hoặc 'sinh viên'
            required: true
      },
      admin: {
            type: Boolean,
            default: false
      } 
},
      {timestamps: true}
);

module.exports = mongoose.model("User" , userSchema);