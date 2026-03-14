<script lang="ts">
  import { marked } from "marked";
  import mermaid from "mermaid";
  import { onMount, afterUpdate } from "svelte";

  export let source: string;

  mermaid.initialize({ startOnLoad: false, theme: "default" });

  marked.use({
    renderer: {
      code(code: string, lang: string | undefined) {
        if (lang === "mermaid") {
          return `<div class="mermaid">${code}</div>`;
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

  $: html = marked.parse(source, {
    smartLists: true,
    smartypants: true,
  });

  async function renderMermaid() {
    await mermaid.run({ querySelector: ".mermaid" });
  }

  onMount(renderMermaid);
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
