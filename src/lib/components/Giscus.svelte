<script lang="ts">
  import { onMount } from 'svelte';

  export let mapping: string = 'pathname'; // or 'url', 'title', 'og:title', or specific term
  export let strict: boolean = true;

  onMount(() => {
    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.setAttribute('data-repo', 'hp77-creator/hp77-creator.github.io');
    script.setAttribute('data-repo-id', 'MDEwOlJlcG9zaXRvcnkzNDExMDA1NjA='); // Will be provided by giscus.app
    script.setAttribute('data-category', 'Blog Comments');
    script.setAttribute('data-category-id', 'DIC_kwDOFFTIEM4ClJ0_'); // Will be provided by giscus.app
    script.setAttribute('data-mapping', mapping);
    script.setAttribute('data-strict', strict ? '1' : '0');
    script.setAttribute('data-reactions-enabled', '1');
    script.setAttribute('data-emit-metadata', '0');
    script.setAttribute('data-input-position', 'bottom');
    script.setAttribute('data-theme', 'preferred_color_scheme');
    script.setAttribute('data-lang', 'en');
    script.crossOrigin = 'anonymous';
    script.async = true;

    const container = document.getElementById('giscus-container');
    if (container) {
      container.appendChild(script);
    }
  });
</script>

<div class="mt-8 pt-8 border-t border-neutral-200">
  <h2 class="text-xl font-semibold mb-4">Comments & Reactions</h2>
  <div id="giscus-container"></div>
</div>
