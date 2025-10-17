<script lang="ts">
  import { page } from "$app/stores";
  import { onMount } from "svelte";

  const links = [
    { name: "blogs", href: "/blogs" },
    { name: "projects", href: "/projects" },
    { name: "library", href: "/library" },
    { name: "resume", href: "/resume" },
  ];

  let pageTitle: string | null = null;
  let mounted = false;

  $: {
    const link = links.find(({ href }) => href === $page.url.pathname);
    if (link) {
      pageTitle = link.name.charAt(0).toUpperCase() + link.name.slice(1);
    } else {
      pageTitle = null;
    }
  }

  onMount(() => {
    mounted = true;
  });
</script>

<header
  class="layout-md flex justify-between items-start header-container"
  class:mounted
  data-sveltekit-noscroll
  data-sveltekit-preload-code="eager"
>
  <h1 class="font-bold text-black text-2xl mb-6 name-container">
    <a href="/" class="name-link">
      <span class="name-text">Himanshu</span>
      <span class="name-text">Pandey</span>
    </a>
    {#if pageTitle}
      <span class="page-title">
        <span class="text-neutral-400 separator">—</span>
        {pageTitle}
      </span>
    {/if}
  </h1>
  <nav class="nav-links">
    {#each links as link (link)}
      <a
        href={link.href}
        class="nav-link"
        class:active={$page.url.pathname === link.href}
      >
        {link.name}
      </a>
    {/each}
  </nav>
</header>

<style lang="postcss">
  .header-container {
    @apply opacity-0 transform -translate-y-2;
    transition: opacity 0.5s ease-out, transform 0.5s ease-out;
  }

  .header-container.mounted {
    @apply opacity-100 translate-y-0;
  }

  .name-link {
    @apply inline-flex flex-wrap gap-x-2 relative;
  }

  .name-text {
    @apply relative inline-block;
    transition: transform 0.2s ease-out;
  }

  .name-link:hover .name-text {
    @apply text-blue-600;
    transform: translateY(-1px);
  }

  .name-text:nth-child(2) {
    transition-delay: 0.05s;
  }

  .nav-links {
    @apply flex items-start text-neutral-500 justify-end space-x-6 text-lg py-0.5;
  }

  .nav-link {
    @apply relative px-2 py-1;
    transition: color 0.2s ease-out;
  }

  .nav-link::after {
    content: '';
    @apply absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 transform scale-x-0;
    transition: transform 0.2s ease-out;
  }

  .nav-link:hover {
    @apply text-black;
  }

  .nav-link:hover::after {
    transform: scaleX(1);
  }

  .nav-link.active {
    @apply text-black;
  }

  .nav-link.active::after {
    transform: scaleX(1);
  }

  .page-title {
    @apply font-light inline-flex items-center;
  }

  .separator {
    @apply mx-2;
  }

  @media (max-width: 580px) {
    .page-title {
      @apply block text-xl;
    }

    .separator {
      @apply hidden;
    }
  }

  @media (max-width: 420px) {
    .nav-links {
      @apply flex-col items-end space-x-0 space-y-2;
    }

    .nav-link {
      @apply px-0;
    }
  }
</style>
