const Nopbai = require("../models/Nopbai");
const Exams = require("../models/Exam");
const Users = require("../models/User");
class nopbaiControllers {
      async createNopbai(req, res) {
            try {
                  const { idexam, cauhoi, userId } = req.body;
                  const newNopbai = new Nopbai({
                        idexam,
                        cauhoi,
                        userId
                  });

                  const saveNopbai = await newNopbai.save();  // Lưu bài thi vào DB
                  res.status(201).json(saveNopbai);  // Trả về bài thi đã lưu
            } catch (err) {
                  res.status(500).json({ error: err.message });
            }
      }
      async getBaiThiUser(req, res) {
            try {
                  const { userId, idexam } = req.query;
                  const nopbai = await Nopbai.findOne({ userId, idexam });
                  const exam = await Exams.findById(idexam).populate('cauhoi');

                  if (nopbai && exam) {
                        let correctCount = 0;

                        // Lặp qua từng câu hỏi trong `nopbai`
                        nopbai.cauhoi.forEach(nopCauhoi => {
                              // Tìm câu hỏi tương ứng trong `exam` dựa vào `noidung`
                              const examCauhoi = exam.cauhoi.find(examCauhoi =>
                                    examCauhoi.noidung === nopCauhoi.noidung
                              );

                              // Nếu tìm thấy câu hỏi tương ứng
                              if (examCauhoi) {
                                    // Tìm đáp án đúng trong `exam`
                                    const correctAnswer = examCauhoi.dapan.find(dapan => dapan.isCorrect);

                                    // Kiểm tra xem `nopbai` có chứa đáp án đúng
                                    const userAnswer = nopCauhoi.dapan.find(dapan => dapan.isCorrect);

                                    // So sánh đáp án của `nopbai` với đáp án đúng của `exam`
                                    if (userAnswer && correctAnswer && userAnswer.text === correctAnswer.text) {
                                          correctCount++;
                                    }
                              }
                        });

                        // Tính điểm trên thang điểm 10
                        const totalQuestions = exam.soluong; // Tổng số câu hỏi
                        const score = (correctCount / totalQuestions) * 10; // Tính điểm

                        // Trả về kết quả với số câu đúng và điểm
                        res.status(200).json({ nopbai, point: score.toFixed(2) });
                  } else {
                        res.status(404).json({ message: "1" });
                  }
            } catch (err) {
                  console.log(err);
                  res.status(500).json({ message: 'Lỗi server' });
            }
      }
      async getBaiThiAdmin(req, res) {
            try {
                  const examId = req.params.id;
                  const exam = await Exams.findById(examId).populate('cauhoi');
                  if (!exam) return res.status(404).json({ message: 'Không tìm thấy bài thi' });

                  const nopbaiList = await Nopbai.find({ idexam: examId });

                  const results = await Promise.all(
                        nopbaiList.map(async (nopbai) => {
                              // Lấy thông tin người dùng
                              const user = await Users.findById(nopbai.userId);
                              if (!user) return null;

                              // Tính điểm
                              let correctCount = 0;
                              nopbai.cauhoi.forEach(nopCauhoi => {
                                    const examCauhoi = exam.cauhoi.find(eCauhoi => eCauhoi.noidung === nopCauhoi.noidung);
                                    if (examCauhoi) {
                                          const correctAnswer = examCauhoi.dapan.find(dapan => dapan.isCorrect);
                                          const userAnswer = nopCauhoi.dapan.find(dapan => dapan.isCorrect);
                                          if (userAnswer && correctAnswer && userAnswer.text === correctAnswer.text) {
                                                correctCount++;
                                          }
                                    }
                              });
                              const totalQuestions = exam.soluong;
                              const score = (correctCount / totalQuestions) * 10;
                              // Trả về obj kết hợp `nopbai`, `user` và `point`
                              return {
                                    ...nopbai.toObject(),
                                    userId: user,
                                    point: parseFloat(score.toFixed(2))  // Làm tròn 2 chữ số thập phân
                              };
                        })
                  );

                  // Loại bỏ các mục null trong kết quả
                  const filteredResults = results.filter(result => result !== null);
                  res.status(200).json({ filteredResults, exam });
            } catch (err) {
                  console.log(err);
                  res.status(500).json({ message: 'Lỗi server' });
            }
      }
      async getAllScoredExams(req, res) {
            try {
                  const exams = await Exams.find().populate('cauhoi');
                  const results = [];

                  for (const exam of exams) {
                        const nopbaiList = await Nopbai.find({ idexam: exam._id });

                        const scoredResults = await Promise.all(
                              nopbaiList.map(async (nopbai) => {
                                    const user = await Users.findById(nopbai.userId);
                                    if (!user) return null;

                                    let correctCount = 0;
                                    nopbai.cauhoi.forEach(nopCauhoi => {
                                          const examCauhoi = exam.cauhoi.find(eCauhoi => eCauhoi.noidung === nopCauhoi.noidung);
                                          if (examCauhoi) {
                                                const correctAnswer = examCauhoi.dapan.find(dapan => dapan.isCorrect);
                                                const userAnswer = nopCauhoi.dapan.find(dapan => dapan.isCorrect);
                                                if (userAnswer && correctAnswer && userAnswer.text === correctAnswer.text) {
                                                      correctCount++;
                                                }
                                          }
                                    });

                                    const totalQuestions = exam.soluong;
                                    const score = (correctCount / totalQuestions) * 10;
                                    return {
                                          examId: exam._id,
                                          examName: exam.tenbaithi,
                                          user,
                                          point: parseFloat(score.toFixed(2))  // Làm tròn 2 chữ số thập phân
                                    };
                              })
                        );
                        console.log(scoredResults)
                        // Loại bỏ các mục null trong kết quả và thêm vào danh sách kết quả
                        results.push(...scoredResults.filter(result => result !== null));
                  }

                  res.status(200).json(results);
            } catch (err) {
                  console.log(err);
                  res.status(500).json({ message: 'Lỗi server' });
            }
      }



}
module.exports = new nopbaiControllers;