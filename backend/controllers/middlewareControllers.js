const jwt = require("jsonwebtoken");

class middlewareControllers{
      verifyToken = (req, res, next)=>{
            const token = req.headers.token;
            if(token){
                  const accessToken = token.split(" ")[1];
                  jwt.verify(accessToken, process.env.JWT_ACCESS_KEY,(err, user)=>{
                        if(err){
                              return res.status(403).json("Token đã hết hạn")
                        }
                        req.user = user;
                        next();     
                  })
            }
            else{
                  return res.status(401).json("Vui lòng đăng nhập")
            }
      }
      verifyTokenAndAdmin = (req, res, next)=>{
            this.verifyToken(req, res, ()=> {
                  if(req.user.admin){
                        next();
                  }
                  else{
                        return res.status(403).json("Truy cập bị ngăn cấm")
                  }
            })
      }
      verifyTokenAndTeacher = (req, res, next) => {
            this.verifyToken(req, res, () => {
                  if(req.user.type == "Giảng viên"){
                        next();
                  }
                  else{
                        return res.status(403).json("Truy cập bị ngăn cấm")
                  }
            })
      }
}
module.exports = new middlewareControllers;