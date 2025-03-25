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
