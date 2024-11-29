const Lophoc = require("../models/Lophoc")


class classroomController{
      async classList(req, res){
            try{
                  const listClass = await Lophoc.find();
                  res.status(200).json(listClass);
            }catch(err){
                  res.status(500).json(err);
            }
      }
      async createClass(req , res){
            try{
                  const {maNganh , lopHoc, khoaHoc, nganh} = req.body;
                  if (!maNganh || !lopHoc || !khoaHoc || !nganh) {
                        return res.status(400).json("Thiếu thông tin cần thiết");
                  }
                  const tmpLopHoc = await Lophoc.findOne({lopHoc: req.body.lopHoc});
                  if(tmpLopHoc){
                        if(tmpLopHoc.maNganh === maNganh){
                              return res.status(400).json("Lớp học đã tồn tại")
                        }
                  }
                  const newClassroom = new Lophoc({
                        maNganh,
                        lopHoc,
                        khoaHoc,
                        nganh
                  })
                  newClassroom.save();
                  res.status(200).json({message: "Thêm lớp học thành công" , newClassroom});
            }catch(err){
                  res.status(500).json(err);
            }
      }
      async editClass(req, res){
            try{
                  const tmpID = req.params.id;
                  const tmpClass = await Lophoc.findById(tmpID);
                  if(!tmpClass){
                        return res.status(404).json("Người dùng không tồn tại");
                  }
                  const {maNganh , lopHoc, khoaHoc, nganh} = req.body;
                  const tmpLopHoc = await Lophoc.findOne({lopHoc});
                  if(tmpLopHoc && tmpLopHoc._id.toString() !== tmpID){
                        return res.status(400).json("Lớp học đã tồn tại")
                  }
                  const updateLopHoc = await Lophoc.findByIdAndUpdate(
                        tmpID,
                        {
                              $set: { maNganh, lopHoc, khoaHoc, nganh }, 
                        },
                        { new: true }
                  );
                  res.status(200).json({
                        message: "Cập nhật lớp học thành công!",
                        updateLopHoc,
                  });
            }catch(err){
                  res.status(500).json(err);
            }
      }
      async deleteClass(req, res){
            try{
                  const deleteID = req.params.id;
                  const tmpClass = await Lophoc.findByIdAndDelete(deleteID);
                  if(!tmpClass){
                        return res.status(404).json("Không tìm thấy người dùng");
                  }
                  res.status(200).json({delteteClass: tmpClass, message: "Xóa thành công!"});
            }catch(err){
                  res.status(500).json(err);
            }
      }
}
module.exports = new classroomController;