const { ObjectId } = require("mongodb");

// Fetch all uploaded resumes
exports.getAllResumes = async (req, res) => {
  try {
    const db = req.db; // Access the database instance from req
    const files = await db.collection("uploads.files").find().toArray();
    if (!files || files.length === 0) {
      return res.status(404).json({ message: "No files found" });
    }
    res.json(files);
    console.log("Fetched all resumes:", files);
  } catch (err) {
    console.error("Error fetching resumes:", err);
    res.status(500).send("Error fetching resumes");
  }
};

// Stream a specific resume
exports.getResumeById = async (req, res) => {
  try {
    const db = req.db; // Access the database instance from req
    const gfsBucket = req.gfsBucket;
    const fileId = req.params.id;

    if (!ObjectId.isValid(fileId)) {
      return res.status(400).json({ message: "Invalid file ID" });
    }

    // Find the file metadata in the uploads.files collection
    const file = await db
      .collection("uploads.files")
      .findOne({ _id: new ObjectId(fileId) });
    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }
    console.log("Fetched resume:", file);
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
    const gfsBucket = req.gfsBucket;

    if (!req.file) {
      return res.status(400).send("No file uploaded");
    }

    const uploadStream = gfsBucket.openUploadStream(req.file.originalname, {
      contentType: req.file.mimetype,
    });

    uploadStream.end(req.file.buffer);

    uploadStream.on("finish", () => {
      res.status(201).send({
        message: "Resume uploaded successfully",
        fileId: uploadStream.id,
      });
    });

    uploadStream.on("error", (err) => {
      console.error("Error uploading file:", err);
      res.status(500).send("Error uploading file");
    });
  } catch (err) {
    console.error("Error uploading resume:", err);
    res.status(500).send("Error uploading resume");
  }
};
