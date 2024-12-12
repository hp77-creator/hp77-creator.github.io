<script>
  import { onMount } from "svelte";
  
  let mounted = false;
  
  onMount(() => {
    mounted = true;
  });

  const socialLinks = [
    {
      name: "Twitter",
      href: "https://twitter.com/theboycalledhp",
      username: "@theboycalledhp"
    },
    {
      name: "GitHub",
      href: "https://github.com/hp77-creator",
      username: "@hp77-creator"
    },
    {
      name: "Email",
      href: "mailto:himanshu.dn.pandey@gmail.com",
      username: "himanshu.dn.pandey@gmail.com"
    }
  ];
</script>

<footer class="layout-md mt-20 text-lg flex flex-col space-y-4 footer-container" class:mounted>
  {#each socialLinks as link, i}
    <div class="row" style="animation-delay: {i * 100}ms">
      <span class="label">{link.name}</span>
      <hr />
      <a 
        class="link social-link" 
        href={link.href}
        target={link.name !== "Email" ? "_blank" : undefined}
        rel={link.name !== "Email" ? "noopener noreferrer" : undefined}
      >
        {link.username}
      </a>
    </div>
  {/each}
</footer>

<style lang="postcss">
  .footer-container {
    @apply opacity-0 transform translate-y-4;
    transition: opacity 0.5s ease-out, transform 0.5s ease-out;
  }

  .footer-container.mounted {
    @apply opacity-100 translate-y-0;
  }

  .row {
    @apply flex items-center space-x-4 opacity-0 transform translate-y-2;
    animation: slideUp 0.5s ease-out forwards;
  }

  .label {
    @apply text-neutral-500 font-medium min-w-[4rem];
  }

  hr {
    @apply w-full mt-0.5 border-neutral-300 border-dotted;
    transition: border-color 0.2s ease-out;
  }

  .row:hover hr {
    @apply border-blue-300;
  }

  .social-link {
    @apply relative whitespace-nowrap text-neutral-700;
    transition: color 0.2s ease-out;
  }

  .social-link::after {
    content: '';
    @apply absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 transform scale-x-0;
    transition: transform 0.2s ease-out;
  }

  .social-link:hover {
    @apply text-blue-600;
  }

  .social-link:hover::after {
    transform: scaleX(1);
  }

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 640px) {
    .row {
      @apply flex-col items-start space-x-0 space-y-2;
    }

    hr {
      @apply hidden;
    }

    .label {
      @apply text-sm uppercase tracking-wider;
    }
  }
</style>
