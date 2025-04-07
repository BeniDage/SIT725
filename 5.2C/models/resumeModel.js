const { ObjectId } = require("mongodb");

// Fetch all uploaded resumes
const getAllResumes = async (db) => {
  console.log("Fetching all resumes from the database...");
  return await db.collection("uploads.files").find().toArray();
};

// Find a specific resume by ID
const getResumeById = async (db, fileId) => {
  return await db
    .collection("uploads.files")
    .findOne({ _id: new ObjectId(fileId) });
};

// Upload a new resume to GridFS
const uploadResumeToGridFS = (gfsBucket, file) => {
  console.log("Uploading resume to GridFS...");
  return new Promise((resolve, reject) => {
    const uploadStream = gfsBucket.openUploadStream(file.originalname, {
      contentType: file.mimetype,
    });

    uploadStream.end(file.buffer);

    uploadStream.on("finish", () => resolve(uploadStream.id));
    uploadStream.on("error", (err) => reject(err));
  });
};

module.exports = {
  getAllResumes,
  getResumeById,
  uploadResumeToGridFS,
};
