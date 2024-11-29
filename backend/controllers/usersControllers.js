const User = require("../models/User");
const bcrypt = require("bcrypt");

class UsersControllers {
      async getAllUsers(req, res) {
            try {
                  const users = await User.find();
                  res.status(200).json(users);
            } catch (err) {
                  res.status(500).json(err);
            }
      }
      async deleteUser(req, res) {
            try {
                  const user = await User.findByIdAndDelete(req.params.id);
                  if (!user) {
                        return res.status(404).json("Không tìm thấy người dùng");
                  }
                  res.status(200).json({
                        message: "Xóa người dùng thành công!",
                        user,
                  });
            } catch (err) {
                  res.status(500).json(err);
            }
      }
      async addUser(req, res) {
            try {
                  const tmpMssv = await User.findOne({ mssv: req.body.mssv });
                  const tmpemail = await User.findOne({ email: req.body.email });
                  if (tmpMssv && tmpMssv.mssv != null) {
                        return res.status(500).json("MSSV đã tồn tại")
                  }
                  if (tmpemail && tmpemail.email != null) {
                        return res.status(500).json("Email đã tồn tại")
                  }
                  const salt = await bcrypt.genSalt(10);
                  const password = await bcrypt.hash(req.body.password, salt);
                  const { email, mssv, hoTen, khoaHoc, lopHoc, gioiTinh, ngaySinh, bacDaoTao, loaiNganhDaoTao, noiSinh, nganh, type, admin } = req.body;
                  const newUser = new User({
                        email,
                        password,
                        mssv,
                        hoTen,
                        khoaHoc,
                        lopHoc,
                        gioiTinh,
                        ngaySinh,
                        bacDaoTao,
                        loaiNganhDaoTao,
                        noiSinh,
                        nganh,
                        type,
                        admin,
                  });
                  newUser.save();
                  return res.status(200).json({
                        newUser,
                        message: "Thêm thành công!"
                  });
            } catch (err) {
                  res.status(500).json(err);
            }
      }
      async addListUser(req, res) {
            const { lopHoc, listUser } = req.body;
            console.log(listUser);

            try {
                  // Xóa tất cả người dùng trong lớp học hiện tại
                  await User.deleteMany({ lopHoc, admin: false });
                  // Duyệt qua danh sách người dùng và thêm từng người
                  const promises = listUser.map(async (user) => {
                        try {
                              // Kiểm tra các trường bắt buộc
                              if (!user.email || !user.mssv || !user.password) {
                                    throw new Error(`Thiếu thông tin bắt buộc cho người dùng: ${user.mssv}`);
                              }
                              const plainPassword = String(user.password);
                              // Băm mật khẩu
                              const salt = await bcrypt.genSalt(10);
                              const hashedPassword = await bcrypt.hash(plainPassword, salt);

                              // Lấy thông tin người dùng từ listUser
                              const { email, mssv, hoTen, khoaHoc, gioiTinh, ngaySinh, bacDaoTao, loaiNganhDaoTao, noiSinh, nganh, type, admin } = user;
                              const parsedDate = new Date(ngaySinh);
                              // Tạo một đối tượng User mới
                              const newUser = new User({
                                    email,
                                    password: hashedPassword,
                                    mssv,
                                    hoTen,
                                    khoaHoc,
                                    lopHoc, // Sử dụng lopHoc từ req.body
                                    gioiTinh,
                                    ngaySinh: parsedDate,
                                    bacDaoTao,
                                    loaiNganhDaoTao,
                                    noiSinh,
                                    nganh,
                                    type,
                                    admin,
                              });

                              return await newUser.save(); // Lưu người dùng mới vào database
                        } catch (err) {
                              // Ghi lỗi cụ thể của từng user
                              console.error(`Lỗi khi thêm người dùng ${user.mssv}:`, err.message);
                              throw new Error(`Không thể thêm người dùng ${user.mssv}: ${err.message}`);
                        }
                  });

                  // Chờ tất cả promises hoàn thành
                  await Promise.all(promises);
                  res.status(200).json("Thêm thành công!");
            } catch (err) {
                  // Gửi phản hồi với lỗi cụ thể
                  res.status(500).json({ error: err.message });
            }

      }

      async editUser(req, res) {
            try {
                  const userId = req.params.id;
                  const userfind = await User.findById(userId);
                  const user = req.body;
                  if (!userfind) {
                        return res.status(404).json("Người dùng không tồn tại");
                  }
                  if (user.email) {
                        const existingUser = await User.findOne({ email: user.email });
                        if (existingUser && existingUser._id.toString() !== userId) {
                              return res.status(409).json("Email đã tồn tại trong hệ thống");
                        }
                  }
                  if (user.password !== userfind.password) {
                        const salt = await bcrypt.genSalt(10);
                        const password = await bcrypt.hash(user.password, salt);
                        user.password = password;
                  }

                  const updatedUser = await User.findByIdAndUpdate(
                        userId,
                        {
                              $set: user,
                        },
                        { new: true }
                  );
                  res.status(200).json({
                        message: "Cập nhật thông tin người dùng thành công!",
                        updatedUser, // Trả về thông tin người dùng sau khi cập nhật
                  });
            }
            catch (err) {
                  res.status(400).json("Cập nhật thất bại!");
            }

      }
      async editPassWordUser(req, res) {
            try {
                  const { userId, newPassword } = req.body;
                  const user = await User.findById(userId);
                  if (!user) {
                        return res.status(404).json({ message: "Người dùng không tồn tại!" });
                  }
                  const salt = await bcrypt.genSalt(10);
                  const hashedPassword = await bcrypt.hash(newPassword, salt);
                  user.password = hashedPassword;
                  await user.save();
                  res.status(200).json({ message: "Cập nhật mật khẩu thành công!" });
            } catch (err) {
                  res.status(400).json({ message: "Chỉnh sửa thất bại!", error: err.message });
            }
      }
}

module.exports = new UsersControllers();