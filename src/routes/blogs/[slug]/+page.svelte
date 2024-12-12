<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { getPost } from '$lib/utils/blog';
  import type { BlogPost } from '$lib/utils/blog';
  import Markdown from "$lib/components/Markdown.svelte";

  let post: BlogPost | null = null;
  let loading = true;
  let error = false;

  onMount(async () => {
    const slug = $page.params.slug;
    try {
      post = await getPost(slug);
      if (!post) {
        error = true;
      }
    } catch (e) {
      error = true;
      console.error('Error loading post:', e);
    } finally {
      loading = false;
    }
  });
</script>

{#if loading}
  <div class="layout-md py-8">
    <p class="text-neutral-600">Loading post...</p>
  </div>
{:else if error || !post}
  <div class="layout-md py-8">
    <h1 class="text-2xl font-bold text-red-600 mb-4">Post Not Found</h1>
    <p class="text-neutral-600 mb-4">Sorry, the blog post you're looking for doesn't exist.</p>
    <a href="/blogs" class="text-blue-600 hover:underline">← Back to all posts</a>
  </div>
{:else}
  <article class="layout-md py-8">
    <header class="mb-8">
      <h1 class="text-3xl font-bold mb-4">{post.title}</h1>
      <time class="text-neutral-500">
        {new Date(post.date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })}
      </time>
    </header>

    <div class="prose prose-neutral max-w-none prose-headings:font-semibold prose-a:text-blue-600">
      <Markdown source={post.content} />
    </div>

    <footer class="mt-12 pt-8 border-t border-neutral-200">
      <a href="/blogs" class="text-blue-600 hover:underline">← Back to all posts</a>
    </footer>
  </article>
{/if}

<style>
  :global(.prose) {
    @apply text-neutral-800;
  }
  :global(.prose h1) {
    @apply text-3xl mt-8 mb-4;
  }
  :global(.prose h2) {
    @apply text-2xl mt-8 mb-4;
  }
  :global(.prose h3) {
    @apply text-xl mt-6 mb-3;
  }
  :global(.prose p) {
    @apply mb-4;
  }
  :global(.prose ul) {
    @apply list-disc pl-6 mb-4;
  }
  :global(.prose ol) {
    @apply list-decimal pl-6 mb-4;
  }
  :global(.prose li) {
    @apply mb-1;
  }
  :global(.prose a) {
    @apply text-blue-600 hover:underline;
  }
  :global(.prose code) {
    @apply bg-neutral-100 px-1.5 py-0.5 rounded text-sm;
  }
  :global(.prose pre) {
    @apply bg-neutral-100 p-4 rounded-lg mb-4 overflow-x-auto;
  }
  :global(.prose pre code) {
    @apply bg-transparent p-0;
  }
  :global(.prose blockquote) {
    @apply border-l-4 border-neutral-300 pl-4 italic;
  }
</style>
