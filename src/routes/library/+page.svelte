<script lang="ts">
  import { onMount } from 'svelte';
  import { getVisibleItems } from '$lib/utils/library';
  import type { LibraryItem } from '$lib/utils/library';
  import { ExternalLink } from 'lucide-svelte';

  let items: LibraryItem[] = [];
  let loading = true;
  let selectedTag: string | null = null;
  let selectedType: string | null = null;
  let allTags: Set<string> = new Set();

  // Handle hash change for tag filtering
  function handleHashChange() {
    const hash = window.location.hash.slice(1);
    selectedTag = hash ? decodeURIComponent(hash) : null;
  }

  // Filter items based on selected tag and type
  $: filteredItems = items.filter(item => {
    const matchesTag = selectedTag ? item.tags?.includes(selectedTag) : true;
    const matchesType = selectedType ? item.type === selectedType : true;
    return matchesTag && matchesType;
  });

  onMount(async () => {
    items = await getVisibleItems();
    // Collect all unique tags
    items.forEach(item => {
      item.tags?.forEach(tag => allTags.add(tag));
    });
    allTags = allTags;
    
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    loading = false;

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  });

  function handleTagClick(tag: string) {
    if (selectedTag === tag) {
      window.location.hash = '';
    } else {
      window.location.hash = encodeURIComponent(tag);
    }
  }

  function getTypeIcon(type: string): string {
    switch(type) {
      case 'paper': return '📄';
      case 'book': return '📚';
      case 'link': return '🔗';
      default: return '📝';
    }
  }

  function getTypeLabel(type: string): string {
    switch(type) {
      case 'paper': return 'Paper';
      case 'book': return 'Book';
      case 'link': return 'Link';
      default: return 'Item';
    }
  }
</script>

<div class="layout-md py-8">
  <h1 class="text-3xl font-bold mb-4">Library</h1>
  <p class="text-neutral-600 mb-8">Papers, books, and resources I'm reading or have found valuable</p>

  {#if !loading}
    <div class="mb-8 space-y-4">
      <!-- Type filters -->
      <div class="flex flex-wrap gap-2">
        <button
          class="px-4 py-2 rounded-lg text-sm font-medium transition-colors {selectedType === null ? 'bg-blue-600 text-white' : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'}"
          on:click={() => selectedType = null}
        >
          All
        </button>
        <button
          class="px-4 py-2 rounded-lg text-sm font-medium transition-colors {selectedType === 'paper' ? 'bg-blue-600 text-white' : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'}"
          on:click={() => selectedType = 'paper'}
        >
          📄 Papers
        </button>
        <button
          class="px-4 py-2 rounded-lg text-sm font-medium transition-colors {selectedType === 'book' ? 'bg-blue-600 text-white' : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'}"
          on:click={() => selectedType = 'book'}
        >
          📚 Books
        </button>
        <button
          class="px-4 py-2 rounded-lg text-sm font-medium transition-colors {selectedType === 'link' ? 'bg-blue-600 text-white' : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'}"
          on:click={() => selectedType = 'link'}
        >
          🔗 Links
        </button>
      </div>

      <!-- Tag filters -->
      {#if allTags.size > 0}
        <div class="flex flex-wrap gap-2">
          {#each Array.from(allTags) as tag}
            <button
              class="px-3 py-1 rounded-full text-sm transition-colors {selectedTag === tag ? 'bg-blue-600 text-white' : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'}"
              on:click={() => handleTagClick(tag)}
            >
              {tag}
            </button>
          {/each}
        </div>
      {/if}
    </div>
  {/if}
  
  {#if loading}
    <p class="text-neutral-600">Loading library items...</p>
  {:else if filteredItems.length === 0}
    <p class="text-neutral-600">
      {selectedTag || selectedType ? 'No items found with the selected filters' : 'No library items found.'}
    </p>
  {:else}
    <div class="space-y-6">
      {#each filteredItems as item}
        <article class="group library-card">
          <div class="flex items-start gap-4">
            <div class="text-3xl flex-shrink-0">
              {getTypeIcon(item.type)}
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2 mb-2 flex-wrap">
                <span class="text-xs px-2 py-0.5 bg-neutral-100 text-neutral-600 rounded">
                  {getTypeLabel(item.type)}
                </span>
                {#if item.status === 'reading'}
                  <span class="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded font-medium">
                    📖 Currently Reading
                  </span>
                {/if}
              </div>

              {#if item.type === 'link'}
                <a 
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="block space-y-2"
                >
                  <h2 class="text-xl font-semibold text-neutral-900 group-hover:text-blue-600 transition-colors flex items-center gap-2">
                    {item.title}
                    <ExternalLink size={16} class="text-neutral-400" />
                  </h2>
                  <p class="text-neutral-600">
                    {item.description}
                  </p>
                </a>
              {:else}
                <a 
                  href={`/library/${item.slug}`}
                  class="block space-y-2"
                >
                  <h2 class="text-xl font-semibold text-neutral-900 group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h2>
                  {#if item.authors || item.year}
                    <p class="text-sm text-neutral-500">
                      {#if item.authors}{item.authors}{/if}
                      {#if item.authors && item.year} · {/if}
                      {#if item.year}{item.year}{/if}
                    </p>
                  {/if}
                  <p class="text-neutral-600">
                    {item.description}
                  </p>
                </a>
              {/if}

              {#if item.tags?.length}
                <div class="flex flex-wrap gap-2 mt-3">
                  {#each item.tags as tag}
                    <span class="text-xs px-2 py-0.5 bg-neutral-100 text-neutral-600 rounded">
                      {tag}
                    </span>
                  {/each}
                </div>
              {/if}
            </div>
          </div>
        </article>
      {/each}
    </div>
  {/if}
</div>

<style lang="postcss">
  .library-card {
    @apply pb-6 border-b border-neutral-200;
  }
  
  .library-card:last-child {
    @apply border-b-0 pb-0;
  }
</style>
