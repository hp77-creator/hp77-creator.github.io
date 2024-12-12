<script lang="ts">
  import { onMount } from 'svelte';
  import { getAllPosts } from '$lib/utils/blog';
  import type { BlogPost } from '$lib/utils/blog';

  let posts: BlogPost[] = [];
  let loading = true;

  onMount(async () => {
    posts = await getAllPosts();
    loading = false;
  });
</script>

<div class="layout-md py-8">
  <h1 class="text-3xl font-bold mb-8">Blog Posts</h1>
  
  {#if loading}
    <p class="text-neutral-600">Loading posts...</p>
  {:else if posts.length === 0}
    <p class="text-neutral-600">No blog posts found.</p>
  {:else}
    <div class="space-y-12">
      {#each posts as post}
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
</div>

<style lang="postcss">
  article {
    @apply pb-12 border-b border-neutral-200;
  }
  article:last-child {
    @apply border-b-0 pb-0;
  }
</style>
