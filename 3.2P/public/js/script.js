// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Get DOM elements
  const form = document.getElementById("resumeForm");
  const progressBar = document.querySelector(".progress-bar");
  const progressDiv = document.getElementById("uploadProgress");
  const uploadStatus = document.getElementById("uploadStatus");
  const fileInput = document.getElementById("resumeFile");

  // Handle form submission
  form.addEventListener("submit", handleFormSubmit);

  /**
   * Handles the form submission and uploads the file to the backend
   * @param {Event} e - The form submission event
   */
  async function handleFormSubmit(e) {
    e.preventDefault();

    if (!validateFile()) {
      return;
    }

    showUploadElements();

    const formData = new FormData();
    formData.append("resume", fileInput.files[0]);

    // Use XMLHttpRequest to track upload progress
    const xhr = new XMLHttpRequest();

    xhr.open("POST", "http://localhost:3002/api/resumes/upload", true);

    // Track upload progress
    xhr.upload.addEventListener("progress", (e) => {
      if (e.lengthComputable) {
        const progress = Math.round((e.loaded / e.total) * 100);
        updateProgress(progress); // Update the progress bar
      }
    });

    // Handle the response
    xhr.onload = function () {
      if (xhr.status === 201) {
        uploadStatus.innerHTML =
          '<span class="text-success">Upload completed!</span>';
        fetchResumes(); // Optionally fetch the updated list of resumes
      } else {
        const error = JSON.parse(xhr.responseText);
        uploadStatus.innerHTML = `<span class="text-danger">Error: ${error.message}</span>`;
      }
      resetUploadForm();
    };

    xhr.onerror = function () {
      console.error("Error uploading file");
      uploadStatus.innerHTML =
        '<span class="text-danger">An error occurred!</span>';
      resetUploadForm();
    };

    xhr.send(formData); // Send the form data
  }

  /**
   * Validates if a file is selected
   * @returns {boolean} - Whether the file input is valid
   */
  function validateFile() {
    if (!fileInput.files.length) {
      alert("Please select a file first");
      return false;
    }
    return true;
  }

  /**
   * Shows the progress bar and status elements
   */
  function showUploadElements() {
    progressDiv.classList.remove("d-none");
    uploadStatus.classList.remove("d-none");
  }

  /**
   * Updates the progress bar
   * @param {number} progress - The current progress percentage
   */
  function updateProgress(progress) {
    progressBar.style.width = progress + "%";
    progressBar.setAttribute("aria-valuenow", progress);
    progressBar.textContent = progress + "%";
  }

  /**
   * Resets the form and hides upload elements
   */
  function resetUploadForm() {
    progressDiv.classList.add("d-none");
    uploadStatus.classList.add("d-none");
    form.reset();
  }

  /**
   * Fetches and displays the list of uploaded resumes
   */
  /**
   * Fetches and displays the list of uploaded resumes
   */
  async function fetchResumes() {
    try {
      const response = await fetch("http://localhost:3002/api/resumes");

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const resumes = await response.json();

      const resumeList = document.getElementById("resumeList");
      resumeList.innerHTML = ""; // Clear the list

      resumes.forEach((resume) => {
        const listItem = document.createElement("li");
        listItem.classList.add("list-group-item"); // Add Bootstrap styling

        // Create a clickable link for the resume
        listItem.innerHTML = `
          <a href="http://localhost:3002/api/resumes/${resume._id}" target="_blank">${resume.filename}</a>
        `;
        resumeList.appendChild(listItem);
      });
    } catch (err) {
      console.error("Error fetching resumes:", err);
      uploadStatus.innerHTML =
        '<span class="text-danger">Failed to fetch resumes.</span>';
    }
  }

  // Fetch resumes on page load
  fetchResumes();
});
