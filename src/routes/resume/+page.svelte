<script lang="ts">
  // Set the PDF URL here
  const pdfUrl = "/resume.pdf"; // Ensure this path is correct
</script>

<main class="resume-container">
  <h1 class="resume-title">My Resume</h1>
  <p class="resume-description">Here is my resume. You can view it below or </p>
  <a href={pdfUrl} download="resume.pdf" class="download-link">Download it</a>

  <iframe
    src={pdfUrl}
    width="100%"
    height="600"
    class="resume-iframe"
    title="Resume"
  ></iframe>
</main>

<style>
  .resume-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start; /* Align items to the left */
    padding: 20px;
    max-width: 800px; /* Adjust as needed */
    margin: auto; /* Center the container */
    font-family: Arial, sans-serif; /* Match font family */
    color: #333; /* Match text color */
  }

  .resume-title {
    margin-bottom: 10px;
    font-size: 2rem; /* Adjust font size to match header */
    font-weight: bold; /* Match header font weight */
    text-align: left; /* Align heading to the left */
  }

  .resume-description {
    margin-bottom: 20px;
    font-size: 1rem; /* Adjust font size to match header */
    text-align: left; /* Align paragraph to the left */
  }

  .download-link {
    margin-bottom: 20px; /* Space below the link */
    color: #007bff; /* Change color to match header link color */
    text-decoration: underline; /* Underline for clarity */
    font-size: 1rem; /* Match font size */
  }

  .resume-iframe {
    border: none; /* Remove default border */
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* Optional shadow for better visibility */
  }
</style>
