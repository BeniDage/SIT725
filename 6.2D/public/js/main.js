import { handleFileUpload } from "./upload.js";
import { handleFeedback } from "./feedback.js";
import { initializeChart } from "./chart.js";
import { initializeNotifications } from "./notification.js";

// Initialize components
document.addEventListener("DOMContentLoaded", () => {
  initializeChart();
  handleFileUpload();
  handleFeedback();
  initializeNotifications();

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
