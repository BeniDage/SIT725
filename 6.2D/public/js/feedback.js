import { updateChart } from "./chart.js";

export function handleFeedback() {
  const getFeedbackBtn = document.getElementById("getFeedbackBtn");
  const feedbackResult = document.getElementById("feedbackResult");

  getFeedbackBtn.addEventListener("click", async () => {
    const extractedTextArea = document.getElementById("extractedText");
    const jobDescriptionArea = document.getElementById("jobDescription");
    const resumeText = extractedTextArea.value;
    const jobDescription = jobDescriptionArea.value;

    if (!resumeText || !jobDescription) {
      alert("Both resume text and job description are required.");
      return;
    }

    try {
      const response = await fetch("/api/resumes/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeText, jobDescription }),
      });

      if (response.ok) {
        const data = await response.json();
        const scores = data.evaluation.scores || {};
        const explanation =
          data.evaluation.explanation || "No explanation provided.";

        feedbackResult.innerHTML = `<span class="text-success">${
          data.evaluation?.message || "Evaluation completed."
        }</span>`;

        const explanationArea = document.getElementById("explanationArea");
        explanationArea.innerHTML = `<pre>${explanation}</pre>`;

        updateChart(scores);
      } else {
        const error = await response.json();
        feedbackResult.innerHTML = `<span class="text-danger">Error: ${error.message}</span>`;
      }
    } catch (err) {
      feedbackResult.innerHTML =
        '<span class="text-danger">An error occurred while evaluating the resume.</span>';
    }
  });
}
