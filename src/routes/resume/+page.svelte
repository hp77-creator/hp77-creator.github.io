<script lang="ts">
  // Set the PDF URL here
  const pdfUrl = "/resume.pdf"; // Ensure this path is correct
</script>

<main class="resume-container">
  <h1>My Resume</h1>
  <p>Here is my resume. You can view it below or </p>
  <a href={pdfUrl} download="resume.pdf" class="download-link">Download it</a>

  <iframe
    src={pdfUrl}
    width="100%"
    height="600"
    style="border: none;"
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
  }

  h1 {
    margin-bottom: 10px;
    text-align: left; /* Align heading to the left */
  }

  p {
    margin-bottom: 20px;
    text-align: left; /* Align paragraph to the left */
  }

  .download-link {
    margin-bottom: 20px; /* Space below the link */
    text-align: left; /* Align link to the left */
    color: blue; /* Change color as needed */
    text-decoration: underline; /* Underline for clarity */
  }

  iframe {
    border: none; /* Remove default border */
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* Optional shadow for better visibility */
  }
</style>
