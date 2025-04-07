const { ObjectId } = require("mongodb");
const {
  getAllResumes,
  getResumeById,
  uploadResumeToGridFS,
} = require("../models/resumeModel");

// Fetch all uploaded resumes
exports.getAllResumes = async (req, res) => {
  try {
    const db = req.db; // Access the database instance from req
    const files = await getAllResumes(db); // Call the model function
    if (!files || files.length === 0) {
      return res.status(404).json({ message: "No files found" });
    }
    res.json(files);
  } catch (err) {
    console.error("Error fetching resumes:", err);
    res.status(500).send("Error fetching resumes");
  }
};

// Stream a specific resume
exports.getResumeById = async (req, res) => {
  try {
    const db = req.db; // Access the database instance from req
    const gfsBucket = req.gfsBucket; // Access the GridFSBucket instance from req
    const fileId = req.params.id; // Get the file ID from the request parameters

    if (!ObjectId.isValid(fileId)) {
      return res.status(400).json({ message: "Invalid file ID" });
    }

    const file = await getResumeById(db, fileId); // Call the model function
    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }

    // Set the appropriate headers for the file
    res.set({
      "Content-Type": file.contentType,
      "Content-Disposition": `attachment; filename="${file.filename}"`,
    });

    // Stream the file content to the response
    const readStream = gfsBucket.openDownloadStream(file._id);
    readStream.pipe(res);

    // Handle stream errors
    readStream.on("error", (err) => {
      console.error("Error streaming file:", err);
      res.status(500).send("Error streaming file");
    });
  } catch (err) {
    console.error("Error fetching resume:", err);
    res.status(500).send("Error fetching resume");
  }
};

// Upload a new resume
exports.uploadResume = async (req, res) => {
  try {
    const gfsBucket = req.gfsBucket; // Access the GridFSBucket instance from req

    if (!req.file) {
      return res.status(400).send("No file uploaded");
    }

    const fileId = await uploadResumeToGridFS(gfsBucket, req.file); // Call the model function
    res.status(201).send({
      message: "Resume uploaded successfully",
      fileId: fileId,
    });
  } catch (err) {
    console.error("Error uploading resume:", err);
    res.status(500).send("Error uploading resume");
  }
};
