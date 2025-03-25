var express = require("express");
var app = express();
var port = 3000;

// Serve static files from the 'public' directory
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Route for the root path
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.listen(port, () => {
  console.log("App listening on port " + port);
});
