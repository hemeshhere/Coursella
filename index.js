const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const { userRouter } = require("./routes/user")
const { courseRouter } = require("./routes/course")
const { adminRouter } = require("./routes/admin")

app.use("api/v1/user", userRouter);
app.use("api/v1/course", courseRouter);
app.use("api/v1/admin", adminRouter);
const PORT=process.env.PORT;
app.listen(PORT);