import { handleFileUpload } from "./upload.js";
import { handleFeedback } from "./feedback.js";
import { initializeChart } from "./chart.js";

// Initialize components
document.addEventListener("DOMContentLoaded", () => {
  initializeChart();
  handleFileUpload();
  handleFeedback();

  // Load Navbar
});

// Load Navbar
fetch("components/navbar.html")
  .then((response) => response.text())
  .then((html) => {
    document.getElementById("navbar").innerHTML = html;
  });

// Load Footer
fetch("components/footer.html")
  .then((response) => response.text())
  .then((html) => {
    document.getElementById("footer").innerHTML = html;
  });
