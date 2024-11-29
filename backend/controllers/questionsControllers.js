const Question = require("../models/Question");


class questionControllers {
      async createQuestion(req, res) {
            const { noidung, dapan, loaicauhoi, mucdo } = req.body;
            const newQuestion = new Question({
                  noidung,
                  dapan,
                  loaicauhoi,
                  mucdo
            });
            await newQuestion.save();
            res.status(201).json({ message: 'Câu hỏi đã được tạo thành công!', question: newQuestion });
      }
      async deleteQuestion(req, res) {
            try {
                  const questionId = req.params.id;
                  const deletedQuestion = await Question.findByIdAndDelete(questionId);  // Tìm và xóa câu hỏi theo ID
                  if (!deletedQuestion) {
                        return res.status(404).json({ message: 'Không tìm thấy câu hỏi' });
                  }
                  res.status(200).json({ message: 'Xóa câu hỏi thành công', deletedQuestion });
            } catch (err) {
                  res.status(500).json({ message: 'Xóa câu hỏi thất bại', error: err.message });
            }
      }
      async editQuestion(req, res) {
            try {
                  const questionId = req.params.id;
                  const updatedQuestion = await Question.findByIdAndUpdate(
                        questionId,
                        req.body, 
                        { new: true, runValidators: true }  // Trả về câu hỏi đã cập nhật
                  );
                  if (!updatedQuestion) {
                        return res.status(404).json({ message: 'Không tìm thấy câu hỏi' });
                  }
                  res.status(200).json({message: "Chỉnh sửa thành công!", updatedQuestion});  // Trả về câu hỏi đã được chỉnh sửa
            } catch (err) {
                  res.status(400).json({ message: 'Chỉnh sửa câu hỏi thất bại', error: err.message });
            }
      }
      async getAllQuestion(req, res) {
            try {
                  const questions = await Question.find(); 
                  res.status(200).json(questions);
            } catch (err) {
                  res.status(500).json({ message: 'Lấy danh sách câu hỏi thất bại', error: err.message });
            }
      }
}
module.exports = new questionControllers;