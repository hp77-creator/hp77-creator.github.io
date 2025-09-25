<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { getPost } from '$lib/utils/blog';
  import type { BlogPost } from '$lib/utils/blog';
  import Markdown from "$lib/components/Markdown.svelte";
  import Giscus from "$lib/components/Giscus.svelte";

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

  // Generate structured data for the blog post
  $: structuredData = post ? {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    'headline': post.title,
    'description': post.description,
    'datePublished': post.date,
    'dateModified': post.date,
    'author': {
      '@type': 'Person',
      'name': 'Himanshu Pandey'
    },
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': $page.url.href
    }
  } : null;
</script>

<svelte:head>
  {#if post}
    <title>{post.title} | hp77's Blog</title>
    <meta name="description" content={post.description} />
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="article" />
    <meta property="og:title" content={`${post.title} | hp77's Blog`} />
    <meta property="og:description" content={post.description} />
    <meta property="og:url" content={$page.url.href} />
    <meta property="og:site_name" content="hp77's Blog" />
    <meta property="article:published_time" content={post.date} />
    <meta property="article:author" content="Himanshu Pandey" />
    {#if post.tags}
      {#each post.tags as tag}
        <meta property="article:tag" content={tag} />
      {/each}
    {/if}
    
    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@theboycalledhp" />
    <meta name="twitter:creator" content="@theboycalledhp" />
    <meta name="twitter:title" content={`${post.title} | hp77's Blog`} />
    <meta name="twitter:description" content={post.description} />
    
    <!-- Additional Meta Tags -->
    <link rel="canonical" href={$page.url.href} />
    
    {#if structuredData}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    {/if}
  {/if}
</svelte:head>

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
  <article class="layout-md py-8" itemscope itemtype="https://schema.org/BlogPosting">
    <header class="mb-8">
      <h1 class="text-3xl font-bold mb-4" itemprop="headline">{post.title}</h1>
      <time datetime={post.date} itemprop="datePublished" class="text-neutral-500">
        {new Date(post.date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })}
      </time>
      {#if post.description}
        <p class="text-neutral-600 mt-2" itemprop="description">{post.description}</p>
      {/if}
    </header>

    <div class="prose prose-neutral max-w-none prose-headings:font-semibold prose-a:text-blue-600" itemprop="articleBody">
      <Markdown source={post.content} />
    </div>

    <Giscus />

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
