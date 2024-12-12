<script lang="ts">
  import "@fontsource/newsreader/400-italic.css";
  import "../app.css";

  import { browser, dev } from "$app/environment";
  import { page } from '$app/stores';

  import { fly } from "svelte/transition";

  import Header from "$lib/components/Header.svelte";
  import Footer from "$lib/components/Footer.svelte";
  import type { LayoutData } from "./$types";

  export let data: LayoutData;

  const isMobile = browser && /Android|iPhone/i.test(navigator.userAgent);
  const reducedMotion =
    browser && matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Default metadata
  let title = "hp77";
  let description = "Software Engineer | Open Source Enthusiast";
  
  // Update metadata based on route
  $: {
    const path = $page.url.pathname;
    if (path === '/') {
      title = "hp77 | Portfolio";
      description = "Software Engineer | Open Source Enthusiast";
    } else if (path === '/blogs') {
      title = "hp77 | Blog";
      description = "Thoughts on software development, open source, and technology";
    } else if (path === '/resume') {
      title = "hp77 | Resume";
      description = "My professional experience and skills";
    }
  }
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
</svelte:head>

<Header />

{#if isMobile || reducedMotion}
  <!--
    Disable page transitions on mobile due to a browser engine bug.
    Also disable them for reduced-motion users.
  -->
  <main>
    <slot />
  </main>
{:else}
  {#key data.pathname}
    <main
      in:fly={{ x: -10, duration: 350, delay: 350 }}
      out:fly={{ y: 5, duration: 350 }}
    >
      <slot />
    </main>
  {/key}
{/if}

<Footer />
