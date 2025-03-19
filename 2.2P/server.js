const express = require("express");
const app = express();
const routes = require("./routes/index");

app.use(express.static("public"));
app.use("/", routes);

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
