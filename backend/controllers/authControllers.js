const bcrypt = require("bcrypt")
const User = require("../models/User");
const jwt = require("jsonwebtoken")
let refreshTokens = [];
class authControllers{
      async login(req , res) {
            try{
                  const user = await User.findOne({mssv: req.body.mssv});
                  if(!user){
                        return res.status(404).json("Mã số sinh viên không tồn tại")
                  }
                  const validPassword = await bcrypt.compare(
                        req.body.password,
                        user.password
                  )
                  if(!validPassword){
                        return res.status(404).json("Sai mật khẩu");
                  }
                  if(user && validPassword){
                        const accessToken = jwt.sign({
                              id: user.id,
                              email: user.email,
                              mssv: user.mssv,
                              hoTen: user.hoten,
                              khoaHoc: user.khoaHoc,
                              lopHoc: user.lopHoc,
                              gioiTinh: user.gioiTinh,
                              ngaySinh: user.ngaySinh,
                              bacDaoTao: user.bacDaoTao,
                              loaiNganhDaoTao: user.loaiNganhDaoTao,
                              noiSinh: user.noiSinh,
                              nganh: user.nganh,
                              type: user.type,
                              admin: user.admin
                        }, process.env.JWT_ACCESS_KEY,
                        {expiresIn: "1h"}
                        )
                        const refreshToken = jwt.sign({
                              id: user.id,
                              email: user.email,
                              mssv: user.mssv,
                              hoTen: user.hoten,
                              khoaHoc: user.khoaHoc,
                              lopHoc: user.lopHoc,
                              gioiTinh: user.gioiTinh,
                              ngaySinh: user.ngaySinh,
                              bacDaoTao: user.bacDaoTao,
                              loaiNganhDaoTao: user.loaiNganhDaoTao,
                              noiSinh: user.noiSinh,
                              nganh: user.nganh,
                              type: user.type,
                              admin: user.admin
                        }, process.env.JWT_REFRESHTOKEN_KEY,
                        {expiresIn: "12h"}
                        )
                        refreshTokens.push(refreshToken);
                        res.cookie("refreshToken", refreshToken, {
                              httpOnly: true,
                              secure: false,
                              path: "/",
                              samSize: "strict"
                        })
                        const {password, ...others} = user._doc;
                        setTimeout(() => {return res.status(200).json({accessToken , others});}, 3000)
                  }
            }catch(err){
                  return res.status(500).json(err)
            }
      }
      async requestRefreshToken(req, res){
            const refreshToken = req.cookies.refreshToken;
            console.log(refreshToken)
            if(!refreshToken){
                  return res.status(401).json("Bạn chưa đăng nhập")
            }
            if (!refreshTokens.includes(refreshToken)) {
                  return res.status(403).json("Refresh token is not valid");
            }
            jwt.verify(refreshToken, process.env.JWT_REFRESHTOKEN_KEY, (err , user) => {
                  if(err){
                        console.log(err)
                  }
                  refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
                  const newAccessToken = jwt.sign({
                        id: user.id,
                        email: user.email,
                        mssv: user.mssv,
                        hoTen: user.hoten,
                        khoaHoc: user.khoaHoc,
                        lopHoc: user.lopHoc,
                        gioiTinh: user.gioiTinh,
                        ngaySinh: user.ngaySinh,
                        bacDaoTao: user.bacDaoTao,
                        loaiNganhDaoTao: user.loaiNganhDaoTao,
                        noiSinh: user.noiSinh,
                        nganh: user.nganh,
                        type: user.type,
                        admin: user.admin
                  }, process.env.JWT_ACCESS_KEY,
                  {expiresIn: "10h"}
                  )
                  const newRefreshToken = jwt.sign({
                        id: user.id,
                        email: user.email,
                        mssv: user.mssv,
                        hoTen: user.hoten,
                        khoaHoc: user.khoaHoc,
                        lopHoc: user.lopHoc,
                        gioiTinh: user.gioiTinh,
                        ngaySinh: user.ngaySinh,
                        bacDaoTao: user.bacDaoTao,
                        loaiNganhDaoTao: user.loaiNganhDaoTao,
                        noiSinh: user.noiSinh,
                        nganh: user.nganh,
                        type: user.type,
                        admin: user.admin
                  }, process.env.JWT_REFRESHTOKEN_KEY,
                  {expiresIn: "12h"}
                  )
                  refreshTokens.push(newRefreshToken);
                  res.cookie("refreshToken", newRefreshToken, {
                        httpOnly: true,
                        secure: false,
                        path: "/",
                        samSize: "strict"
                  })
                  res.status(200).json({accessToken: newAccessToken});
            })
            
      }
      async logOut (req, res) {
            //Clear cookies when user logs out
            refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
            res.clearCookie("refreshToken");
            res.status(200).json("Logged out successfully!");
      }
}
module.exports = new authControllers;