document.addEventListener("DOMContentLoaded", function () {
  // Get DOM elements
  const form = document.getElementById("resumeForm");
  const progressBar = document.querySelector(".progress-bar");
  const progressDiv = document.getElementById("uploadProgress");
  const uploadStatus = document.getElementById("uploadStatus");
  const fileInput = document.getElementById("resumeFile");
  const getFeedbackBtn = document.getElementById("getFeedbackBtn");
  const feedbackResult = document.getElementById("feedbackResult");

  // Initialize the Highcharts pie chart
  const chart = Highcharts.chart("container", {
    chart: {
      type: "pie",
    },
    title: {
      text: "Resume Strengths",
    },
    series: [
      {
        name: "Score",
        data: [
          { name: "Technical Skills", y: 0 },
          { name: "Leadership", y: 0 },
          { name: "Relevance", y: 0 },
        ],
      },
    ],
  });

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
        const response = JSON.parse(xhr.responseText);
        console.log("Extracted Text:", response.extractedText); // Log the extracted text

        uploadStatus.innerHTML =
          '<span class="text-success">Upload completed!</span>';

        // Check if extractedText is available
        if (response.extractedText) {
          // Display the extracted text in the textarea
          const extractedTextArea = document.getElementById("extractedText");
          extractedTextArea.value = response.extractedText;

          // Show the "Get Your Instant Feedback" button
          getFeedbackBtn.classList.remove("d-none");
        }
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

  // Handle feedback button click
  getFeedbackBtn.addEventListener("click", async () => {
    // Get the extracted text from the textarea
    const extractedTextArea = document.getElementById("extractedText");
    const jobDescriptionArea = document.getElementById("jobDescription");
    const resumeText = extractedTextArea.value;
    const jobDescription = jobDescriptionArea.value;

    if (!resumeText || !jobDescription) {
      alert("Both resume text and job description are required.");
      return;
    }

    try {
      // Send the extracted text to the backend for evaluation
      const response = await fetch("/api/resumes/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeText, jobDescription }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Backend Response:", data); // full response

        const evaluationData = data.evaluation || {};
        const scores = evaluationData.scores || {};
        const explanation = evaluationData.explanation || {};

        console.log("Evaluation Data:", evaluationData); // Log the evaluation data
        console.log("Scores:", scores); // Log the scores
        console.log("Explanation:", explanation); // Log the explanation

        const technicalSkills = scores?.["Technical Skills"] ?? 0;
        const leadership = scores?.Leadership ?? 0;
        const relevance = scores?.Relevance ?? 0;
        

        console.log("Scores:", { technicalSkills, leadership, relevance });

        // Display the summary in the feedback result area
        feedbackResult.innerHTML = `<span class="text-success">${summaryText}</span>`;

        // Display the explanation in a separate section (e.g., #explanationArea)
        const explanationArea = document.getElementById("explanationArea");
        if (explanationArea) {
          explanationArea.innerHTML = `<pre>${explanation}</pre>`;
        } else {
          console.error(
            "Element with id 'explanationArea' not found in the DOM."
          );
        }

        // Update Highcharts
        chart.series[0].setData([
          { name: "Technical Skills", y: technicalSkills },
          { name: "Leadership", y: leadership },
          { name: "Relevance", y: relevance },
        ]);
      } else {
        const error = await response.json();
        feedbackResult.innerHTML = `<span class="text-danger">Error: ${error.message}</span>`;
      }
    } catch (err) {
      console.error("Error evaluating resume:", err);
      feedbackResult.innerHTML =
        '<span class="text-danger">An error occurred while evaluating the resume.</span>';
    }
  });

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
});
