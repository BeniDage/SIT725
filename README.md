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

## 5.2C - MVC-Based Resume Management System

The `5.2C` folder contains a refactored version of the resume management system that follows the **MVC (Model-View-Controller)** architecture. It separates the database logic, business logic, and routing for better maintainability and scalability.

### Features

- Follows the MVC architecture for better code organization.
- Upload resumes (PDF, DOC, DOCX) and store them in MongoDB GridFS.
- Stream resumes directly from the database.
- View a list of uploaded resumes with clickable links.
- Responsive UI with Bootstrap 5.

### Prerequisites

Before running the application, make sure you have the following installed:

- Node.js (v14 or higher)
- npm (Node Package Manager)
- MongoDB (v4.x or higher)

### Installation and Setup

1. Navigate to the 5.2C directory:

   ```bash
   cd 5.2C
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the `5.2C` directory and add your MongoDB connection string:

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
   node server.js
   ```

6. Open your browser and visit:
   ```
   http://localhost:3002
   ```

### Project Structure

```
5.2C/
├── controllers/
│   └── resumeController.js  # Handles request/response logic
├── models/
│   └── resumeModel.js       # Handles database operations
│── db/
│   └── db.js                # Handles MongoDB connection
|
├── public/
│   ├── css/
│   │   └── styles.css       # Frontend styles
│   └── js/
│       └── script.js        # Frontend logic
│
├── routers/
│   └── resumeRoutes.js      # Defines API routes for resumes
|
├── server.js                # Express server configuration
│── index.html               # Frontend UI
└── package.json             # Project dependencies
```

## 6.2C & 7.2 - Socket Programming

This version of the project integrates Socket.IO to enable real-time notifications. When the backend completes processing the resume feedback, it sends a notification to the frontend to inform the user that the feedback is ready. This enhances the user experience by providing instant updates without requiring the user to refresh the page.

### Installation and Setup

1. Run the Backend (Server)
   Navigate to the project root directory:

   ```bash
   cd 6.2C
   ```

   Install dependencies:

   ```bash
   npm install
   ```

   Start the backend server:

   ```bash

   node server.js
   ```

2. Run the Frontend:
   Navigate to the project root directory:

   ```bash
   cd public
   ```

   Start a lightweight server

   ```bash
   serve -s . -l 3000
   ```

   Open the frontend in your browser:

   ```bash
   http://localhost:3000
   ```

### Project Structure

```
SIT725/
├── controllers/
│   └── resumeController.js  # Handles resume-related logic
├── db/
│   └── mongoConnection.js   # MongoDB connection logic
├── models/
│   └── resumeModel.js       # Handles database operations
├── public/
│   ├── components/
│   │   ├── navbar.html      # Navbar component
│   │   └── footer.html      # Footer component
│   ├── css/
│   │   └── styles.css       # Frontend styles
│   ├── js/
│   │   ├── main.js          # Main frontend logic
│   │   ├── feedback.js      # Handles feedback functionality
│   │   ├── chart.js         # Chart rendering logic
│   │   ├── notification.js  # Handles Socket.IO notifications
│   │   └── upload.js        # Handles file upload functionality
│   └── index.html           # Frontend UI
├── routers/
│   └── resumeRoutes.js      # Defines API routes for resumes
├── server.js                # Express server configuration
└── package.json             # Project dependencies
```

### Socket.IO Integration

Backend: The backend uses Socket.IO to emit a feedbackReady event to the frontend when the resume feedback is processed.

Frontend: The frontend listens for the feedbackReady event and displays a notification to the user.
