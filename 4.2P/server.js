const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors"); // Import the cors package
const { MongoClient, GridFSBucket } = require("mongodb");
const resumeRoutes = require("./routers/resumeRoutes");
const dotenv = require("dotenv");

dotenv.config(); // Load environment variables from .env file

const app = express();
const port = 3002;

// Middleware
app.use(
  cors({
    origin: "http://localhost:3000",
  })
); // Enable CORS for all routes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// MongoDB Connection
const mongoURI = process.env.MONGODB_URI; // Replace with your MongoDB URI
let db; // Database instance
let gfsBucket; // GridFSBucket instance

MongoClient.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then((client) => {
    db = client.db(); // Get the database instance
    gfsBucket = new GridFSBucket(db, { bucketName: "uploads" }); // Initialize GridFSBucket
    console.log("Connected to MongoDB");

    // Pass the database and GridFSBucket instances to routes
    app.use((req, res, next) => {
      req.db = db; // Attach the database instance to the request object
      req.gfsBucket = gfsBucket; // Attach the GridFSBucket instance to the request object
      next();
    });

    // Routes
    app.use("/api/resumes", resumeRoutes);

    // Start the server
    app.listen(port, () => {
      console.log("App listening on port " + port);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
  });
