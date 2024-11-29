const mongoose = require('mongoose');

const ExamSchema = new mongoose.Schema({
  tenbaithi: { type: String, required: true },  // Tên bài thi
  cauhoi: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],  // Danh sách câu hỏi
  soluong: { type: Number, required: true },  // Số lượng câu hỏi
  thoigian: { type: Number, required: true },  // Thời gian làm bài (phút)
  thoigianbatdau: { type: Date, required: true },  // Thời gian bắt đầu làm bài
  thoigianketthuc: { type: Date, required: true },  // Thời gian kết thúc bài thi
  lopduocgiao: [{type: String}],  // Lớp được giao bài thi
  createdAt: { type: Date, default: Date.now },  // Thời gian tạo bài thi
  xemdiem: {type: Boolean, default: false},
  xembailam: {type: Boolean, default: false},
  daocauhoi: {type: Boolean, default: false},
  daodapan: {type: Boolean, default: false},
});

module.exports = mongoose.model('Exam', ExamSchema);
