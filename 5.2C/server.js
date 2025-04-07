const express = require("express");
const cors = require("cors");
const {
  connectToMongoDB,
  getDb,
  getGfsBucket,
} = require("./db/mongoConnection"); // Import the db module
const resumeRoutes = require("./routers/resumeRoutes");

const app = express();
const port = 3002;

// Middleware
app.use(
  cors({
    origin: "http://localhost:3000",
  })
); // Enable CORS for all routes
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve static files from the 'public' directory
app.use(express.static(__dirname + "/public"));

// MongoDB Connection
connectToMongoDB()
  .then(() => {
    // Pass the database and GridFSBucket instances to routes
    app.use((req, res, next) => {
      req.db = getDb(); // Attach the database instance to the request object
      req.gfsBucket = getGfsBucket(); // Attach the GridFSBucket instance to the request object
      next();
    });

    // Routes
    app.use("/api/resumes", resumeRoutes);

    // Route for the root path
    app.get("/", (req, res) => {
      res.sendFile(__dirname + "/index.html");
    });

    // Start the server
    app.listen(port, () => {
      console.log("App listening on port " + port);
    });
  })
  .catch((err) => {
    console.error("Failed to start the server:", err);
  });
