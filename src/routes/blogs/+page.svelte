<script lang="ts">
  import { onMount } from 'svelte';
  import { getAllPosts } from '$lib/utils/blog';
  import type { BlogPost } from '$lib/utils/blog';

  let posts: BlogPost[] = [];

  onMount(async () => {
    posts = await getAllPosts();
  });
</script>

<div class="layout-md py-8">
  <h2 class="text-2xl font-bold mb-8">Blog Posts</h2>
  
  <div class="space-y-8">
    {#each posts as post}
      <article class="group">
        <a 
          href={`/blogs/${post.slug}`}
          class="block space-y-2 hover:text-black transition-colors"
        >
          <h3 class="text-xl font-semibold group-hover:text-black transition-colors">
            {post.title}
          </h3>
          <p class="text-neutral-600">
            {post.description}
          </p>
          <time class="text-sm text-neutral-500">
            {new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </time>
        </a>
      </article>
    {/each}

    {#if posts.length === 0}
      <p class="text-neutral-600">Loading posts...</p>
    {/if}
  </div>
</div>

<style lang="postcss">
  article {
    @apply border-b border-neutral-200 pb-8;
  }
  article:last-child {
    @apply border-b-0;
  }
</style>
