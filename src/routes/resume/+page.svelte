<script lang="ts">
  import { onMount } from "svelte";
  const pdfUrl = "/resume.pdf";
  let mounted = false;
  
  onMount(() => {
    mounted = true;
  });
</script>

<main class="layout-md resume-container" class:mounted>
  <div class="resume-header">
    <p class="description">You can view my resume below or</p>
    <a href={pdfUrl} download="resume.pdf" class="download-link">
      download it
      <span class="download-icon">↓</span>
    </a>
  </div>

  <iframe
    src={pdfUrl}
    width="100%"
    height="800"
    class="resume-iframe"
    title="Resume"
  ></iframe>
</main>

<style lang="postcss">
  .resume-container {
    @apply opacity-0 transform translate-y-4;
    transition: opacity 0.5s ease-out, transform 0.5s ease-out;
  }

  .resume-container.mounted {
    @apply opacity-100 translate-y-0;
  }

  .resume-header {
    @apply flex items-center gap-2 mb-6 text-lg;
  }

  .description {
    @apply text-neutral-600;
  }

  .download-link {
    @apply relative text-blue-600 hover:text-blue-700 transition-colors inline-flex items-center gap-1;
  }

  .download-link::after {
    content: '';
    @apply absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 transform scale-x-0 transition-transform;
  }

  .download-link:hover::after {
    @apply scale-x-100;
  }

  .download-icon {
    @apply text-sm transition-transform;
  }

  .download-link:hover .download-icon {
    @apply translate-y-0.5;
  }

  .resume-iframe {
    @apply border-none rounded-lg shadow-lg bg-white;
    min-height: calc(100vh - 200px);
  }

  @media (max-width: 640px) {
    .resume-header {
      @apply flex-col items-start gap-1;
    }
  }
</style>
