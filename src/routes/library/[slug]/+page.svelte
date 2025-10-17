<script lang="ts">
  import { onMount } from 'svelte';
  import { getItem } from '$lib/utils/library';
  import type { LibraryItem } from '$lib/utils/library';
  import Markdown from '$lib/components/Markdown.svelte';
  import { ExternalLink } from 'lucide-svelte';
  import type { PageData } from './$types';

  export let data: PageData;

  let item: LibraryItem | null = null;
  let loading = true;

  onMount(async () => {
    item = await getItem(data.slug);
    loading = false;
  });

  function getTypeIcon(type: string): string {
    switch(type) {
      case 'paper': return '📄';
      case 'book': return '📚';
      case 'link': return '🔗';
      default: return '📝';
    }
  }
</script>

<svelte:head>
  {#if item}
    <title>{item.title} | Library</title>
    <meta name="description" content={item.description} />
  {/if}
</svelte:head>

{#if loading}
  <div class="layout-md py-8">
    <p class="text-neutral-600">Loading...</p>
  </div>
{:else if !item}
  <div class="layout-md py-8">
    <p class="text-neutral-600">Item not found</p>
  </div>
{:else}
  <article class="layout-md py-8">
    <div class="mb-8">
      <div class="flex items-center gap-2 mb-4">
        <span class="text-4xl">{getTypeIcon(item.type)}</span>
        <div>
          <div class="flex items-center gap-2 flex-wrap">
            <span class="text-xs px-2 py-0.5 bg-neutral-100 text-neutral-600 rounded">
              {item.type === 'paper' ? 'Paper' : item.type === 'book' ? 'Book' : 'Link'}
            </span>
            {#if item.status === 'reading'}
              <span class="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded font-medium">
                📖 Currently Reading
              </span>
            {/if}
          </div>
        </div>
      </div>

      <h1 class="text-4xl font-bold mb-4">{item.title}</h1>
      
      {#if item.authors || item.year}
        <p class="text-lg text-neutral-600 mb-4">
          {#if item.authors}{item.authors}{/if}
          {#if item.authors && item.year} · {/if}
          {#if item.year}{item.year}{/if}
        </p>
      {/if}

      {#if item.description}
        <p class="text-lg text-neutral-700 mb-4">{item.description}</p>
      {/if}

      {#if item.url}
        <a 
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <ExternalLink size={18} />
          Read Original Source
        </a>
      {/if}

      {#if item.tags?.length}
        <div class="flex flex-wrap gap-2 mt-6">
          {#each item.tags as tag}
            <a 
              href={`/library#${encodeURIComponent(tag)}`}
              class="text-sm px-3 py-1 bg-neutral-100 text-neutral-700 rounded-full hover:bg-neutral-200 transition-colors"
            >
              {tag}
            </a>
          {/each}
        </div>
      {/if}
    </div>

    {#if item.content && item.content.trim()}
      <div class="prose prose-neutral max-w-none">
        <Markdown source={item.content} />
      </div>
    {/if}

    <div class="mt-12 pt-6 border-t border-neutral-200">
      <a 
        href="/library"
        class="text-blue-600 hover:text-blue-700 font-medium"
      >
        ← Back to Library
      </a>
    </div>
  </article>
{/if}

<style lang="postcss">
  :global(.prose) {
    @apply text-neutral-800 leading-relaxed;
  }

  :global(.prose h2) {
    @apply text-2xl font-bold mt-8 mb-4 text-neutral-900;
  }

  :global(.prose h3) {
    @apply text-xl font-semibold mt-6 mb-3 text-neutral-900;
  }

  :global(.prose p) {
    @apply mb-4;
  }

  :global(.prose ul, .prose ol) {
    @apply mb-4 pl-6;
  }

  :global(.prose li) {
    @apply mb-2;
  }

  :global(.prose code) {
    @apply bg-neutral-100 px-1.5 py-0.5 rounded text-sm;
  }

  :global(.prose pre) {
    @apply bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-x-auto mb-4;
  }

  :global(.prose pre code) {
    @apply bg-transparent p-0;
  }

  :global(.prose a) {
    @apply text-blue-600 hover:text-blue-700 underline;
  }

  :global(.prose strong) {
    @apply font-semibold text-neutral-900;
  }

  :global(.prose em) {
    @apply italic;
  }
</style>
