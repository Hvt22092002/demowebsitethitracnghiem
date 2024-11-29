const Monhoc = require("../models/Monhoc");
const Phancong = require("../models/Phancong");


class subjectManagement{
      async createSubject(req, res){
            try{
                  const tmpTenMonHoc = await Monhoc.findOne({ tenmonhoc: req.body.tenmonhoc });
                  if(tmpTenMonHoc){
                        return res.status(404).json("Môn học đã tồn tại")
                  }
                  const {maNganh, tenmonhoc, sotinchi} = req.body;
                  const newSubject = new Monhoc({maNganh , tenmonhoc, sotinchi})
                  newSubject.save();
                  res.status(200).json({message: "Thêm thành công môn học"} , newSubject);
            }catch(err){
                  res.status(500).json(err)
            }
      }
      async editSubject(req, res){
            try{
                  const tmpIDMaMonMoc = req.params.id;
                  const monhocFind = await Monhoc.findById(tmpIDMaMonMoc);
                  const monhoc = req.body;
                  if(!monhocFind){
                        return res.status(400).json("Môn học không tồn tại!")
                  }
                  const mamonhocFind = await Monhoc.findOne({mamonhoc: monhoc.mamonhoc});
                  if(mamonhocFind && mamonhocFind._id.toString() !== tmpIDMaMonMoc){
                        return res.status(400).json("Mã môn học đã tồn tại!")
                  }
                  const updatedMonHoc = await Monhoc.findByIdAndUpdate(
                        tmpIDMaMonMoc,
                        {
                              $set: monhoc, 
                        },
                        { new: true }
                  );
                  res.status(200).json({
                        message: "Cập nhật thông tin người dùng thành công!",
                        updatedMonHoc, // Trả về thông tin người dùng sau khi cập nhật
                  });

            }catch(err){
                  res.status(500).json(err)
            }
      }
      async deleteSubject(req, res){
            try{
                  const monhoc = await Monhoc.findByIdAndDelete(req.params.id);
                  if (!monhoc) {
                        return res.status(404).json("Không tìm thấy môn học");
                  }
                  const phancong = await Phancong.deleteMany({mamonhoc: monhoc.mamonhoc})
                  res.status(200).json({message: "Xóa thành công" , monhoc});
            }catch(err){
                  res.status(500).json(err)
            }
      }
      async getAllSubject(req, res){
            try{
                  const subject = await Monhoc.find();
                  res.status(200).json(subject);
            }catch(err){
                  res.status(500).json(err);
            }
      }
}
module.exports = new subjectManagement;