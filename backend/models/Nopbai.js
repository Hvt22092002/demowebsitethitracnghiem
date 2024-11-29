const mongoose = require('mongoose');

const DapanSchema = new mongoose.Schema({
  text: { type: String, required: true },
  isCorrect: { type: Boolean, default: false }
});

const CauhoiSchema = new mongoose.Schema({
  noidung: { type: String, required: true },
  dapan: [DapanSchema],  // Danh sách đáp án
  loaicauhoi: { type: String, required: true },  // Loại câu hỏi
  mucdo: { type: String, required: true }  // Mức độ
});

const NopbaiSchema = new mongoose.Schema({
  idexam: { type: String, required: true },  // Tên bài thi hoặc mã bài thi
  cauhoi: [CauhoiSchema],  // Danh sách câu hỏi với các chi tiết câu hỏi
  userId: { type: String, required: true }  // ID người nộp bài
});

module.exports = mongoose.model('Nopbai', NopbaiSchema);
