const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();
const { ObjectId } = mongoose.Types;

// create app
const app = express();

// cors
app.use(cors());
app.use(express.json());

// routes

const authRoutes = require("./src/routes/userAuthRoutes");
const PatientsRoutes = require("./src/routes/patients");
const drRoutes = require("./src/routes/doctors");


app.use("/auth", authRoutes);
app.use("/patients", PatientsRoutes);
app.use("/doctors", drRoutes);

mongoose.connect(process.env.CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", (error) => {
  console.log("Mongodb error : ", error);
});

db.once("open", () => {
  console.log("Mongodb connected sucessfully!");
  const port = process.env.PORT;
  app.listen(port, () => {
    console.log(`server is running on ${port} port`);
  });
});
