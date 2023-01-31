const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const authRoutes = require("./routes/auth");

const app = express();

app.use(bodyParser.json());

app.use("/auth", authRoutes);

const PORT = process.env.PORT || 5000;
const ATLAS_URI = process.env.ATLAS_URI;
mongoose
  .connect(ATLAS_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error(error);
  });
