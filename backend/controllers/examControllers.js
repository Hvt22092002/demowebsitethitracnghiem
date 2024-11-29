const Exam = require("../models/Exam");
const Question = require("../models/Question");
class examControllers {
      async createExam(req, res) {
            try {
                  const { tenbaithi, cauhoi, soluong, thoigian, thoigianbatdau, thoigianketthuc, lopduocgiao, xemdiem,
                        xembailam,
                        daocauhoi,
                        daodapan} = req.body;
                  const newExam = new Exam({
                        tenbaithi,
                        cauhoi,
                        soluong,
                        thoigian,
                        thoigianbatdau,
                        thoigianketthuc,
                        lopduocgiao,
                        xemdiem,
                        xembailam,
                        daocauhoi,
                        daodapan
                  });

                  const savedExam = await newExam.save();  // Lưu bài thi vào DB
                  res.status(201).json(savedExam);  // Trả về bài thi đã lưu
            } catch (err) {
                  res.status(500).json({ error: err.message });
            }
      }
      async deleteExam(req, res) {
            try {
                  const examId = req.params.id;
                  const deletedExam = await Exam.findByIdAndDelete(examId);

                  if (!deletedExam) {
                        return res.status(404).json({ message: "Bài thi không tồn tại" });
                  }

                  res.status(200).json({ message: "Đã xóa bài thi thành công",  deletedExam});
            } catch (err) {
                  res.status(500).json({ error: err.message });
            }
      }
      async editExam(req, res) {
            try {
                  const examId = req.params.id;
                  const updatedData = req.body;

                  const updatedExam = await Exam.findByIdAndUpdate(
                        examId,
                        { $set: updatedData },
                        { new: true }  
                  );

                  if (!updatedExam) {
                        return res.status(404).json({ message: "Bài thi không tồn tại" });
                  }

                  res.status(200).json(updatedExam);
            } catch (err) {
                  res.status(500).json({ error: err.message });
            }
      }
      async getExamUser(req, res) {
            try {
                  const exams = await Exam.find().populate('cauhoi');
                  const result = exams.map(exam => ({
                        _id: exam._id,
                        tenbaithi: exam.tenbaithi,
                        cauhoi: exam.cauhoi.map(question => ({
                              noidung: question.noidung,
                              dapan: question.dapan.map(answer => ({
                                    text: answer.text,
                                    // Không đưa isCorrect vào
                              })),
                              loaicauhoi: question.loaicauhoi,
                              mucdo: question.mucdo,
                        })),
                        soluong: exam.soluong,
                        thoigian: exam.thoigian,
                        thoigianbatdau: exam.thoigianbatdau,
                        thoigianketthuc: exam.thoigianketthuc,
                        lopduocgiao: exam.lopduocgiao,
                        xemdiem: exam.xemdiem,
                        xembailam: exam.xembailam,
                        daocauhoi: exam.daocauhoi,
                        daodapan: exam.daodapan,
                        createdAt: exam.createdAt,
                  }));
                  res.status(200).json(result);
            } catch (err) {
                  res.status(500).json({ error: err.message });
            }
      }
      async getExamAdmin(req , res){
            try{
                  const exams = await Exam.find().populate('cauhoi');
                  res.status(200).json(exams);
            }catch (err) {
                  res.status(500).json({ error: err.message });
            }
      }
}
module.exports = new examControllers;