const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes= require("./routes/auth");
const taskRoutes = require("./routes/task");

require("dotenv").config();

const app = express()
const port = 5000;

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

app.get("/", (req, res) => {
    res.send("API is running.");
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => console.log(err));


