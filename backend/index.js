const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const db = require("./config/db");
const authRoute = require("./routes/auth");
const usersRoute = require("./routes/users"); 
const subjectRoute = require("./routes/subjectManagement");
const classroomRoute = require("./routes/classroom")
const questionRoute = require("./routes/question")
const examRoute = require("./routes/exam");
const nopbaiRouter = require("./routes/nopbai");

const app = express();
const port = 8000;
db.connect();
app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use("/v1/auth", authRoute)
app.use("/v1/users", usersRoute)
app.use("/v1/subject", subjectRoute)
app.use("/v1/classroom", classroomRoute)
app.use("/v1/question", questionRoute)
app.use("/v1/exam", examRoute)
app.use("/v1/nopbai", nopbaiRouter)
app.listen(port, () => {
      console.log(`Example app listening on port http://localhost:${port}`)
})
