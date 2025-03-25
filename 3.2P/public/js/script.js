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
   * Handles the form submission and file upload simulation
   * @param {Event} e - The form submission event
   */
  function handleFormSubmit(e) {
    e.preventDefault();

    if (!validateFile()) {
      return;
    }

    showUploadElements();
    simulateUpload();
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
   * Simulates the file upload process
   */
  function simulateUpload() {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      updateProgress(progress);

      if (progress >= 100) {
        handleUploadComplete(interval);
      }
    }, 200);
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
   * Handles the upload completion
   * @param {number} interval - The interval ID to clear
   */
  function handleUploadComplete(interval) {
    clearInterval(interval);
    uploadStatus.innerHTML =
      '<span class="text-success">Upload completed!</span>';

    // Reset after 3 seconds
    setTimeout(() => {
      resetUploadForm();
    }, 3000);
  }

  /**
   * Resets the form and hides upload elements
   */
  function resetUploadForm() {
    progressDiv.classList.add("d-none");
    uploadStatus.classList.add("d-none");
    form.reset();
  }
});
