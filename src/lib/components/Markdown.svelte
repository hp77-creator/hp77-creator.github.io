<script lang="ts">
  import { marked } from "marked";
  import { onMount, afterUpdate } from "svelte";

  export let source: string;

  // Local variable to hold the dynamically loaded Mermaid instance
  let mermaidInstance: any;

  // Create an isolated instance of marked

  marked.use({
    renderer: {
      code(code: string, lang: string | undefined) {
        if (lang === "mermaid") {
          // Clean up HTML entities and non-breaking spaces
          const cleanCode = code
            .replace(/&lt;/g, "<")
            .replace(/&gt;/g, ">")
            .replace(/&amp;/g, "&")
            .replace(/\u00A0/g, " ");

          return `<div class="mermaid">${cleanCode}</div>`;
        }
        return `<pre><code class="language-${lang ?? ""}">${code}</code></pre>`;
      },
      link(href: string, title: string | null, text: string) {
        let out = `<a rel="external" href="${encodeURI(href)}" class="link"`;
        if (title) {
          out += ' title="' + title + '"';
        }
        out += ">" + text + "</a>";
        return out;
      },
      image(href: string, title: string | null, text: string) {
        let out = '<img src="' + href + '" alt="' + text + '"';
        if (title) {
          out += ' title="' + title + '"';
        }
        out += ' loading="lazy" class="blog-image">';
        return out;
      },
    },
  });

  // Parse the markdown reactively
  $: html = marked.parse(source, {
    smartLists: true,
    smartypants: true,
  }) as string;

  async function renderMermaid() {
    if (!mermaidInstance) return;

    try {
      // Tell Mermaid to parse and render the divs we just created
      await mermaidInstance.run({ querySelector: ".mermaid" });
    } catch (error) {
      console.error("Mermaid failed to render:", error);
    }
  }

  onMount(async () => {
    // Dynamically import mermaid only in the browser to prevent SSR build errors
    const mermaidModule = await import("mermaid");
    mermaidInstance = mermaidModule.default;

    mermaidInstance.initialize({ startOnLoad: false, theme: "default" });

    // Trigger the initial render once the module is loaded
    await renderMermaid();
  });

  // Re-run whenever the component updates
  afterUpdate(renderMermaid);
</script>

<div class="md-output">
  {@html html}
</div>

<style lang="postcss">
  .md-output :global(p) {
    @apply mb-4;
  }

  .md-output :global(strong) {
    @apply font-semibold;
  }

  .md-output :global(code) {
    @apply text-[95%];
  }

  .md-output :global(.mermaid) {
    @apply my-6 flex justify-center;
  }
</style>