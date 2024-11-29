const mongoose = require('mongoose');
const dotenv = require("dotenv");

dotenv.config();
async function connect(){
      try{
            await mongoose.connect(process.env.MONGOOB_URL, {
                  useNewUrlParser: true,
                  useUnifiedTopology: true
            })
            console.log('Connect thanh cong');
      }
      catch (error){
            console.log('Connect fail');
      }
}
module.exports = {connect};