<script lang="ts">
  import { onMount } from 'svelte';
  import { getVisiblePosts } from '$lib/utils/blog';
  import type { BlogPost } from '$lib/utils/blog';

  let posts: BlogPost[] = [];
  let loading = true;
  let selectedTag: string | null = null;
  let allTags: Set<string> = new Set();

  // Handle hash change for tag filtering
  function handleHashChange() {
    const hash = window.location.hash.slice(1); // Remove the # symbol
    selectedTag = hash ? decodeURIComponent(hash) : null;
  }

  // Filter posts based on selected tag
  $: filteredPosts = selectedTag 
    ? posts.filter(post => post.tags?.includes(selectedTag))
    : posts;

  onMount(async () => {
    posts = await getVisiblePosts();
    // Collect all unique tags
    posts.forEach(post => {
      post.tags?.forEach(tag => allTags.add(tag));
    });
    allTags = allTags; // trigger reactivity
    
    // Initial hash check
    handleHashChange();
    
    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    loading = false;

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  });

  function handleTagClick(tag: string) {
    if (selectedTag === tag) {
      window.location.hash = ''; // Clear hash if clicking selected tag
    } else {
      window.location.hash = encodeURIComponent(tag);
    }
  }
</script>

<div class="layout-md py-8">
  <h1 class="text-3xl font-bold mb-8">Blog Posts</h1>

  <div class="blog-layout">
    <!-- Left Sidebar - Tags -->
    {#if !loading && allTags.size > 0}
      <aside class="sidebar">
        <h2 class="text-sm font-semibold text-neutral-700 mb-3 uppercase tracking-wide">Tags</h2>
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
      </aside>
    {/if}

    <!-- Main Content -->
    <main class="content">
      {#if loading}
        <p class="text-neutral-600">Loading posts...</p>
      {:else if filteredPosts.length === 0}
        <p class="text-neutral-600">
          {selectedTag ? `No posts found with tag "${selectedTag}"` : 'No blog posts found.'}
        </p>
      {:else}
        <div class="space-y-12">
          {#each filteredPosts as post}
            <article class="group">
              <a 
                href={`/blogs/${post.slug}`}
                class="block space-y-3"
              >
                <h2 class="text-2xl font-semibold text-neutral-900 group-hover:text-blue-600 transition-colors">
                  {post.title}
                </h2>
                <p class="text-neutral-600 leading-relaxed">
                  {post.description}
                </p>
                {#if post.tags?.length}
                  <div class="flex flex-wrap gap-2 mb-2">
                    {#each post.tags as tag}
                      <span class="text-sm px-2 py-0.5 bg-neutral-100 text-neutral-600 rounded">
                        {tag}
                      </span>
                    {/each}
                  </div>
                {/if}
                <time class="text-sm text-neutral-500 block">
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
              </a>
            </article>
          {/each}
        </div>
      {/if}
    </main>
  </div>
</div>

<style lang="postcss">
  .blog-layout {
    @apply grid gap-6;
    grid-template-columns: auto 1fr;
  }

  .sidebar {
    @apply sticky top-8 self-start;
    max-height: calc(100vh - 8rem);
    overflow-y: auto;
    max-width: 200px;
  }

  .content {
    @apply min-w-0;
  }

  /* Mobile responsive */
  @media (max-width: 768px) {
    .blog-layout {
      @apply grid-cols-1;
    }

    .sidebar {
      @apply static;
      max-height: none;
      max-width: none;
    }
  }

  article {
    @apply pb-12 border-b border-neutral-200;
  }
  
  article:last-child {
    @apply border-b-0 pb-0;
  }
</style>
