const express = require("express");
const router = require("./routes/index.js");
const cors = require("cors");
require("dotenv").config();



const app = express();
app.listen(process.env.PORT);

app.use(cors());
app.use(express.json());
app.use("/api/v1", router);




