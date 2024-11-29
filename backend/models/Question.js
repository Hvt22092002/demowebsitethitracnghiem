const mongoose = require('mongoose');

const AnswerSchema = new mongoose.Schema({
  text: { type: String, required: true },  // Nội dung đáp án
  isCorrect: { type: Boolean, required: true },  // Đánh dấu đúng/sai
});

const QuestionSchema = new mongoose.Schema({
  noidung: { type: String, required: true },  // Nội dung câu hỏi
  dapan: [AnswerSchema],  // Mảng đáp án, mỗi đáp án là một object
  loaicauhoi: { type: String },  // Loại câu hỏi (môn học, chủ đề)
  mucdo: { type: String, enum: ['Dễ', 'Trung bình', 'Khó'] },  // Mức độ khó
  createdAt: { type: Date, default: Date.now },  // Thời gian tạo câu hỏi
});

module.exports = mongoose.model('Question', QuestionSchema);
