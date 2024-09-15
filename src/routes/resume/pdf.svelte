<script lang="ts">
  // You can set the PDF URL here
  const pdfUrl = "/resume.pdf"; // Update with your PDF path
</script>

<main class="pdf-viewer">
  <iframe
    src={pdfUrl}
    width="100%"
    height="100%"
    style="border: none;"
    title="Resume"
  ></iframe>
</main>

<style>
  .pdf-viewer {
    height: 100vh; /* Full height */
    overflow: hidden; /* Hide overflow */
  }
</style>