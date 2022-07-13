const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const db = require("./database/db");

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));

app.use("/", require("./routes/Home"));
app.use("/user", require("./routes/User"));
app.use("/admin", require("./routes/Admin"));

app.listen(5000, () => {
  console.log("Server is running on port 5000.");
});
