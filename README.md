# SIT725 Practicals

## 2.2P - Simple Addition API

The `2.2P` folder contains a simple Node.js application using Express. It includes routes and controllers to perform basic sum operations via adding two numbers via an HTTP GET request.

### How to Test 2.2P

You can test the addition functionality by visiting the following URL in your browser or using a tool like Postman:
`http://localhost:3000/math/add?num1=5&num2=3`

## 3.2P - Resume Upload Portal

The `3.2P` folder contains a web application built with Express and Bootstrap that allows users to upload resume files (PDF, DOC, DOCX) with a progress bar indicator.

### Features

- Modern responsive UI with Bootstrap 5
- File upload with progress bar
- Supports PDF and Word document formats
- Real-time upload status feedback
- Mobile-friendly design

### Prerequisites

Before running the application, make sure you have the following installed:

- Node.js (v14 or higher)
- npm (Node Package Manager)

### Installation and Setup

1. Navigate to the 3.2P directory:

   ```bash
   cd 3.2P
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the application:

   ```bash
   npm start
   ```

4. Open your browser and visit:
   ```
   http://localhost:3000
   ```

### Project Structure

```
3.2P/
├── public/
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   └── script.js
│   └── index.html
├── server.js      # Express server configuration
└── package.json   # Project dependencies
```

### Technologies Used

- Frontend: HTML5, CSS3, Bootstrap 5, JavaScript
- Backend: Node.js, Express.js
- UI Framework: Bootstrap 5
- Icons: Bootstrap Icons

## 4.2P - Resume Management System with MongoDB GridFS (Server and Database Intergration for 3.2P)

The `4.2P` folder contains a web server and database that extends the functionality of the resume upload portal (3.2P) by integrating MongoDB's GridFS for file storage and retrieval.

### Features

- Upload resumes (PDF, DOC, DOCX) and store them in MongoDB GridFS
- Stream resumes directly from the database
- View a list of uploaded resumes with clickable links

### Prerequisites

Before running the application, make sure you have the following installed:

- Node.js (v14 or higher)
- npm (Node Package Manager)
- MongoDB (v4.x or higher)

### Installation and Setup

1. Navigate to the 4.2P directory:

   ```bash
   cd 4.2P
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the `4.2P` directory and add your MongoDB connection string:

   ```
   MONGODB_URI=mongodb://localhost:27017/sit725
   ```

   - Replace `mongodb://localhost:27017/sit725` with your actual MongoDB connection string.

4. Start the MongoDB server:

   ```bash
   mongod
   ```

5. Start the application:

   ```bash
   npm start
   ```

6. Open your browser and visit:
   ```
   http://localhost:3002
   ```

### Project Structure

```
4.2P/
├── controllers/
│   └── resumeController.js  # Handles resume-related logic
├── routers/
│   └── resumeRoutes.js      # Defines API routes for resumes        # Frontend UI
├── server.js                # Express server configuration
└── package.json             # Project dependencies
```

### Technologies Used

- Frontend: HTML5, CSS3, Bootstrap 5, JavaScript
- Backend: Node.js, Express.js
- Database: MongoDB with GridFS
- UI Framework: Bootstrap 5
- Icons: Bootstrap Icons

---

### How to Test 4.2P server

1. **Upload a Resume**:

   - Open the application (3.2P folder ) in your browser (`http://localhost:3000`).
   - Use the upload form to upload a resume file (PDF, DOC, or DOCX).
   - Observe the progress bar during the upload.

2. **View Uploaded Resumes**:

   - After uploading, the list of uploaded resumes will appear under the "Uploaded Resumes" section.
   - Click on a resume link to download or view it.

3. **Backend API Endpoints**:
   - `POST /api/resumes/upload`: Upload a resume.
   - `GET /api/resumes`: Fetch the list of uploaded resumes.
   - `GET /api/resumes/:id`: Stream a specific resume by its ID.
